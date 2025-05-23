import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const images = [
  {
    images: [
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-1.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-2.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-3.webp",
      "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-4.webp",
    ],

    width: "420px",
    height: "236px",
  },
];

const MarqueeContent = ({
  images,
  width,
  height,
}: {
  images: string[];
  width: string;
  height: string;
}) => {
  return (
    <>
      {images.map((image, index) => (
        <div
          key={index}
          className={`inline-block relative w-[420px] h-[236px] mr-[4px]`}
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
    <div className="relative">
      <div className="flex  flex-col gap-7 min-h-[660px]">
        <Image alt="" width={50} height={50} src="/plane.svg" />
        <p className="text-white text-2xl w-[28%] min-w-[320px]">
          Launch with ease using stunning, ready-to-use themse & sections
          designed for every need
        </p>
      </div>
      <div className="absolute h-auto w-[65%]  inset-0 min-w-auto top-[95px] flex overflow-hidden flex-col right-0 left-auto bottom-0 ">
        <div className="overflow-hidden h-full relative">
          <motion.div
            animate={{ x: [0, `-${4 * (420 + 4)}px`] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 10,
            }}
            className=" whitespace-nowrap h-full"
          >
            <MarqueeContent
              images={images[0].images}
              width={images[0].width}
              height={images[0].height}
            />
            <MarqueeContent
              images={images[0].images}
              width={images[0].width}
              height={images[0].height}
            />
          </motion.div>
            <div className="absolute top-0 left-0 bottom-0 w-[120px] bg-gradient-to-r from-black   to-transparent">

            </div>
                        <div className="absolute top-0 right-0 bottom-0 w-[120px] bg-gradient-to-l from-black   to-transparent">

            </div>
        </div>
        {/* 
        <Image
          width={900}
          height={400}
          alt="image"
          src={
            "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-10.webp"
          }
        />
        <Image
          width={900}
          height={400}
          alt="image"
          src={
            "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-2.webp"
          }
        /> */}
      </div>
    </div>
  );
}
