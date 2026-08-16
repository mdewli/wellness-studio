import Image from "next/image";

interface SplitScreenProps {
  title: string;
  image?: any;
  content?: any;
}

function resolveSanityUrl(image: any): string | null {
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

export function SplitScreen({ title, image, content }: SplitScreenProps) {
  const imageUrl = resolveSanityUrl(image);

  const renderContent = () => {
    if (!content) return null;
    if (typeof content === "string") {
      return <p>{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((item: any, idx: number) => {
        if (typeof item === "string") return <p key={idx}>{item}</p>;
        if (item?._type === "block" && item?.children) {
          const text = item.children.map((c: any) => c.text).join("");
          return <p key={idx}>{text}</p>;
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
        {/* Left Column: Image */}
        {imageUrl && (
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[520px] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={imageUrl}
                alt={title || "Page Image"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Right Column: Title & Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h1 className="font-script italic text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 text-charcoal leading-tight">
            {title}
          </h1>
          <div className="font-serif not-italic text-base sm:text-lg leading-relaxed text-charcoal/90 space-y-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitScreen;
