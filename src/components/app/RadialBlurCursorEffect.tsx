import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";

export default function RadialBlurCursorEffect({}: // children,
{
  // children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parentRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const rect = parentRef.current.getBoundingClientRect();

      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (isInside) {
        setShow(true);
        mouseX.set(x);
        mouseY.set(y);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div ref={parentRef} className="absolute inset-0">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{opacity: 1}}
              className="fixed blur-2xl inset-0 origin-top-left w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                x: mouseX,
                y: mouseY,
                background:
                  "radial-gradient(circle,rgba(27, 10, 154, 0.5) 0%, rgba(27, 10, 154, 0) 100%)",
              }}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
