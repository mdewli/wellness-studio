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
    <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-start w-full min-h-0 py-6">
      {/* Left Column: Stacked Images (Original Aspect Ratio, Uncropped) */}
      {allImages.length > 0 && (
        <section
          aria-label="Visual"
          className="flex flex-col md:grid md:grid-cols-2 gap-8 items-start w-full min-h-0 py-6"
        >
          {allImages.map((img, idx) => (
            <div key={idx} className="w-full overflow-hidden rounded-lg">
              <img
                src={img.src}
                alt={img.alt || `Image ${idx + 1}`}
                className="w-full h-auto object-contain rounded-lg max-h-[350px] md:max-h-none w-full object-cover"
              />
            </div>
          ))}
        </section>
      )}

      {/* Right Column: Content with Justified Text */}
      <section
        aria-label="Content"
        className="flex flex-col md:grid md:grid-cols-2 gap-8 items-start w-full min-h-0 py-6"
      >
        {eyebrow ? (
          <p className="font-script italic text-sm tracking-[0.2em] uppercase opacity-70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-script italic text-4xl leading-tight text-[#2A2A2A] md:text-5xl text-left">
          {title}
        </h1>
        <div className="space-y-4 font-script italic text-base leading-relaxed md:text-lg text-justify">
          {children}
        </div>
      </section>
    </div>
  );
}
