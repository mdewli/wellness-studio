import { InstagramGallery, type GalleryImage } from "@/components/InstagramGallery";
import type { ReactNode } from "react";

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
  secondaryImages,
  eyebrow,
  title,
  children,
}: SplitScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col md:min-h-[calc(100dvh-8.5rem)] md:flex-row">
      <section
        aria-label="Visual"
        className="relative flex min-h-[42dvh] flex-1 items-center justify-center p-6 md:min-h-0 md:p-10"
      >
        <InstagramGallery
          primaryImage={{ src: imageSrc, alt: imageAlt }}
          secondaryImages={secondaryImages}
        />
      </section>

      <section
        aria-label="Content"
        className="flex flex-1 flex-col justify-center gap-6 px-8 py-12 md:px-14 md:py-16"
      >
        {eyebrow ? (
          <p className="font-serif text-sm tracking-[0.2em] uppercase opacity-70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-script text-4xl leading-tight text-[#2A2A2A] md:text-5xl">
          {title}
        </h1>
        <div className="max-w-md space-y-4 font-serif text-base leading-relaxed md:text-lg">
          {children}
        </div>
      </section>
    </div>
  );
}
