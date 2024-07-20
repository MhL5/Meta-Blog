"use client";

import { CldImage, CldImageProps } from "next-cloudinary";

/**
 * a wrapper around CldImage
 * in the App Router in Next.js 13+
 * for cloudinary image component to work
 * we need to add "use client" directive at the top of your file.
 */
export default function CloudinaryImage({ ...props }: CldImageProps) {
  return (
    <CldImage
      placeholder="blur"
      blurDataURL="blurDataUrlImage.png"
      {...props}
    />
  );
}
