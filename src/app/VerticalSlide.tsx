import { Button } from "@/components/ui/Button";
import { dir } from "console";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  easeOut,
} from "motion/react";
import next from "next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const cards = [
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider2.webp",
  },
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider4.webp",
  },
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider3.webp",
  },
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider1.webp",
  },
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider5.webp",
  },
  {
    image: "https://droip.com/wp-content/uploads/2025/03/vertical-slider2.webp",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function VerticalSlide() {
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const imageOutlineHeight = useMotionValue(24);
  const imageOutlineTop = useMotionValue(0);
  const imageSliderRef = useRef<HTMLDivElement | null>(null);

  const markerTarget = useMotionValue(0);

  const imageOutlineRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const index = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [2, 3, 4, 5],
    {
      ease: easeOut,
    }

    // {ease: }
  );

  const transform = useTransform(
    index,
    [2, 3, 4, 5],
    ["0%", "-20%", "-40%", "-60%"]
  );

  // const transform = useSpring(rawTransform, {
  //   stiffness: 1000,
  //   damping: 100,
  //   mass: 1,
  // });

  const handleAlign = (direction: number) => {
    const currentIndex = clamp(
      direction === 1 ? Math.floor(index.get()) : Math.floor(index.get()) + 1,
      2,
      5
    );
    const nextIndex = clamp(
      direction === 1 ? Math.floor(index.get()) + 1 : Math.floor(index.get()),
      2,
      5
    );
    console.log("currentIndex", currentIndex, nextIndex);
    let frac = index.get() - Math.floor(index.get());
    frac = direction === 1 ? frac : 1 - frac;

    const currentImageRect =
      imagesRefs.current[currentIndex]?.getBoundingClientRect();
    const nextImageRect =
      imagesRefs.current[nextIndex]?.getBoundingClientRect();

    imageOutlineHeight.set(
      nextImageRect?.height && currentImageRect?.height
        ? currentImageRect?.height +
            (nextImageRect.height - currentImageRect.height) * frac
        : 0
    );

    const target =
      nextImageRect?.top && currentImageRect?.top
        ? currentImageRect.top +
          (nextImageRect.top - currentImageRect.top) * frac
        : 0;
    markerTarget.set(
      target - imageSliderRef.current?.getBoundingClientRect().top!
    );
    imageOutlineTop.set(
      target - imageSliderRef.current?.getBoundingClientRect().top!
    );
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!scrollYProgress.getPrevious()) return;

    const direction = latest - scrollYProgress.getPrevious()! > 0 ? 1 : -1;
    handleAlign(direction);
  });

  useEffect(() => {
    handleAlign(-1);
  }, []);

  // useEffect(() => {
  //   // const alignTop = () => {
  //   // align top
  //   const imageOutlineBox = imageOutlineRef.current?.getBoundingClientRect();
  //   const currentImageRect =
  //     imagesRefs.current[Math.floor(index.get())]?.getBoundingClientRect();

  //   if (imageOutlineBox && currentImageRect) {
  //     console.log(
  //       "tilt",
  //       currentImageRect.top,
  //       imageOutlineBox.top,
  //       currentImageRect.top - imageOutlineBox.top
  //     );
  //     // imageOutlineTop.set(currentImageRect.top - imageOutlineBox.top);
  //     imageOutlineTop.set(currentImageRect.top - imageOutlineBox.top);
  //   }
  //   // };

  //   // const alignHeight = () => {
  //   // align height
  //   if (currentImageRect) {
  //     imageOutlineHeight.set(currentImageRect.height);
  //   }
  //   // }
  // }, []);

  return (
    <div ref={targetRef} className="mx-auto  max-w-[1330px] h-[200vh] ">
      <div className="sticky top-0 origin-top max-h-[930px] pt-[100px] ">
        <div className="flex flex-row gap-16 items-start overflow-hidden">
          {/* <div className="h-screen flex items-center sticky top-0"> */}
          <p className="text-8xl  text-white break-keep ">
            Create <span className="whitespace-nowrap">pixel-perfect</span>{" "}
            accuracy in the atomic level{" "}
          </p>
          {/* </div> */}
          <div
            ref={imageSliderRef}
            className="max-w-[235px] relative flex items-center justify-center "
          >
            <motion.div
              style={{ y: transform }}
              className="flex   flex-col items-stretch justify-between gap-4"
            >
              {cards.map((card, ind) => {
                const distance = useTransform(index, (i) => Math.abs(i - ind));
                const width = useTransform(
                  distance,
                  [0, 1, 2],
                  ["100%", "75%", "50%"]
                );
                return (
                  <motion.div
                    ref={(el) => void (imagesRefs.current[ind] = el)}
                    className="mx-auto my-auto h-auto"
                    style={{ width: width }}
                    key={ind}
                  >
                    <Image
                      alt=""
                      width={900}
                      height={300}
                      style={{ objectFit: "contain" }}
                      src={card.image}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
            {/* <motion.div
              style={{ y: markerTarget }}
              className="absolute origin-top top-0 rounded-full w-4 h-4 bg-red-200"
            ></motion.div> */}
            <motion.div
              ref={imageOutlineRef}
              // layoutId="shared-layout"
              style={{
                height: imageOutlineHeight,
                y: imageOutlineTop,
              }}
              className="absolute origin-top top-0 inset-0  w-full  border-dashed border-[3px] border-[#00a0a6]"
            >
              <div className="absolute -left-[5px] -top-[5px] h-[8px] w-[8px] border-2 rounded-full border-[#00a0a6] bg-[#212426]"></div>
              <div className="absolute -right-[5px] -top-[5px] h-[8px] w-[8px] border-2 rounded-full border-[#00a0a6] bg-[#212426]"></div>
              <div className="absolute -left-[5px] -bottom-[5px] h-[8px] w-[8px] border-2 rounded-full border-[#00a0a6] bg-[#212426]"></div>
              <div className="absolute -right-[5px] -bottom-[5px] h-[8px] w-[8px] border-2 rounded-full border-[#00a0a6] bg-[#212426]"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-[5px] h-[8px] w-[8px] border-[1px] border-[#585858] bg-[#212426]"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] h-[8px] w-[8px] border-[1px] border-[#585858] bg-[#212426]"></div>
            </motion.div>
          </div>
          <div className="h-screen flex flex-col justify-end">
            <p className="text-white text-2xl">
              Create your website from the ground up with complete control over
              every element, down to the smallest detail
            </p>
            <Button text="Get started with tutorials" variant="link" />
          </div>
        </div>
      </div>
    </div>
  );
}
