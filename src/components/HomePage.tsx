import Image from "next/image";

interface HomePageProps {
  data?: {
    heroImage?: any;
    bioParagraphs?: string[];
  };
}

function getImageUrl(img: any): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (img.asset?.url) return img.asset.url;
  if (img.url) return img.url;
  return null;
}

export function HomePage({ data }: HomePageProps) {
  const imageUrl = getImageUrl(data?.heroImage) || "/hero.jpg";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="w-full">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
            <Image
              src={imageUrl}
              alt="Laura de la Riva"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column: Heading & Body Text */}
        <div className="w-full flex flex-col justify-start">
          <h1 className="font-script italic text-4xl sm:text-5xl lg:text-6xl mb-6 text-charcoal leading-tight">
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
