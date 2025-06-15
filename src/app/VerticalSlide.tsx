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
import InfinityThumbnail from "./InfinityThumbnail";
import SweepTextOverlay from "@/components/app/SweepTextOverlay";
import Spinner from "@/assets/spinner.svg";
import RadialBlurCursorEffect from "@/components/app/RadialBlurCursorEffect";
import { clamp } from "@/utils/utils";
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
  const desktopTargetRef = useRef(null);
  const mobileTargetRef = useRef<HTMLDivElement | null>(null);

  const currentRef = useRef<HTMLDivElement | null>(null);

  const [currentLayout, setCurrentLayout] = useState<
    "mobile" | "desktop" | null
  >();

  const { scrollYProgress } = useScroll({
    target: currentRef,
    offset: ["start start", "end end"],
  });

  const index = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [2, 3, 4, 5],
    {
      ease: easeOut,
    }
  );

  const fade = useTransform(scrollYProgress, [0.8, 1], [0, 1], {
    ease: easeOut,
  });
  const backgroundValue = useTransform(fade, [0, 1], ["#212426", "#000000"]);
  const topValue = useTransform(fade, (v) => v * 300);
  const jumpStartSectionYValue = useTransform(
    topValue,
    (v) => v * -1 * (currentLayout === "desktop" ? 0 : 1)
  );
  const opacityValue = useTransform(fade, (v) => 1 - v);

  const transform = useTransform(
    index,
    [2, 3, 4, 5],
    ["0%", "-20%", "-40%", "-60%"]
  );

  const finalTransform = useTransform(() => {
    const numericValue = parseFloat(transform.get());
    return `${numericValue - fade.get() * 15}%`;
  });
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const respondToScreenChange = (
      ev: MediaQueryListEvent | MediaQueryList
    ) => {
      if (ev.matches) {
        currentRef.current = desktopTargetRef.current;
        setCurrentLayout("desktop");
      } else {
        currentRef.current = mobileTargetRef.current;
        setCurrentLayout("mobile");
      }
    };

    if (!currentLayout) respondToScreenChange(mediaQuery);

    mediaQuery.addEventListener("change", respondToScreenChange);
    return () =>
      mediaQuery.removeEventListener("change", respondToScreenChange);
  }, [desktopTargetRef.current, mobileTargetRef.current]);

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
    <motion.div className="h-auto" style={{ background: backgroundValue }}>
      <div
        ref={desktopTargetRef}
        className="mx-auto  max-w-[1330px] lg:h-[200vh] px-4"
      >
        <div className="lg:sticky lg:top-0 origin-top lg:max-h-[830px] pt-[100px] ">
          <div className="flex flex-col lg:flex-row lg:gap-16 items-start lg:overflow-hidden">
            {/* <div className="h-screen flex items-center sticky top-0"> */}
            <motion.div
              style={{ opacity: opacityValue, top: topValue }}
              className="text-5xl lg:text-8xl break-keep flex flex-col justify-center font-semibold"
            >
              <SweepTextOverlay>
                <p>
                  Create{" "}
                  <span className="whitespace-nowrap">pixel-perfect</span>{" "}
                  accuracy in the atomic level{" "}
                </p>
              </SweepTextOverlay>
            </motion.div>
            {/* </div> */}
            <div
              ref={mobileTargetRef}
              className="relative h-[200vh] mx-auto w-full order-3 lg:order-0 lg:static lg:h-full"
            >
              <div
                ref={imageSliderRef}
                //  ref={targetRef}
                // ref={(el) => {
                //   // imageOutlineRef.current = el;
                //   // mobileTargetRef.current = el;
                // }}
                className="sticky top-0 origin-top pt-[100px] max-w-[235px] mx-auto  max-h-[830px] lg:max-h-none lg:h-full  lg:relative flex flex-col items-center"
              >
                <div className="overflow-hidden lg:overflow-visible">
                  <motion.div
                    style={{ y: finalTransform, opacity: opacityValue }}
                    className="flex flex-col  items-stretch justify-between gap-4 overflow-hidden"
                  >
                    {cards.map((card, ind) => {
                      const distance = useTransform(index, (i) =>
                        Math.abs(i - ind)
                      );
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
                </div>
                {/* <motion.div
                  style={{ y: markerTarget }}
                  // style={{ opacity: opacityValue, top: topValue }}

                  className="absolute origin-top top-0 rounded-full w-4 h-4 bg-red-200"
                ></motion.div> */}
                <motion.div
                  ref={imageOutlineRef}
                  // layoutId="shared-layout"
                  style={{
                    height: imageOutlineHeight,
                    y: imageOutlineTop,
                    opacity: opacityValue,
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
                <motion.div
                  style={{ opacity: fade }}
                  className="text-white text-9xl font-bold absolute bottom-[360px] lg:bottom-[600px]"
                >
                  Or
                </motion.div>
              </div>
            </div>
            <motion.div
              className="lg:h-screen flex flex-col my-[30px] gap-3 lg:gap-5 lg:mt-[448px] lg:mb-0"
              style={{ opacity: opacityValue, top: topValue }}
            >
              <div className="relative size-16 ">
                <motion.div
                  animate={{ rotate: "720deg" }}
                  transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                    repeatDelay: 0,
                  }}
                >
                  <Spinner style={{ display: "inline" }} className="inline" />
                </motion.div>
              </div>
              <SweepTextOverlay>
                <p className="text-lg lg:text-2xl">
                  Create your website from the ground up with complete control
                  over every element, down to the smallest detail
                </p>
              </SweepTextOverlay>
              <Button text="Get started with tutorials" variant="link" />
            </motion.div>
          </div>
        </div>
      </div>
      <RadialBlurCursorEffect
        blurRadius={500}
        hideOverflow={false}
        // hitSlop={{ top: 1800, bottom: 0, left: 0, right: 0 }}
      >
        <motion.div
          style={{ marginTop: jumpStartSectionYValue }}
          className="max-w-[1330px] mx-auto "
        >
          <div className="grid mx-auto grid-cols-1 lg:grid-cols-2 px-4 lg:px-20">
            <p className="text-3xl lg:text-6xl text-white  lg:col-start-2 font-semibold">
              Jumpstart your business with beautifully crafted themes and
              sections
            </p>
          </div>
          <div className="py-12 lg:pt-0 lg:pb-32">
            <InfinityThumbnail />
          </div>
        </motion.div>
      </RadialBlurCursorEffect>
    </motion.div>
  );
}
