import { Button } from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

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
  const currentIndex = 0;

  return (
    <div className="">
      <div className="mx-auto  max-w-[1330px] ">
        <div className="relative">
          <div className="flex top-[100px] flex-row gap-16 items-start">
            <div className="h-screen flex items-center sticky top-0">
              <p className="text-8xl  text-white break-keep ">
                Create <span className="whitespace-nowrap">pixel-perfect</span>{" "}
                accuracy in the atomic level{" "}
              </p>
            </div>
            <div className="">
              <div className="sticky flex snap-mandatory snap-y h-[200vh] overflow-y-scroll flex-col items-stretch justify-between gap-4">
                {cards.map((card, index) => {
                  return (
                    <div className="snap-start" key={index}>
                      <Image alt="" width={900} height={300} src={card.image} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sticky top-0 h-screen flex flex-col justify-end">
              <p className="text-white">
                Create your website from the ground up with complete control
                over every element, down to the smallest detail. Get Started
                With Tutorials Jumpstart your business with beautifully crafted
                themes and sections
              </p>
              <Button text="Get started with tutorials" variant="link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
