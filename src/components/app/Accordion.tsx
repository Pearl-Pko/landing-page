import React, { useState } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
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

const transition: Transition = { duration: 0.6, ease: "easeOut" };

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
    <MotionConfig transition={{ duration: 0.6, ease: "easeOut" }}>
      <div className="lg:h-lvh lg:flex items-center">
        <div
          className={cn(
            "lg:flex flex-row gap-12 items-stretch w-full justify-between",
            align === "rtl" && "flex-row-reverse"
          )}
        >
          <div className={cn("flex flex-col gap-5 lg:max-w-[400px]")}>
            {items["section"].map((item, index) => {
              return (
                <motion.div
                  initial={"inactive"}
                  animate={selectedIndex === index ? "active" : "inactive"}
                  key={index}
                  className={cn("flex flex-row gap-10 items-stretch w-full")}
                  variants={{
                    active: { flex: 2 },
                    inactive: { flex: 1 },
                  }}
                >
                  <div className="flex flex-col items-center ">
                    <div className="h-10 flex items-center">
                      <div className="relative w-[7px] h-[7px] ">
                        <motion.div
                          variants={{
                            inactive: { scale: 0 },
                            active: { scale: 1 },
                          }}
                          className="absolute -inset-2 bg-secondary/10 rounded-full"
                        ></motion.div>
                        <div className="absolute bg-primary rounded-full w-full h-full"></div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-[1.5px] flex-1  min-h-12 bg-secondary/10 rounded-full",
                        index === items.section.length - 1 &&
                          selectedIndex !== index &&
                          "hidden"
                      )}
                    ></div>
                  </div>

                  <div
                    className="flex flex-col  cursor-pointer gap-5 w-full flex-[1]"
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
                            width={1536}
                            height={1086}
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
              "hidden lg:inline-block w-[55%] h-[538px] relative overflow-hidden rounded-lg"
            )}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={selectedIndex}
                initial={"visible"}
                animate={"present"}
                exit="hidden"
                transition={{ duration: 1, ease: "easeInOut" }}
                variants={{
                  visible: () => {
                    return direction === 1
                      ? {
                          width: "100%",
                          zIndex: 1,
                        }
                      : {
                          width: "0%",
                          zIndex: 2,
                        };
                  },
                  present: {
                    width: "100%",
                  },
                  hidden: (direction: number) => {
                    return direction === 1
                      ? {
                          width: "0%",
                          zIndex: 2,
                        }
                      : {
                          width: "100%",
                          zIndex: 1,
                          transition: { delay: 1 },
                        };
                  },
                }}
                className="absolute w-full h-full origin-left overflow-hidden"
              >
                <Image
                  alt="image"
                  width={1536}
                  height={1086}
                  src={selectedImage}
                  className={
                    "rounded-2xl w-full h-full bg-no-repeat object-cover object-top-left"
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
