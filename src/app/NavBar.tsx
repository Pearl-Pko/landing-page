import { Button } from "@/components/ui/Button";
import { dir } from "console";
import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useState } from "react";
import { motion } from "motion/react";

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const [scrollDirection, setScrollDirection] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!scrollYProgress.getPrevious()) return;

    const direction = latest - scrollYProgress.getPrevious()! > 0 ? 1 : -1;
    // console.log("direction", direction);
    setScrollDirection(direction);
  });

  return (
    <motion.div
      animate={scrollDirection === 1 ? "up" : "down"}
      variants={{ up: { y: -100 }, down: { y: 0 } }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="bg-[#1C1E1F] sticky top-0 z-40"
    >
      <div className="flex justify-between py-4 max-w-[1330px] mx-auto">
        <div className="flex gap-10 items-center">
          <p className="text-white">Home</p>
          <p className="text-secondary">Product</p>
          <p className="text-secondary">Resources</p>
          <p className="text-secondary">Support</p>
          <p className="text-secondary">Pricing</p>
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" text="Login" />
          <Button text="Get Started">Get Started</Button>
        </div>
      </div>
    </motion.div>
  );
}
