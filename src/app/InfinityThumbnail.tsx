import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import RadialBlurCursorEffect from "@/components/app/RadialBlurCursorEffect";

const contents = [
  {
    images: [
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-1.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-2.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-3.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-4.webp",
    ],

    width: 420,
    height: 236,
    duration: 25,
  },
  {
    images: [
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-8.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-4.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-7.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template1-1.webp",
    ],

    width: 320,
    height: 180,
    duration: 10,
  },
  {
    images: [
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-9.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-11.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-6.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-12.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-12-1.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template4-1.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template8.webp",
    ],

    width: 240,
    height: 135,
    duration: 25,
  },
];

const MarqueeContent = ({
  images,
  width,
  height,
  keyPrefix,
}: {
  images: string[];
  keyPrefix: string;
  width: number;
  height: number;
}) => {
  return (
    <>
      {images.map((image, index) => (
        <div
          key={`${keyPrefix}-${index}`}
          className={`inline-block relative mr-[4px]`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            fill
            className="absolute w-full h-full rounded-md"
            alt="image"
            style={{ objectFit: "cover" }}
            src={image}
          />
        </div>
      ))}
    </>
  );
};

export default function InfinityThumbnail() {
  return (
    <div className="relative flex flex-col">
      {/* <RadialBlurCursorEffect> */}
      <div className="mb-10 lg:mb-0 flex  flex-col gap-7 lg:min-h-[660px] px-4">
        <Image alt="" width={50} height={50} src="/plane.svg" />
        <p className="text-white leading-[1] text-lg lg:text-2xl lg:w-[28%] min-w-[320px]">
          Launch with ease using stunning, ready-to-use themse & sections
          designed for every need
        </p>
      </div>
      <div className="relative h-auto lg:min-h-auto lg:static z-[20]">
        <div className="lg:absolute h-auto w-full lg:w-[65%]  inset-0 min-w-auto top-[95px] flex overflow-hidden flex-col right-0 left-auto bottom-0 ">
          <div className="overflow-hidden relative h-auto">
            {contents.map((content, index) => {
              return (
                <motion.div
                  animate={{
                    x: [0, `-${content.images.length * (content.width + 4)}px`],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration: content.duration,
                  }}
                  className=" whitespace-nowrap h-auto"
                >
                  <MarqueeContent
                    keyPrefix="1"
                    images={content.images}
                    width={content.width}
                    height={content.height}
                  />
                  <MarqueeContent
                    keyPrefix="2"
                    images={content.images}
                    width={content.width}
                    height={content.height}
                  />
                </motion.div>
              );
            })}

            <div className="absolute top-0 left-0 bottom-0 w-[50px] lg:w-[120px] bg-gradient-to-r from-black   to-transparent"></div>
            <div className="absolute top-0 right-0 bottom-0 w-[50px] lg:w-[120px] bg-gradient-to-l from-black   to-transparent"></div>
          </div>
        </div>
      </div>
      <RadialBlurCursorEffect />
    </div>
  );
}
