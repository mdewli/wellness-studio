import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import CustomPortableText from '@/components/CustomPortableText';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getService(category: string, slug: string) {
  const query = `*[_type == "service" && category == $category && slug.current == $slug][0]{
    title,
    description,
    images
  }`;
  return await client.fetch(query, { category, slug });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const service = await getService(category, slug);

  if (!service) {
    notFound();
  }

  // Filter out any invalid items to ensure ONLY uploaded Sanity images display
  const userImages = service.images?.filter((img: any) => img?.asset?._ref) || [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Text Content */}
        <div className="md:col-span-7 prose max-w-none">
          <h1 className="text-3xl font-light mb-6">{service.title}</h1>
          <CustomPortableText value={service.description} />
        </div>

        {/* Right Column: Stacked User Images (Aligned Top-to-Bottom) */}
        {userImages.length > 0 && (
          <div className="md:col-span-5 flex flex-col gap-6 sticky top-8">
            {userImages.map((img: any, idx: number) => (
              <div key={idx} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={urlFor(img).url()}
                  alt={img.alt || `${service.title} image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
