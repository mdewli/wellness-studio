import Image from "next/image";
import Link from "next/link";

interface HomePageProps {
  data: {
    heroImage?: any;
    bioParagraphs?: string[];
  };
}

export default function HomePage({ data }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="w-full">
          {data?.heroImage?.asset?.url && (
            <div className="relative w-full aspect-[3/4] max-h-[350px] md:max-h-[600px] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={data.heroImage.asset.url}
                alt="Laura de la Riva"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
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
