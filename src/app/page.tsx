import React from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import StickyCards from "./StickyCards";
import VerticalSlide from "./VerticalSlide";
import InfinityThumbnail from "./InfinityThumbnail";

export default function page() {
  return (
    <div className="px-5 py-5">
            <NavBar />
      <p>No-Code WordPress Site Builder</p>
      <div>
        <div>
          <p>Break Limit</p>
          <p>Build Anything</p>
          <p>No Code Needed</p>
        </div>
        <div>
          <p>
            Droip is a no-code, drag-and-drop WordPress builder that simplifies
            website creation with powerful capabilities
          </p>
          <button>Watch Intro</button>
          <button>Get started with Droip</button>
        </div>
      </div>
      <Image
        width={900}
        height={400}
        src={"https://droip.com/wp-content/uploads/2025/04/hero-home1.webp"}
        alt="image"
      />
      <div>
        <p>Design pixel-perfect sites beyond ordinary</p>
        <div>
          <p>Advanced typography</p>
          <div>
            Take full control over your ext with precision typography toos.
            Adjust fonts, spacing, and styles to add more character to your
            design
            <button>View Details</button>
          </div>
        </div>
        <div>
          <p>CSS grids and layouts</p>
          <div>
            Build complex layouts with ease using CSS Grids. Create
            multi-directional structures, manage spacing, and achieve perfect
            alignment without limitations
            <button>View Details</button>
          </div>
        </div>
        <div>
          <p>Adaptive design</p>
          <div>
            Ensure flawless responsiveness across all devices. Design with
            adaptive elements that adjust seamlessly to different screen sizes
            and resolutions.
            <button>View Details</button>
          </div>
        </div>
        <div>
          <p>Designed for efficiency</p>
          <div>
            Streamline your workflow with intuitive tools that simplify layout
            structuring. Save time while maintaining complete design accuracy
            and flexibility.
            <button>View Details</button>
          </div>
        </div>
      </div>
      <div>
        <p>Craft engaging and immerive interactions</p>
        <div>
          <p>Advanced interaction timeline</p>
          <div>
            Design smooth, multi-step animations with a timeline-based editor
            for complete control.
          </div>
        </div>
        <div>
          <p>Custom timing editor</p>
          <div>
            Fine-tune every interaction to deliver flawless performance by
            adjusting delays, durations, easing functions, and more.
          </div>
        </div>
        <div>
          <p>Advanced triggers</p>
          <div>
            Trigger animations based on scrolling, hovering, page load, and more
            for a dynamic experience.
          </div>
        </div>
        <div>
          <p>Achieve limitless precision</p>
          <div>
            Create flawless, interactive designs visually with unmatched
            accuracy and finesse.
          </div>
        </div>
      </div>
      <StickyCards />
      <VerticalSlide />
      <InfinityThumbnail />
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
