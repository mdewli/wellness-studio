import Image from "next/image";

interface SplitScreenProps {
  title: string;
  image?: any;
  content?: any;
}

function getImageUrl(img: any): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (img.asset?.url) return img.asset.url;
  if (img.url) return img.url;
  return null;
}

export function SplitScreen({ title, image, content }: SplitScreenProps) {
  const imageUrl = getImageUrl(image);

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="w-full">
          {imageUrl ? (
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={imageUrl}
                alt={title || "Page Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>

        {/* Right Column: Heading & Body */}
        <div className="w-full flex flex-col justify-start">
          <h1 className="font-script italic text-4xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
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
