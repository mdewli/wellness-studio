import type { ReactNode } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type SplitScreenProps = {
  imageSrc: string;
  imageAlt: string;
  secondaryImages?: GalleryImage[];
  eyebrow?: string;
  title: string;
  children: ReactNode;
  priority?: boolean;
};

export function SplitScreen({
  imageSrc,
  imageAlt,
  secondaryImages = [],
  eyebrow,
  title,
  children,
}: SplitScreenProps) {
  // Combine primary and secondary images (ignoring fallbacks)
  const allImages = [
    { src: imageSrc, alt: imageAlt },
    ...secondaryImages,
  ].filter((img) => img.src && img.src.trim() !== "");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col md:min-h-[calc(100dvh-8.5rem)] md:flex-row gap-10 py-12 px-6">
      {/* Left Column: Stacked Images (Original Aspect Ratio, Uncropped) */}
      {allImages.length > 0 && (
        <section
          aria-label="Visual"
          className="flex flex-1 flex-col gap-6 items-start justify-start sticky top-8"
        >
          {allImages.map((img, idx) => (
            <div key={idx} className="w-full overflow-hidden rounded-lg">
              <img
                src={img.src}
                alt={img.alt || `Image ${idx + 1}`}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </section>
      )}

      {/* Right Column: Content with Justified Text */}
      <section
        aria-label="Content"
        className="flex flex-1 flex-col justify-start gap-6"
      >
        {eyebrow ? (
          <p className="font-serif text-sm tracking-[0.2em] uppercase opacity-70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-serif text-4xl leading-tight text-[#2A2A2A] md:text-5xl text-left">
          {title}
        </h1>
        <div className="space-y-4 font-serif text-base leading-relaxed md:text-lg text-justify">
          {children}
        </div>
      </section>
    </div>
  );
}
