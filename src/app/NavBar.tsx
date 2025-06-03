import { Button } from "@/components/ui/Button";
import { dir } from "console";
import {
  AnimatePresence,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Arrow from "@/assets/arrow.svg";
import { cn } from "@/utils/utils";

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
  mobileNav,
}: {
  menu: menus;
  defaultMenu: menus;
  navHeight: number;
  mobileNav: boolean;
}) => {
  return (
    // <AnimatePresence>
    <motion.div
      style={{ top: navHeight }}
      key={menu}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={mobileNav ? { height: 0 } : {}}
      transition={{ ease: "easeOut" }}
      className="lg:absolute origin-top  lg:w-[674px] lg:left-0 lg:bg-[rgb(23,23,23,0.8)] lg:backdrop-blur-md rounded-3xl overflow-hidden z-[50]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[8px] gap-x-[18px] p-6">
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
              <p className="hidden lg:block text-secondary text-[12px]">
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
  mobileNav,
}: {
  setMenu: (menu: menus | null) => void;
  selectedMenu: menus | null;
  defaultMenu: menus | null;
  navHeight: number;
  mobileNav: boolean;
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
      // onBlur={() => {
      //   if (defaultMenu === menu) setMenu(null);
      // }}
      onClick={() => {
        if (menu === defaultMenu) setMenu(null); // close the drawer
        else setMenu(defaultMenu);
      }}
      // whileHover={"focused"}
      // whileFocus={"focused"}
      animate={menu === defaultMenu ? "focused" : "blur"}
      variants={{}}
      className="py-4 z-50 "
    >
      <motion.p
        variants={{ focused: { color: "white" } }}
        className="text-secondary cursor-pointer flex flex-row gap-2 items-center"
      >
        {defaultMenu}
        <motion.span variants={{ focused: { rotate: "180deg" } }}>
          <Image alt="" width={12} height={12} src="/arrow.svg" />
        </motion.span>
      </motion.p>
      <AnimatePresence>
        {menu && menu === defaultMenu && (
          <div className="z-50">
            <div
              className="hidden lg:block fixed"
              style={{
                left: dimensions.x + dimensions.width / 2 - 6,
                top: dimensions.y + dimensions.height - 7,
              }}
            >
              <Image alt="" width={12} height={7} src={"/tooltip-arrow.svg"} />
            </div>

            <SubMenu
              menu={menu}
              mobileNav={mobileNav}
              defaultMenu={defaultMenu}
              navHeight={navHeight}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const container = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [menu, setMenu] = useState<menus | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [scrollDirection, setScrollDirection] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!scrollYProgress.getPrevious()) return;

    const direction = latest - scrollYProgress.getPrevious()! >= 0 ? 1 : -1;
    console.log("direction", dimensions);
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
    // <div className="">
    <motion.div
      ref={container}
      initial={"down"}
      animate={showMobileNav ? "down" : scrollDirection === 1 ? "up" : "down"}
      variants={{ up: { y: -dimensions.height }, down: { y: 0 } }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={cn("sticky top-0 z-40 lg:h-16", showMobileNav && "h-screen")}
    >
      <div className="hidden lg:block absolute inset-0 bg-[rgb(28,31,30,0.8)]  backdrop-blur-lg"></div>
      <div className="max-w-[1330px] bg-[rgb(28,31,30,0.9)]  backdrop-blur-xl w-full  mx-auto px-4 h-16 flex flex-row justify-between items-center z-40 lg:hidden">
        <div className="z-[60]">
          <Image src="/logo.svg" alt="" width={64} height={24} />
        </div>
        <div
          onClick={() => {
            setShowMobileNav((prev) => !prev);
          }}
          className="relative w-[38px] h-[38px] justify-center items-center flex flex-col gap-1"
        >
          <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
            <motion.div
              animate={showMobileNav ? { rotate: 45, y: 6 } : {}}
              className="w-[18px] h-[2px] bg-primary origin-center"
            ></motion.div>
            <motion.div
              animate={showMobileNav ? { opacity: 0 } : {}}
              className=" w-[18px] h-[2px] bg-primary"
            ></motion.div>
            <motion.div
              animate={showMobileNav ? { rotate: -45, y: -6 } : {}}
              className=" w-[18px] h-[2px] bg-primary origin-center"
            ></motion.div>
          </MotionConfig>
        </div>
      </div>

      <motion.div
        className={cn(
          "flex flex-col items-start w-full bg-[rgb(28,31,30,0.9)] lg:bg-none  backdrop-blur-xl lg:backdrop-blur-none",
          "lg:flex lg:flex-row pl-5 lg:pl-0 lg:justify-between max-w-[1330px] mx-auto   overflow-hidden lg:overflow-visible z-20 lg:h-16",
          //bg-[rgb(28,31,30,0.7)]  backdrop-blur-md
          showMobileNav && "overflow-y-scroll"
        )}
        initial={"hide"}
        animate={showMobileNav ? "show" : "hide"}
        variants={{
          show: { height: "calc(100vh - var(--spacing) * 16" },
          hide: { height: "0vh" },
        }}

        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* <div className=" absolute inset-0 bg-[rgb(28,31,30,0.9)]  backdrop-blur-xl"></div> */}

        <div className="relative flex flex-col items-stretch  lg:flex-row lg:gap-10 z-40">
          <div className="py-4">
            <p className="text-white ">Home</p>
          </div>
          <NavLink
            selectedMenu={menu}
            mobileNav={showMobileNav}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Product"}
          />
          <NavLink
            selectedMenu={menu}
            mobileNav={showMobileNav}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Resources"}
          />
          <NavLink
            selectedMenu={menu}
            mobileNav={showMobileNav}
            setMenu={setMenu}
            navHeight={dimensions.height}
            defaultMenu={"Support"}
          />
          <p className="text-secondary py-4">Pricing</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-center py-2 items-center z-20">
          <Button variant="secondary" text="Login" />
          <Button text="Get Started">Get Started</Button>
        </div>
      </motion.div>
    </motion.div>
    // </div>
  );
}
