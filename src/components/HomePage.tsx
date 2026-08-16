"use client";

import Image from "next/image";
import { useState } from "react";

interface HomePageProps {
  data?: {
    heroImage?: any;
    bioParagraphs?: string[];
  };
}

function resolveSanityUrl(image: any): string {
  if (!image) return "/hero.jpg";
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
  return "/hero.jpg";
}

export function HomePage({ data }: HomePageProps) {
  const imageUrl = resolveSanityUrl(data?.heroImage);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[550px] rounded-lg overflow-hidden shadow-sm bg-stone-200/50">
            {!imgError ? (
              <Image
                src={imageUrl}
                alt="Laura de la Riva"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                onError={() => setImgError(true)}
              />
            ) : (
              <img
                src="/hero.jpg"
                alt="Laura de la Riva"
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
        </div>

        {/* Right Column: Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h1 className="font-script italic text-3xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
            Tuning the instrument of the self...
          </h1>
          <div className="space-y-4 font-serif not-italic text-base sm:text-lg leading-relaxed text-charcoal/90">
            {data?.bioParagraphs && data.bioParagraphs.length > 0 ? (
              data.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
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

export default HomePage;
