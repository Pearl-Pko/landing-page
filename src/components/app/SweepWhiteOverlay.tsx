import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/utils";
import { ClassValue } from "clsx";

type Rect = { top: number; width: number; left: number; height: number };

export default function SweepWhiteOverlay({
  children,
  duration = 1.5,
  className,
  delay,
}: {
  duration?: number;
  delay?: number;
  className?: ClassValue;
  children: React.ReactNode | React.ReactNode[];
}) {
  const [lineRanges, setLineRanges] = useState<Rect[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    console.log("tease", ref.current?.textContent, currentLineRanges);
  }, [ref]);

  console.log("dd", lineRanges);

  return (
    <div ref={ref} className="relative">
      {children}

      {lineRanges.map((x, index) => {
        return (
          // <div
          //   className="absolute border-2 border-amber-100 top-0 left-0"
          //   style={{
          //     top: x.top,

          //     left: x.left,
          //     width: x.width,
          //     height: x.height,
          //   }}
          // ></div>
          <motion.div
            ref={ref}
            transition={{ duration: duration, ease: "easeOut", delay: delay }}
            style={{
              backgroundImage:
                "linear-gradient(#ffffff, #ffffff),  linear-gradient(#9C958A, #9C958A)",
              backgroundPosition: "0% 0%, 0%, 0%",
              backgroundRepeat: "no-repeat",
              
              backgroundSize: "0% 100%, 100% 100%",
              backgroundClip: "text",
              top: x.top,
              left: x.left,
              width: x.width,
              height: x.height,
            }}
            initial={"inactive"}
            whileInView={"active"}
            viewport={{ once: true }}
            variants={{
              inactive: { backgroundSize: "0% 100%, 100% 100%" },
              active: { backgroundSize: "100% 100%, 100% 100%" },
            }}
            className={cn(className, "text-transparent absolute top-0 left-0")}
            //   className="text-secondary text-3xl relative -z-10"
          >
          </motion.div>
        );
      })}
    </div>
  );
}
