import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/utils/utils";

export default function RadialBlurCursorEffect({
  children,
  size = 700,
  hideOverflow = false,
  hitSlop = { top: 0, bottom: 0, left: 0, right: 0 },
}: {
  children: React.ReactNode | React.ReactNode[];
  blurRadius?: number;
  hideOverflow?: boolean;
  size?: number;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
}) {
  const [show, setShow] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 350, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 350, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parentRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const rect = parentRef.current.getBoundingClientRect();

      const hitbox = {
        left: rect.left + hitSlop.left,
        right: rect.right + hitSlop.right,
        top: rect.top + hitSlop.top,
        bottom: rect.bottom + hitSlop.bottom,
      };

      const isInside =
        x >= hitbox.left &&
        x <= hitbox.right &&
        y >= hitbox.top &&
        y <= hitbox.bottom;

      if (isInside) {
        setShow(true);
        mouseX.set(x - rect.x);
        mouseY.set(y - rect.y);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={parentRef} className={cn("relative overflow-hidden z-30", !hideOverflow && "overflow-visible")}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            className="absolute blur-2xl inset-0 origin-top-left -translate-x-1/2 -z-10 -translate-y-1/2 rounded-full"
            style={{
              x: smoothX,
              y: smoothY,
              width: `${size}px`,
              height: `${size}px`,

              background:
                "radial-gradient(circle,rgba(27, 10, 154, 0.5) 0%, rgba(27, 10, 154, 0) 100%)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
