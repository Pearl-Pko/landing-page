import React from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/utils";
import { ClassValue } from "clsx";

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
  return (
    <motion.div
      transition={{ duration: duration, ease: "easeOut", delay: delay }}
      style={{
        backgroundImage:
          "linear-gradient(#ffffff, #ffffff),  linear-gradient(#9C958A, #9C958A)",
        backgroundPosition: "0% 0%, 0%, 0%",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        backgroundSize: "0% 100%, 100% 100%",
        backgroundClip: "text",
      }}
      //   style={{backgroundRepeat: "no-repeat", backgroundPosition: "20px 0%"}}
      // animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
      initial={"inactive"}
      whileInView={"active"}
      viewport={{ once: true }}
      variants={{
        inactive: { backgroundSize: "0% 100%, 100% 100%" },
        active: { backgroundSize: "100% 100%, 100% 100%" },
      }}
      className={cn(className, "text-transparent")}
      //   className="text-secondary text-3xl relative -z-10"
    >
      {children}
    </motion.div>
  );
}
