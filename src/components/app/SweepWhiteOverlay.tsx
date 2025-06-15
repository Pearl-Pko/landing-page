import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { clamp, cn, transformRange } from "@/utils/utils";
import { ClassValue } from "clsx";
import { useUnitDriver } from "@/hooks/useUnitDriver";
import { easeIn, easeOut } from "motion";
import useResizeObserver from "@react-hook/resize-observer";

type Rect = { top: number; width: number; left: number; height: number };

const highlight = () => {
  return <div></div>;
};

export default function SweepWhiteOverlay({
  children,
  duration = 1,
  className,
  delay = 0.25,
}: {
  duration?: number;
  offsetDuration?: number;
  delay?: number;
  className?: ClassValue;
  children: React.ReactNode | React.ReactNode[];
}) {
  const [lineRanges, setLineRanges] = useState<Rect[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once: true,
  });
  const [containerDimensions, setContainerDimensions] = useState<Rect>();
  const totalDuration = duration + delay * lineRanges.length;
  const { progress } = useUnitDriver({
    duration: totalDuration,
    start: inView,
  });

  const backgroundPositions = useTransform(progress, (v) => {
    return lineRanges
      .map((rect, index) => {
        const offsetDuration = delay * index;

        const offset = transformRange(
          v,
          [
            offsetDuration / totalDuration,
            (duration + offsetDuration) / totalDuration,
          ],
          [-rect.width, 0]
        );

        return `${offset}px ${rect.top}px, 0px ${rect.top}px`;
      })
      .join(", ");
  });

  const getLineRanges = () => {
    if (!ref.current) return;

    const currentLineRanges: Range[] = [];
    const textContent = ref.current?.textContent;
    let prevBottom: number | null = null;
    let lastLineIndex = 0;
    let currentRange: Range = document.createRange();

    if (!textContent) return;

    const refEl = ref.current.firstChild?.firstChild;

    if (!refEl) return;

    for (let i = 0; i <= textContent.length; i++) {
      currentRange.setStart(refEl, lastLineIndex);
      currentRange.setEnd(refEl, i);

      const boundingRect = currentRange.getBoundingClientRect();

      if (i === 0) prevBottom = boundingRect.bottom;

      if (prevBottom && boundingRect.bottom > prevBottom) {
        currentRange.setEnd(refEl, i - 1);
        currentLineRanges.push(currentRange);
        lastLineIndex = i - 1;
        prevBottom = boundingRect.bottom;

        currentRange = document.createRange();
      } else if (i === textContent.length) {
        currentLineRanges.push(currentRange);
      }
    }

    const parentBoundingBox = ref.current.getBoundingClientRect();

    setContainerDimensions(parentBoundingBox);
    setLineRanges(
      currentLineRanges.map((lineRange) => {
        const boundingRect = lineRange.getBoundingClientRect();
        return {
          top: boundingRect.top - parentBoundingBox.top,
          left: boundingRect.left - parentBoundingBox.left,
          width: boundingRect.width,
          height: boundingRect.height,
        };
      })
    );

    console.log("dd", currentLineRanges);
  };

  useLayoutEffect(() => {
    getLineRanges();
  }, [ref]);

  useResizeObserver(ref, () => getLineRanges());

  return (
    <motion.div className="relative">
      {/* 
      // test view boxes
      {lineRanges.map((x) => {
        return (
          <div
            className="absolute border-2 border-amber-100 top-0 left-0"
            style={{
              top: x.top,

              left: x.left,
              width: x.width,
              height: x.height,
            }}
          ></div>
        );
      })} */}

      <motion.div
        ref={ref}
        style={{
          backgroundImage: lineRanges
            .map(
              (rect, index) =>
                `linear-gradient(#ffffff, #ffffff), linear-gradient(#9C958A, #9C958A)`
            )
            .join(", "),
          backgroundPosition: backgroundPositions,
          backgroundRepeat: "no-repeat",
          backgroundSize: lineRanges
            .map(
              (rect) =>
                `${rect.width}px ${rect.height}px, ${rect.width}px ${rect.height}px`
            )
            .join(", "),
          backgroundClip: "text",
        }}
        className={cn(className, "text-transparent")}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
