import React, { useState } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/utils/utils";
import { Transition } from "motion";

export type AccordionType = {
  section: {
    title: string;
    body: string;
    link?: string;
  }[];
  image: string[];
};

const transition: Transition = { duration: 0.6, ease: "easeInOut" };

export default function Accordion({ items }: { items: AccordionType }) {
  const [direction, setDirection] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedItem = items["section"][selectedIndex];
  const selectedImage = items["image"][selectedIndex];
  return (
    <div className="h-lvh grid place-content-center">
      <div className="grid grid-cols-5 grid-rows-1 gap-70">
        <div className="inline-flex flex-col col-span-2 gap-5">
          {items["section"].map((item, index) => {
            return (
              <motion.div
                initial={"inactive"}
                animate={selectedIndex === index ? "active" : "inactive"}
                key={index}
                transition={transition}
                className={cn("flex gap-10 items-stretch")}
                variants={{
                  active: { flex: 1 },
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 flex items-center">
                    <div className="w-[7px] h-[7px] bg-primary rounded-full"></div>
                  </div>
                  <div className="w-[1.5px] flex-1  min-h-12 h-3/4 bg-secondary rounded-full"></div>
                </div>

                <div
                  className="flex flex-col items-start cursor-pointer gap-5"
                  onClick={() => {
                    setDirection(index > selectedIndex ? 1 : -1)
                    setSelectedIndex(index);
                  }}
                >
                  <motion.p
                    variants={{
                      inactive: { scale: 0.7 },
                      active: { scale: 1 },
                    }}
                    transition={transition}
                    className="text-white text-3xl font-semibold text-left origin-left"
                  >
                    {item.title}
                  </motion.p>
                  <AnimatePresence>
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={transition}
                        className="overflow-hidden"
                      >
                        <div className="text-secondary">{item.body}</div>
                        {item.link && (
                          <Button variant="link" text="View Details" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="col-span-3 inline-flex relative h-[500px] overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={selectedIndex}
              initial="visible"
              exit="hidden"
              variants={{
                visible: {
                  left: 0,
                  zIndex: 1,
                },
                hidden: (direction: number) => ({
                  left: 1000 * direction,
                  zIndex: 2,
                }),
              }}
              transition={transition}
              className="absolute w-full h-full origin-left"
            >
              <Image
                alt="image"
                fill
                src={selectedImage}
                className="rounded-lg w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
