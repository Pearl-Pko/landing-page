import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { clamp, cn, floatGreaterThan, transformRange } from "@/utils/utils";
import { ClassValue } from "clsx";
import { useUnitDriver } from "@/hooks/useUnitDriver";
import { easeIn, easeOut } from "motion";
import useResizeObserver from "@react-hook/resize-observer";

type Rect = { top: number; width: number; left: number; height: number };

export default function SweepTextOverlay({
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
          [-rect.width + rect.left, rect.left]
        );

        return `${offset}px ${rect.top}px, ${rect.left}px ${rect.top}px`;
      })
      .join(", ");
  });

  const getLineRanges = () => {
    if (!ref.current) return;

    const currentLineRanges: Rect[] = [];

    // Walk through all text nodes under ref.current
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(ref.current, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const currentNode = walker.currentNode as Text;
      if (currentNode.textContent?.trim()) {
        textNodes.push(currentNode);
      }
    }

    console.log("timing", textNodes);

    const parentBoundingBox = ref.current.getBoundingClientRect();

    const addOrMergeLineRanges = (merge: boolean, newRect: Rect) => {
      if (merge && currentLineRanges.length > 0) {
        console.log("merge logic");
        const prevLineRange = currentLineRanges[currentLineRanges.length - 1];

        currentLineRanges[currentLineRanges.length - 1] = {
          top: prevLineRange.top,
          left: prevLineRange.left,
          width: prevLineRange.width + newRect.width,
          height: prevLineRange.height,
        };
      } else {
        console.log("push logic");
        currentLineRanges.push({
          top: newRect.top - parentBoundingBox.top,
          left: newRect.left - parentBoundingBox.left,
          width: newRect.width,
          height: newRect.height,
        });
      }
    };

    let prevBottom: number | null = null;
    for (let i = 0; i < textNodes.length; i++) {
      const node = textNodes[i];
      let lastLineIndex = 0;

      let currentRange: Range = document.createRange();
      const nodeText = node.textContent?.trim() || "";

      for (let j = 1; j <= nodeText.length; j++) {
        currentRange.setStart(node, lastLineIndex);
        currentRange.setEnd(node, j);

        const boundingRect = currentRange.getBoundingClientRect();

        if (i == 0 && j === 1) prevBottom = boundingRect.bottom;

        console.log("prev bottom", prevBottom);

        // line breaks occur in the same element
        if (prevBottom && floatGreaterThan(boundingRect.bottom, prevBottom)) {
          console.log("shouldn't merge", nodeText[j - 1] + nodeText[j]);
          currentRange.setEnd(node, j - 1);

          const preLineBreakBoundingRect = currentRange.getBoundingClientRect();
          addOrMergeLineRanges(false, preLineBreakBoundingRect);

          lastLineIndex = j - 1;
          prevBottom = boundingRect.bottom;

          currentRange = document.createRange();
        } else if (j === nodeText.length) {
          // console.log("should merge");
         
          if (i === textNodes.length - 1)
            addOrMergeLineRanges(false, boundingRect);
          else addOrMergeLineRanges(true, boundingRect);  // line break yet to occur at end of the element text, merge it with previous
        }
      }
    }

    setLineRanges(currentLineRanges);

    console.log("dd", currentLineRanges);
  };

  useLayoutEffect(() => {
    getLineRanges();
  }, [ref]);

  useResizeObserver(ref, () => getLineRanges());

  return (
    <motion.div className="relative">
      {/* {lineRanges.map((x) => {
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
