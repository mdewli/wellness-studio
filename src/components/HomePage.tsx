"use client";

import React from "react";

interface HomePageProps {
  data?: any;
}

function urlForSanity(source: any): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;

  const ref = source.asset?._ref || source._ref || source.asset?._id;
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

export function HomePage({ data }: HomePageProps) {
  // Direct Sanity Image mapping
  const imageRef = data?.portrait || data?.heroImage || (data?.images && data.images[0]);
  const imageUrl = urlForSanity(imageRef);

  // Direct Sanity Text mapping
  const titleText = data?.title;
  const content = data?.body || data?.bioText || data?.bio || data?.bioParagraphs || data?.content;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left: Studio Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          {imageUrl ? (
            <div className="relative w-full rounded-lg overflow-hidden shadow-sm">
              <img
                src={imageUrl}
                alt={titleText || "Studio Image"}
                className="w-full h-auto object-cover object-center block"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-stone-200/30 rounded-lg flex items-center justify-center text-stone-400">
              No image uploaded in Studio
            </div>
          )}
        </div>

        {/* Right: Studio Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          {titleText && (
            <h1 className="font-script italic text-3xl sm:text-5xl lg:text-6xl mb-6 text-[#000000] leading-tight">
              {titleText}
            </h1>
          )}
          <div className="font-serif not-italic text-base sm:text-lg leading-relaxed text-[#000000]/90 space-y-4 text-justify">
            {Array.isArray(content) ? (
              content.map((item: any, idx: number) => {
                if (typeof item === "string") return <p key={idx}>{item}</p>;
                if (item?._type === "block" && item?.children) {
                  return <p key={idx}>{item.children.map((c: any) => c.text).join("")}</p>;
                }
                return null;
              })
            ) : typeof content === "string" ? (
              <p>{content}</p>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
