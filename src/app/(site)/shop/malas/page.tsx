import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { SITE_LOGO } from "@/lib/site";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { safeImageUrl } from "@/sanity/lib/image";
import { malasQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Malas",
};

const fallbackMalas = [
  {
    title: "Rudraksha Mala",
    slug: "rudraksha-mala",
    price: 88,
    imageSrc: SITE_LOGO,
    inventoryStatus: "in_stock",
  },
  {
    title: "Lotus Mala",
    slug: "lotus-mala",
    price: 96,
    imageSrc: SITE_LOGO,
    inventoryStatus: "made_to_order",
  },
];

export default async function MalasPage() {
  let products = fallbackMalas;

  if (assertSanityConfigured()) {
    try {
      const malas = await client.fetch(malasQuery);
      if (malas?.length) {
        products = malas.map(
          (mala: {
            title: string;
            slug: string;
            price: number;
            mainImage?: unknown;
            inventoryStatus: string;
          }) => ({
            title: mala.title,
            slug: mala.slug,
            price: mala.price,
            imageSrc: safeImageUrl(mala.mainImage, {
              width: 800,
              height: 1000,
            }),
            inventoryStatus: mala.inventoryStatus,
          }),
        );
      }
    } catch {
      // Keep fallback products.
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-16 md:px-14">
      <p className="mb-3 font-serif not-italic text-sm tracking-[0.2em] uppercase opacity-70">
        Shop
      </p>
      <h1 className="font-script italic text-4xl md:text-5xl tracking-wide">Malas</h1>
      <p className="mt-4 max-w-xl font-serif not-italic text-lg opacity-80">
        Hand-finished malas for practice, meditation, and everyday presence.
      </p>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/shop/malas/${product.slug}`} className="group block">
              <div className="relative mb-4 aspect-[3/4] w-full max-w-sm overflow-hidden">
                <SafeImage
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="object-contain transition-opacity group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <h2 className="font-script italic text-2xl">{product.title}</h2>
              <p className="mt-1 text-sm tracking-[0.12em] uppercase opacity-70">
                €{product.price.toFixed(2)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
