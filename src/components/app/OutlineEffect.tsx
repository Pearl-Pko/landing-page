import React from "react";
import { motion } from "motion/react";

export default function OutlineEffect() {
  return (
    <motion.div
      initial="inactive"
      whileInView={"active"}
      viewport={{ once: true }}
      transition={{ staggerChildren: 1 }}
      className="relative"
    >
      <motion.div
        variants={{ active: { scaleX: 1 }, inactive: { scaleX: 0 } }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{background: "linear-gradient(90deg, rgba(86, 65, 243, 0) 0%, #5641f3 62%, #1B0A9A 100%)"}}
        className="h-[1px] absolute w-full origin-left"
      ></motion.div>
      <motion.div
        variants={{ active: { height: 80 }, inactive: { height: 0 } }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute origin-top right-0 top-0 h-20 w-[1px] bg-primary"
      >
        <motion.div
          transition={{ duration: 0.7, ease: "easeOut" }}
          variants={{ active: { scale: 1 }, inactive: { scale: 0 } }}
          className="absolute right-0 bg-primary rounded-full w-3 h-3 bottom-0 translate-y-1/2 translate-x-1/2"
        ></motion.div>
      </motion.div>
    </motion.div>
  );
}
