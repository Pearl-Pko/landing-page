import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import OutlineEffect from "@/components/app/OutlineEffect";

export default function AppIntegration() {
  const [containerHovered, setContainerHovered] = useState(false);
  const [hoveredAppIconIndex, setHoveredAppIconIndex] = useState(-1);

  return (
    <div className="max-w-[1330px] mx-auto py-16 lg:py-32 px-4">
      <p className="text-white text-5xl lg:text-8xl font-semibold">
        App <span className="block">integration</span>
      </p>
      <div className="flex mt-6 lg:mt-7 mb-14 lg:mb-24 gap-6 lg:gap-8">
        <div className="flex-1">
          <OutlineEffect />
        </div>
        <p className="text-white flex-2 text-lg min-w-auto leading-[1.2] lg:text-2xl max-w-[270px] lg:max-w-[400px]">
          Connect your go-to apps effortelessy within the builder for a smooth
          and uninterrupted workflow
        </p>
      </div>
      <motion.div
        onMouseEnter={() => setContainerHovered(true)}
        onMouseLeave={() => setContainerHovered(false)}
        className="grid grid-cols-4 lg:grid-cols-6 gap-1 relative"
      >
        {Array.from({ length: 24 }).map((_, index) => {
          let imageSrc: string;
          imageSrc = `/app-icon${index + 1}.svg`;
          if (index + 1 === 16) {
            imageSrc =
              "https://droip.com/wp-content/uploads/2025/04/image-56386.webp";
          }
          if (index + 1 === 24) {
            imageSrc =
              "https://droip.com/wp-content/uploads/2025/04/Re-captcha.webp";
          }
          return (
            <motion.div
              key={index}
              onHoverStart={() => {
                console.log("hover", index);
                setHoveredAppIconIndex(index);
              }}
              onHoverEnd={() => {
                setHoveredAppIconIndex(-1);
              }}
              custom={hoveredAppIconIndex}
              animate={
                hoveredAppIconIndex === index
                  ? "active"
                  : containerHovered
                  ? "inactive"
                  : "idle"
              }
              variants={{
                active: {
                  background: "#282C2E",
                  transition: { delay: 0.3, ease: "easeOut", duration: 1 },
                },
                inactive: {
                  filter: "blur(3px)",
                  transition: { ease: "easeOut", duration: 1 },
                },
                idle: {},
              }}
              className="bg-[#1d1f21] min-h-[100px] flex items-center justify-center rounded-md"
            >
              <motion.img
                variants={{ active: { scale: 1.3 }, inactive: {}, idle: {} }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                src={imageSrc}
                className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                alt=""
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
