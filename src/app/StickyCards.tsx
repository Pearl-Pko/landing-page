import Image from "next/image";
import React from "react";

export default function StickyCards() {
  return (
    <div>
      <div>
        <p>Content Manager</p>
        <div>
          <p>
            Handle dynamic data with the built-in content manager. Liink data
            dynamically to any part of your website
          </p>
          <button>View Details</button>
        </div>
        <Image
          width={900}
          height={400}
          alt="image"
          src={"https://droip.com/wp-content/uploads/2025/03/CMS1.webp"}
        />
      </div>
      <div>
        <p>Media Manager</p>
        <div>
          <p>
            Organize and edit all media assets, including SVGs, Lottie, and
            icons, with the built-in image and shape editor
          </p>
          <button>View Details</button>
        </div>
        <Image
          width={900}
          height={400}
          alt="image"
          src={
            "https://droip.com/wp-content/uploads/2025/03/Media-Manager.webp"
          }
        />
      </div>
      <div>
        <p>SEO</p>
        <div>
          <p>
            Dynamically update SEO content across pages to optimize your
            website's search performance
          </p>
          <button>View Details</button>
        </div>
        <Image
          width={900}
          height={400}
          alt="image"
          src={
            "https://droip.com/wp-content/uploads/2025/03/dymanic-seo2-1.webp"
          }
        />
      </div>
      
    </div>
  );
}
