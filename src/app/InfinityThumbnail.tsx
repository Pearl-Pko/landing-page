import Image from "next/image";
import React from "react";

export default function InfinityThumbnail() {
  return (
    <div>
      <p>
        Launch with ease using stunning, ready-to-use themse & sections designed
        for every need
      </p>
      <Image
        width={900}
        height={400}
        alt="image"
        src={
          "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-3.webp"
        }
      />
      <Image
        width={900}
        height={400}
        alt="image"
        src={
          "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-3.webp"
        }
      />
      <Image
        width={900}
        height={400}
        alt="image"
        src={
          "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-3.webp"
        }
      />

      <Image
        width={900}
        height={400}
        alt="image"
        src={
          "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-10.webp"
        }
      />
      <Image
        width={900}
        height={400}
        alt="image"
        src={
          "https://droip.com/wp-content/uploads/2025/03/Template-Thumbnail-2.webp"
        }
      />
    </div>
  );
}
