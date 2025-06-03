import { Button } from "@/components/ui/Button";
import { spring } from "motion";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";

const cards = [
  {
    title: "Content Manager",
    description:
      "Handle dynamic data with the built-in content manager. Liink data dynamically to any part of your website",
    image: "https://droip.com/wp-content/uploads/2025/03/CMS1.webp",
  },
  {
    title: "Media Manager",
    description:
      "Organize and edit all media assets, including SVGs, Lottie, and icons, with the built-in image and shape editor",
    image: "https://droip.com/wp-content/uploads/2025/03/Media-Manager.webp",
  },
  {
    title: "SEO",
    description:
      "Dynamically update SEO content across pages to optimize your website's search performance",
    image: "https://droip.com/wp-content/uploads/2025/03/dymanic-seo2-1.webp",
  },
];

export default function StickyCards() {
  const targetRef1 = useRef(null);
  const targetRef2 = useRef(null);
  const targetRef3 = useRef(null);

  const { scrollYProgress : scrollYProgress1 } = useScroll({
    target: targetRef1,
    offset: ["start end", "start 0.5"],
  });
  const { scrollYProgress : scrollYProgress2 } = useScroll({
    target: targetRef2,
    offset: ["start end", "start 0.5"],
  });
  const { scrollYProgress : scrollYProgress3 } = useScroll({
    target: targetRef3,
    offset: ["start end", "start 0.5"],
  });


  const scale1 = useTransform(scrollYProgress1, [0, 1], [1.1, 1]);
  const scale2 = useTransform(scrollYProgress2, [0, 1], [1.1, 1]);
  const scale3 = useTransform(scrollYProgress3, [0, 1], [1.1, 1]);

  return (
    <div className="flex items-stretch justify-center flex-col">
      {cards.map((card,  index) => {
        return (
          <motion.div
            key={index}
            ref={[targetRef1, targetRef2, targetRef3][index]}
            style={{ scaleX: [scale1, scale2, scale3][index] }}
            className="sticky w-full max-w-[1330px] mx-auto top-[calc((100vh-600px)/2)] mb-[calc((100vh-600px)/2)] px-4 py-8 lg:p-10 lg:pr-0 bg-[#212426] rounded-3xl flex flex-col lg:flex-row justify-between gap-24 h-[600px]"
          >
            <div className="flex flex-col  gap-8 lg:justify-between flex-1">
              <p className="text-white text-2xl lg:text-3xl font-semibold">{card.title}</p>
              <div className="text-base lg:text-2xl lg:my-20">
                <p className="text-secondary lg:text-white">{card.description}</p>
                <Button variant="link" text="View Details" />
              </div>
            </div>
            <div className="relative flex-2">
              <div className="absolute w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-l-2xl"
                  alt="image"
                  src={card.image}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
