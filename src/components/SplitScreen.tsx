import Image from "next/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

interface SplitScreenProps {
  title: string;
  image?: any;
  content?: any;
}

export default function SplitScreen({ title, image, content }: SplitScreenProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="w-full">
          {image?.asset?.url && (
            <div className="relative w-full aspect-[3/4] max-h-[350px] md:max-h-[600px] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={image.asset.url}
                alt={title || "Page Image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Right Column: Heading & Body */}
        <div className="w-full flex flex-col justify-start">
          <h1 className="font-script italic text-4xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
            {title}
          </h1>
          <div className="font-serif not-italic text-base sm:text-lg leading-relaxed text-charcoal/90 space-y-4">
            {content && <PortableTextRenderer value={content} />}
          </div>
        </div>
      </div>
    </div>
  );
}
