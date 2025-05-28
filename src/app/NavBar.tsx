import { Button } from "@/components/ui/Button";
import { dir } from "console";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Arrow from "@/assets/arrow.svg";

const menus = {
  Product: [
    {
      url: "/product-nav1.svg",
      title: "Editor",
      description: "Effective Visual Builder",
    },
    {
      url: "/product-nav2.svg",
      title: "Interaction & Animation",
      description: "Design interactive websites",
    },
    {
      url: "/product-nav3.svg",
      title: "Grid & Layouts",
      description: "Structure more easily",
    },
    {
      url: "/product-nav4.svg",
      title: "Media Manager",
      description: "Manage & edit site assets",
    },

    {
      url: "/product-nav5.svg",
      title: "Typography",
      description: "Customize your branding",
    },
    {
      url: "/product-nav6.svg",
      title: "SEO",
      description: "Optimize your SEO workflow",
    },
    {
      url: "/product-nav7.svg",
      title: "Form Builder",
      description: "Design any web forms",
    },
    {
      url: "/product-nav8.svg",
      title: "Accessibility",
      description: "Accessible to everyone",
    },
    {
      url: "/product-nav9.svg",
      title: "Pop-up Builder",
      description: "Build pop-ups visually",
    },
    {
      url: "/product-nav10.svg",
      title: "Figma to Droip",
      description: "Turn static designs into live websites",
    },
    {
      url: "/product-nav11.svg",
      title: "Content Manager",
      description: "Centralied dynamic content management",
    },
  ],
  Resources: [
    {
      url: "/resources-nav1.svg",
      title: "Wordpress Themes",
      description: "Jumpstart with premium themes",
    },

    {
      url: "/resources-nav2.svg",
      title: "Droip Blogs",
      description: "Explore what's happening",
    },
    {
      url: "/resources-nav3.svg",
      title: "Documentation",
      description: "Learn from documentation",
    },
    {
      url: "/resources-nav4.svg",
      title: "Release Notes",
      description: "Check what's new",
    },
  ],
  Support: [
    {
      url: "/support-nav1.svg",
      title: "Get Support",
      description: "Fix your issues with experts",
    },
    {
      url: "/support-nav2.svg",
      title: "Feature Request",
      description: "Let us know what's missing",
    },
    {
      url: "/support-nav3.svg",
      title: "Contact",
      description: "Contact for your query",
    },
  ],
};

type menus = keyof typeof menus;

const SubMenu = ({
  menu,
  navHeight,
  defaultMenu,
}: {
  menu: menus;
  defaultMenu: menus;
  navHeight: number;
}) => {
  return (
    // <AnimatePresence>
    <motion.div
      style={{ top: navHeight }}
      key={menu}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ ease: "easeOut" }}
      className="absolute w-[674px] left-0 bg-[rgb(23,23,23,0.8)] backdrop-blur-md rounded-3xl overflow-hidden z-30"
    >
      <div className="grid grid-cols-2 gap-y-[8px] gap-x-[18px] p-6">
        {menus[menu].map((content, index) => (
          <motion.a
            href=""
            whileHover={{ background: "#1d1f21" }}
            key={index}
            className="flex items-start gap-6 p-3 rounded-xl"
          >
            <Image alt="" width={24} height={24} src={content.url} />
            <div className="">
              <p className="text-white text-[16px]">{content.title}</p>
              <p className="text-secondary text-[12px]">
                {content.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
    // </AnimatePresence>
  );
};

const NavLink = ({
  selectedMenu: menu,
  setMenu,
  defaultMenu,
  navHeight,
}: {
  setMenu: (menu: menus | null) => void;
  selectedMenu: menus | null;
  defaultMenu: menus | null;
  navHeight: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDimensions({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setMenu(defaultMenu)}
      onHoverEnd={() => {
        setMenu(null);
      }}
      onTapStart={() => setMenu(defaultMenu)}
      whileTap={"hover"}
      whileHover={"hover"}
      variants={{}}
      className="py-4 z-50"
    >
      <motion.p
        variants={{ hover: { color: "white" } }}
        className="text-secondary cursor-pointer flex flex-row gap-2 justify-center items-center"
      >
        {defaultMenu}
        <motion.span variants={{ hover: { rotate: "180deg" } }}>
          <Image alt="" width={12} height={12} src="/arrow.svg" />
        </motion.span>
      </motion.p>
      {menu && menu === defaultMenu && (
        <div>
          {
            <div
              className="fixed"
              style={{
                left: dimensions.x + dimensions.width / 2 - 6,
                top: dimensions.y + dimensions.height - 7,
              }}
            >
              <Image alt="" width={12} height={7} src={"/tooltip-arrow.svg"} />
            </div>
          }
          <SubMenu
            menu={menu}
            defaultMenu={defaultMenu}
            navHeight={navHeight}
          />
        </div>
      )}
    </motion.div>
  );
};

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const container = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [menu, setMenu] = useState<menus | null>(null);

  const [scrollDirection, setScrollDirection] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!scrollYProgress.getPrevious()) return;

    const direction = latest - scrollYProgress.getPrevious()! >= 0 ? 1 : -1;
    // console.log("direction", direction);
    setScrollDirection(direction);
  });

  console.log("menu", menu);

  useLayoutEffect(() => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  console.log("ss", scrollDirection);

  return (
    <motion.div
      ref={container}
      initial={"down"}
      animate={scrollDirection === 1 ? "up" : "down"}
      variants={{ up: { y: -dimensions.height }, down: { y: 0 } }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className=" sticky top-0 z-40"
    >
      <div className="absolute inset-0 bg-[rgb(28,31,30,0.7)] backdrop-blur-md"></div>
      <div className="flex justify-between max-w-[1330px] mx-auto z-20">
        <div className="relative flex gap-10 items-stretch">
          <div className="py-4">
            <p className="text-white ">Home</p>
          </div>
          <NavLink
            selectedMenu={menu}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Product"}
          />
          <NavLink
            selectedMenu={menu}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Resources"}
          />
          <NavLink
            selectedMenu={menu}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Support"}
          />
          <p className="text-secondary py-4">Pricing</p>
        </div>
        <div className="flex gap-5 justify-center py-2 items-center z-20">
          <Button variant="secondary" text="Login" />
          <Button text="Get Started">Get Started</Button>
        </div>
      </div>
    </motion.div>
  );
}
