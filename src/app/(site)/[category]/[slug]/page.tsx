import { client } from '@/sanity/lib/client';
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

  const userImages = service.images?.filter((img: any) => img?.asset?._ref) || [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Stacked Images */}
        {userImages.length > 0 && (
          <div className="md:col-span-5 flex flex-col gap-6 sticky top-8">
            {userImages.map((img: any, idx: number) => (
              <div key={idx} className="w-full overflow-hidden rounded-lg">
                <img
                  src={urlFor(img).url()}
                  alt={img.alt || `${service.title} image ${idx + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Right Column: Title & Justified Content */}
        <div className={`prose max-w-none text-justify ${userImages.length > 0 ? 'md:col-span-7' : 'md:col-span-12'}`}>
          <h1 className="font-script text-4xl md:text-5xl text-left text-[#2A2A2A] mb-6">{service.title}</h1>
          <CustomPortableText value={service.description} />
        </div>
      </div>
    </main>
  );
}
