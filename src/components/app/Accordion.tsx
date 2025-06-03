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

export default function Accordion({
  items,
  align = "ltr",
}: {
  items: AccordionType;
  align?: "ltr" | "rtl";
}) {
  const [direction, setDirection] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedItem = items["section"][selectedIndex];
  const selectedImage = items["image"][selectedIndex];
  return (
    <div className="lg:h-lvh grid lg:place-content-center">
      <div className="lg:grid grid-cols-5 gap-70">
        <div
          className={cn(
            "flex flex-col col-span-2 gap-5 row-start-1",
            align === "rtl" && "col-start-4"
          )}
        >
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
                    <div className="relative w-[7px] h-[7px] ">
                      <motion.div
                        transition={transition}
                        variants={{
                          inactive: { scale: 0 },
                          active: { scale: 1 },
                        }}
                        className="absolute -inset-2 bg-secondary/10 rounded-full"
                      ></motion.div>
                      <div className="absolute bg-primary rounded-full w-full h-full"></div>
                    </div>
                  </div>
                  <div className="w-[1.5px] flex-1  min-h-12 h-3/4 bg-secondary/10 rounded-full"></div>
                </div>

                <div
                  className="flex flex-col items-start cursor-pointer gap-5"
                  onClick={() => {
                    setDirection(index > selectedIndex ? 1 : -1);
                    setSelectedIndex(index);
                  }}
                >
                  <motion.p
                    variants={{
                      inactive: { scale: 0.7, opacity: 0.5 },
                      active: { scale: 1, opacity: 1 },
                    }}
                    transition={transition}
                    className="text-2xl text-white lg:text-3xl font-semibold text-left origin-left"
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
                        className="overflow-hidden flex flex-col lg:block gap-[18px]"
                      >
                        <div>
                          <div className="text-secondary">{item.body}</div>
                          {item.link && (
                            <Button variant="link" text="View Details" />
                          )}
                        </div>
                        <Image
                          style={{
                            objectFit: "cover",
                          }}
                          alt=""
                          width={200}
                          height={200}
                          className="lg:hidden w-full rounded-xl"
                          src={items.image[index]}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div
          className={cn(
            "hidden lg:inline-block col-span-3 h-[500px] relative overflow-hidden row-start-1",
            align === "rtl" && "col-start-1"
          )}
        >
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
