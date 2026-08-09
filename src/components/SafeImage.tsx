"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { SITE_LOGO } from "@/lib/site";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

/**
 * next/image wrapper that gracefully falls back to /logo_image.jpg if any image asset is missing or fails to load.
 */
export function SafeImage({
  src,
  fallbackSrc = SITE_LOGO,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const validSrc = src && src.trim().length > 0 ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(validSrc);
  const [prevSrc, setPrevSrc] = useState<string>(validSrc);

  if (prevSrc !== validSrc) {
    setPrevSrc(validSrc);
    setImgSrc(validSrc);
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Laura de la Riva"}
      onError={(e) => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
        if (onError) {
          onError(e);
        }
      }}
    />
  );
}
