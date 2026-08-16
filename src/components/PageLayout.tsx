"use client";

import React from "react";

interface PageLayoutProps {
  title?: string;
  images?: any[];
  heroImage?: any;
  content?: any;
  paragraphs?: string[];
  bioText?: any;
  bio?: any;
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

export default function PageLayout(props: PageLayoutProps) {
  const { title, images, heroImage, content, paragraphs, bioText, bio } = props;

  // Process images
  const rawImages = images && images.length > 0 ? images : heroImage ? [heroImage] : [];
  const imageUrls = rawImages.map(getSanityUrl).filter(Boolean) as string[];

  // Normalize text content across all possible prop names
  const bodyData = paragraphs || content || bioText || bio;

  const renderContent = () => {
    if (Array.isArray(bodyData) && bodyData.length > 0) {
      return bodyData.map((item: any, idx: number) => {
        if (typeof item === "string") return <p key={idx}>{item}</p>;
        if (item?._type === "block" && item?.children) {
          return <p key={idx}>{item.children.map((c: any) => c.text).join("")}</p>;
        }
        return null;
      });
    }
    if (typeof bodyData === "string" && bodyData.trim() !== "") {
      return <p>{bodyData}</p>;
    }

    // Default Bio Content Fallback
    return (
      <>
        <p>
          My work moves between various disciplines: music, yoga, sound healing, esoteric studies, and the craft of mala making. It is my strong belief that these practices share a single goal: continuously gaining deeper insight into how sound, breath, symbol, and stillness shape the human experience.
        </p>
        <p>
          My background as a musician and researcher of ethnomusicology centers on the musical traditions of Eastern Europe, Turkey, and India. I am also a certified music therapist with additional training in phonophoresis.
        </p>
      </>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 flex-shrink-0">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-full rounded-lg overflow-hidden shadow-sm">
                <img
                  src={url}
                  alt={title || "Laura de la Riva"}
                  className="w-full h-auto object-cover object-center block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hero.jpg";
                  }}
                />
              </div>
            ))
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden shadow-sm">
              <img
                src="/hero.jpg"
                alt="Laura de la Riva"
                className="w-full h-auto object-cover object-center block"
              />
            </div>
          )}
        </div>

        {/* Right: Italic Heading + Serif Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-start pt-2 md:pt-0">
          <h1 className="font-script italic text-3xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
            {title || "Tuning the instrument of the self..."}
          </h1>
          <div className="font-serif not-italic text-base sm:text-lg leading-relaxed text-charcoal/90 space-y-4">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
}
