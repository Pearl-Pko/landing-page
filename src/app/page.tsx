"use client";
import React from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import StickyCards from "./StickyCards";
import VerticalSlide from "./VerticalSlide";
import InfinityThumbnail from "./InfinityThumbnail";
import { Button } from "@/components/ui/Button";
import Accordion, { AccordionType } from "@/components/app/Accordion";

const accordion1: AccordionType = {
  section: [
    {
      title: "Advanced typography",
      body: `Take full control over your ext with precision typography toos.
          Adjust fonts, spacing, and styles to add more character to your
          design`,
    },
    {
      title: "CSS grids and layouts",
      body: `Build complex layouts with ease using CSS Grids. Create
          multi-directional structures, manage spacing, and achieve perfect
          alignment without limitations`,
    },
    {
      title: "Adaptive design",
      body: `Ensure flawless responsiveness across all devices. Design with
            adaptive elements that adjust seamlessly to different screen sizes
            and resolutions.`,
    },
    {
      title: "Designed for efficiency",
      body: `Streamline your workflow with intuitive tools that simplify layout
            structuring. Save time while maintaining complete design accuracy
            and flexibility.`,
    },
  ],

  image: [
    "https://droip.com/wp-content/uploads/2025/03/advanced-typography-1024x724.webp",
    "https://droip.com/wp-content/uploads/2025/03/CSS-Grids-Layouts.webp",
    "https://droip.com/wp-content/uploads/2025/03/auto-responsive-1.webp",
    "https://droip.com/wp-content/uploads/2025/03/Designed-for-Efficiency.webp",
  ],
};

const accordion2: AccordionType = {
  section: [
    {
      title: "Advanced interaction timeline",
      body: `Design smooth, multi-step animations with a timeline-based editor
            for complete control.`,
    },
    {
      title: "Custom timing editor",
      body: `Fine-tune every interaction to deliver flawless performance by
            adjusting delays, durations, easing functions, and more.`,
    },
    {
      title: "Advanced triggers",
      body: ` Trigger animations based on scrolling, hovering, page load, and more
            for a dynamic experience.`,
    },
    {
      title: "Achieve limitless precision",
      body: `Create flawless, interactive designs visually with unmatched
            accuracy and finesse.`,
    },
  ],

  image: [
    "https://droip.com/wp-content/uploads/2025/03/advanced-typography-1024x724.webp",
    "https://droip.com/wp-content/uploads/2025/03/CSS-Grids-Layouts.webp",
    "https://droip.com/wp-content/uploads/2025/03/auto-responsive-1.webp",
    "https://droip.com/wp-content/uploads/2025/03/Designed-for-Efficiency.webp",
  ],
};

