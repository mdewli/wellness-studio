import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CustomPortableText from '@/components/CustomPortableText';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const query = `*[_type == "malaProduct" && slug.current == $slug][0]{
    title,
    price,
    description,
    mainImage,
    gallery,
    images
  }`;
  return await client.fetch(query, { slug });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const rawImages = [
    product.mainImage,
    ...(product.gallery || []),
    ...(product.images || [])
  ];

  const allImages = rawImages.filter((img: any) => img?.asset?._ref);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Stacked Images */}
        {allImages.length > 0 && (
          <div className="md:col-span-5 flex flex-col gap-6 sticky top-8">
            {allImages.map((img: any, idx: number) => (
              <div key={idx} className="w-full overflow-hidden rounded-lg">
                <img
                  src={urlFor(img).url()}
                  alt={img.alt || `${product.title} image ${idx + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Right Column: Title, Price & Justified Content */}
        <div className={`prose max-w-none text-justify ${allImages.length > 0 ? 'md:col-span-7' : 'md:col-span-12'}`}>
          <h1 className="font-script italic text-4xl md:text-5xl tracking-wide text-left text-[#2A2A2A] mb-2">{product.title}</h1>
          {product.price && (
            <p className="text-xl font-normal text-left mb-6">€{product.price}</p>
          )}
          {product.description && <CustomPortableText value={product.description} />}
        </div>
      </div>
    </main>
  );
}
