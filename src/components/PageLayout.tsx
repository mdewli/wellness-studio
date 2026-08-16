"use client";

import Image from "next/image";
import { useState } from "react";

interface PageLayoutProps {
  title?: string;
  images?: any[];
  heroImage?: any;
  content?: any;
  paragraphs?: string[];
}

function getSanityUrl(image: any): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (image.asset?.url) return image.asset.url;
  if (image.url) return image.url;

  const ref = image.asset?._ref || image._ref || image.asset?._id;
  if (ref && typeof ref === "string") {
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v7569mrm";
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
    }
  }
  return null;
}

export default function PageLayout({ title, images, heroImage, content, paragraphs }: PageLayoutProps) {
  // Collect all images into array
  const rawImages = images && images.length > 0 ? images : heroImage ? [heroImage] : [];
  const imageUrls = rawImages.map(getSanityUrl).filter(Boolean) as string[];

  const renderContent = () => {
    if (paragraphs && paragraphs.length > 0) {
      return paragraphs.map((p, i) => <p key={i}>{p}</p>);
    }
    if (typeof content === "string") {
      return <p>{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((item: any, idx: number) => {
        if (typeof item === "string") return <p key={idx}>{item}</p>;
        if (item?._type === "block" && item?.children) {
          return <p key={idx}>{item.children.map((c: any) => c.text).join("")}</p>;
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Images stacked vertically */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 flex-shrink-0">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-lg overflow-hidden shadow-sm bg-stone-200/40">
                <img
                  src={url}
                  alt={title || "Studio Image"}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback to local image if Sanity URL fails
                    (e.target as HTMLImageElement).src = "/hero.jpg";
                  }}
                />
              </div>
            ))
          ) : (
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-lg overflow-hidden shadow-sm bg-stone-200/40">
              <img
                src="/hero.jpg"
                alt="Laura de la Riva"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Right Column: Italic Heading + Serif Body Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          {title && (
            <h1 className="font-script italic text-3xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
              {title}
            </h1>
          )}
          <div className="font-serif not-italic text-base sm:text-lg leading-relaxed text-charcoal/90 space-y-4">
            {renderContent() || (
              <>
                <p>
                  My work moves between various disciplines: music, yoga, sound healing, esoteric studies, and the craft of mala making. It is my strong belief that these practices share a single goal: continuously gaining deeper insight into how sound, breath, symbol, and stillness shape the human experience.
                </p>
                <p>
                  My background as a musician and researcher of ethnomusicology centers on the musical traditions of Eastern Europe, Turkey, and India. I am also a certified music therapist with additional training in phonophoresis.
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