export default function page() {
  return (
    <div className="py-5">
      <div className="max-w-[1330px] mx-auto">
        <NavBar />
        <p className="bg-[#212426] text-white inline py-3 px-5 rounded-full">
          No-Code WordPress Site Builder
        </p>
        <div className="grid grid-cols-4 my-20 items-center">
          <div className="col-span-3">
            <h1 className="text-8xl text-white">Break Limit.</h1>
            <h1 className="text-8xl text-white">
              Build <span className="text-primary">Anything.</span>
            </h1>
            <h1 className="text-8xl text-white">No Code Needed</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-secondary">
              Droip is a no-code, drag-and-drop WordPress builder that
              simplifies website creation with powerful capabilities
            </p>
            <div className="flex flex-col">
              <Button variant="secondary" text="Watch Intro" />
              <Button text="Get started with Drop" />
            </div>
          </div>
        </div>
        <div className="relative w-full h-[50vw] ">
          <Image
            className="bg-primary rounded-md py-2 inline"
            fill
            style={{
              objectFit: "contain",
            }}
            // sizes="100vw"
            src={"https://droip.com/wp-content/uploads/2025/04/hero-home1.webp"}
            alt="image"
          />
        </div>

        <div>
          <p className="text-8xl text-white mt-44">
            Design pixel-perfect sites beyond ordinary
          </p>
          <Accordion items={accordion1} />
        </div>

        <div>
          <p className="text-8xl text-white mt-44">
            Craft engaging and immersive interactions
          </p>
          <Accordion items={accordion2} align="rtl" />
        </div>
      </div>

      <div className="bg-black">
        <div className="mx-auto">
          <p className="max-w-[1330px] mx-auto text-8xl text-white py-28">
            Scale your <span className="block">business with</span>
          </p>
          <StickyCards />
        </div>
      </div>
      <VerticalSlide />
      <div>
        <p>Low third-pardy dependencies</p>

        <div>
          More control, less reliance
          <p>
            Get complete control over your website’s performance and aesthetics
            without extra plugins.
          </p>
        </div>
        <div>
          Cost-effective
          <p>
            Reduce ongoing costs with built-in tools that let you scale
            seamlessly without extra expenses.
          </p>
        </div>
        <div>
          Simplified workflow
          <p>
            With everything built in, your design process is streamlined,
            efficient, and hassle-free.
          </p>
        </div>
        <div>
          Streamlined & secure
          <p>
            Fewer external plugins mean fewer vulnerabilities, keeping your site
            secure and lightweight.
          </p>
        </div>
        <video
          name="video"
          type="video\/mp4"
          loop={true}
          muted={true}
          playbackrate="1"
          starttime="0"
          endtime="0"
          lazy="true"
          style={{ objectFit: "fill" }}
          poster=""
        >
          <source
            type="video/mp4"
            src="https://droip.com/wp-content/uploads/2025/03/PanzerV3.mp4#t=0,0"
          />
        </video>
      </div>
      <div>
        <p>Performance that</p>
        <div>
          <p>Clean code output</p>
          <p>
            Droip generates minimal, well-structured code that is free from
            unnecessary bloat ensuring efficiency.
          </p>
          <Image
            width={900}
            height={400}
            src={"https://droip.com/wp-content/uploads/2025/03/clean-code.webp"}
            alt="image"
          />
        </div>
        <div>
          <p>Keep website lightweight</p>
          <p>
            Optimized code means faster load times, improved performance, and a
            smoother user experience.
          </p>
          <Image
            width={900}
            height={400}
            src={
              "https://droip.com/wp-content/uploads/2025/03/lightweight-1024x448.webp"
            }
            alt="image"
          />
        </div>
      </div>
      <div>
        <p>Design and build everything</p>
        <p>more efficiently witht he most advanced granular controls</p>
        <div>
          <div>
            <p>Seamless migration</p>
            <p>
              Migrate your existing design seamlessly into Droip with just a
              click of a button!
            </p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design1.webp"}
              alt="image"
            />
          </div>
          <div>
            <p>Seamless migration</p>
            <p>
              Migrate your existing design seamlessly into Droip with just a
              click of a button!
            </p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design1.webp"}
              alt="image"
            />
          </div>
          <div>
            <Image
              width={900}
              height={400}
              src={
                "https://droip.com/wp-content/uploads/2025/03/design-1-300x92.webp"
              }
              alt="image"
            />
            <p>Form builder</p>
            <p>
              Build forms for any purpose and effortlessly manage form data
              natively.
            </p>
          </div>
          <div>
            <p>CSS preview</p>
            <p>See real-time CSS changes and fine-tune styles as you need.</p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design8.webp"}
              alt="image"
            />
          </div>
          <div>
            <p>Unlimited breakpoints</p>
            <p>
              Achieve pixel-perfect responsiveness across all devices with
              unlimited breakpoints.
            </p>
            <Image
              width={900}
              height={400}
              src={
                "https://droip.com/wp-content/uploads/2025/03/design1-1.webp"
              }
              alt="image"
            />
          </div>
          <div>
            <p>Figma to droip</p>
            <p>
              Seamlessly import Figma designs into Droip and bring your vision
              to life in no time.
            </p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design2.webp"}
              alt="image"
            />
          </div>
          <div>
            <p>Code element</p>
            <p>
              Add custom HTML, CSS, and JavaScript to an element for extended
              functionality.
            </p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design4.webp"}
              alt="image"
            />
          </div>
          <div>
            <p>Pop-up builder</p>
            <p>
              Design engaging pop-ups that captivate visitors and boost
              conversions.
            </p>
            <Image
              width={900}
              height={400}
              src={
                "https://droip.com/wp-content/uploads/2025/03/design5-300x190.webp"
              }
              alt="image"
            />
          </div>
          <div>
            <p>Autosave</p>
            <p>
              Never lose progress—your work is automatically saved as you build.
            </p>
            <Image
              width={900}
              height={400}
              src={
                "https://droip.com/wp-content/uploads/2025/03/design7-300x191.webp"
              }
              alt="image"
            />
          </div>
          <div>
            <p>Global style manager</p>
            <p>Maintain consistent branding with centralized style controls.</p>
            <Image
              width={900}
              height={400}
              src={"https://droip.com/wp-content/uploads/2025/03/design6.webp"}
              alt="image"
            />
          </div>
          <div>
            <p>Droip AI</p>
            <p>Harness AI to accelerate your workflow and creative process.</p>
            <Image
              width={900}
              height={400}
              src={
                "https://droip.com/wp-content/uploads/2025/03/create-with-ai.webp"
              }
              alt="image"
            />
          </div>
        </div>
      </div>
      <div>
        <p>Get Started for Free</p>
        <div>
          <p>
            Experience the power of Droip no-code website builder, risk free.
            Create stunning, responsive sites with pure creative freedom.
          </p>
          <button>Try for Free</button>
        </div>
      </div>
    </div>
  );
}
