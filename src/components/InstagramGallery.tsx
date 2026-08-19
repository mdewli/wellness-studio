"use client";

import { useState } from "react";
import { SafeImage } from "@/components/SafeImage";

export type GalleryImage = {
  src: string;
  alt: string;
};

type InstagramGalleryProps = {
  primaryImage: GalleryImage;
  secondaryImages?: GalleryImage[];
};

export function InstagramGallery({
  primaryImage,
  secondaryImages = [],
}: InstagramGalleryProps) {
  // Fallback secondary images to ensure an interactive carousel is always rendered even if CMS lacks extra images
  const fallbackSecondaries: GalleryImage[] = [
    { src: "/businesscardfront.png", alt: `${primaryImage.alt} - View 1` },
    { src: "/businesscardback.png", alt: `${primaryImage.alt} - View 2` },
    { src: "/logo_image.jpg", alt: `${primaryImage.alt} - Logo` },
  ];

  const galleryList =
    secondaryImages.length > 0 ? secondaryImages : fallbackSecondaries;

  const [activeImage, setActiveImage] = useState<GalleryImage>(primaryImage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + galleryList.length) % galleryList.length;
    setCurrentIndex(nextIdx);
    setActiveImage(galleryList[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % galleryList.length;
    setCurrentIndex(nextIdx);
    setActiveImage(galleryList[nextIdx]);
  };

  const handleSelect = (img: GalleryImage, idx: number) => {
    setActiveImage(img);
    setCurrentIndex(idx);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {/* Primary Image Display on Left */}
      <div className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-md border border-[#000000]/15 bg-[#FDFBF7] shadow-sm transition-all hover:shadow-md">
        <SafeImage
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Secondary Images Carousel with Previous/Next Buttons */}
      <div className="relative w-full max-w-md px-10">
        <div className="flex items-center justify-between gap-2 overflow-hidden py-1">
          <div
            className="flex transition-transform duration-300 ease-out gap-3"
            style={{
              transform: `translateX(-${currentIndex * 92}px)`,
            }}
          >
            {galleryList.map((img, idx) => {
              const isSelected = activeImage.src === img.src;
              return (
                <button
                  key={`${img.src}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(img, idx)}
                  className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#000000] ${
                    isSelected
                      ? "border-[#000000] ring-2 ring-[#000000]/40 scale-105 shadow-md"
                      : "border-[#000000]/20 opacity-70 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`Select gallery image ${idx + 1}`}
                >
                  <SafeImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[#000000]/20 bg-[#FDFBF7]/95 text-base text-[#000000] shadow-md transition-all hover:bg-[#000000] hover:text-[#FDFBF7] active:scale-95"
          aria-label="Previous image"
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[#000000]/20 bg-[#FDFBF7]/95 text-base text-[#000000] shadow-md transition-all hover:bg-[#000000] hover:text-[#FDFBF7] active:scale-95"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="mt-3 flex justify-center gap-1.5">
          {galleryList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(galleryList[idx], idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 bg-[#000000]"
                  : "w-1.5 bg-[#000000]/30 hover:bg-[#000000]/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
