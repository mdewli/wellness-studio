import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import { InstagramGallery } from "@/components/InstagramGallery";
import { PayPalMalaButton } from "@/components/PayPalMalaButton";
import { SITE_LOGO } from "@/lib/site";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { safeImageAlt, safeImageUrl } from "@/sanity/lib/image";
import { malaBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const fallbackMalas: Record<
  string,
  {
    title: string;
    price: number;
    imageSrc: string;
    inventoryStatus: string;
    description: string[];
  }
> = {
  "rudraksha-mala": {
    title: "Rudraksha Mala",
    price: 88,
    imageSrc: SITE_LOGO,
    inventoryStatus: "in_stock",
    description: [
      "A classic rudraksha mala finished for daily meditation and mantra practice.",
      "Each piece is selected for balance, texture, and quiet presence.",
    ],
  },
  "lotus-mala": {
    title: "Lotus Mala",
    price: 96,
    imageSrc: SITE_LOGO,
    inventoryStatus: "made_to_order",
    description: [
      "A lotus-inspired mala for soft focus and heart-centered practice.",
      "Made to order with care; allow a short crafting window before shipping.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(fallbackMalas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fallback = fallbackMalas[slug];

  if (assertSanityConfigured()) {
    try {
      const mala = await client.fetch(malaBySlugQuery, { slug });
      if (mala?.title) return { title: mala.title };
    } catch {
      // Fall through.
    }
  }

  return { title: fallback?.title ?? "Mala" };
}

export default async function MalaProductPage({ params }: PageProps) {
  const { slug } = await params;

  let title: string | undefined;
  let price: number | undefined;
  let imageSrc = SITE_LOGO;
  let imageAlt = "Mala";
  let secondaryImages: { src: string; alt: string }[] = [];
  let inventoryStatus: string | undefined;
  let paypalClientId: string | undefined;
  let portableDescription: ComponentProps<typeof PortableText>["value"] = null;
  let paragraphs: string[] = [];
  let foundInCms = false;

  if (assertSanityConfigured()) {
    try {
      const [mala, siteSettings] = await Promise.all([
        client.fetch(malaBySlugQuery, { slug }),
        client.fetch(siteSettingsQuery),
      ]);
      if (siteSettings?.paypalClientId) {
        paypalClientId = siteSettings.paypalClientId;
      }
      if (mala) {
        foundInCms = true;
        title = mala.title;
        price = mala.price;
        inventoryStatus = mala.inventoryStatus;
        portableDescription = mala.description ?? null;
        imageSrc = safeImageUrl(mala.mainImage, { width: 1200, height: 1600 });
        imageAlt = safeImageAlt(mala.mainImage, mala.title);
        if (Array.isArray(mala.gallery) && mala.gallery.length > 0) {
          secondaryImages = mala.gallery.map((img: unknown) => ({
            src: safeImageUrl(img, { width: 800, height: 800 }),
            alt: safeImageAlt(img, mala.title),
          }));
        }
      }
    } catch {
      // Use fallbacks below.
    }
  }

  const fallback = fallbackMalas[slug];
  if (!foundInCms && !fallback) {
    notFound();
  }

  title ??= fallback!.title;
  price ??= fallback!.price;
  if (!foundInCms) {
    imageSrc = fallback!.imageSrc;
    imageAlt = fallback!.title;
  }
  inventoryStatus ??= fallback!.inventoryStatus;
  paragraphs = fallback?.description ?? [];

  const soldOut = inventoryStatus === "sold_out";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col md:min-h-[calc(100dvh-8.5rem)] md:flex-row">
      <section className="relative flex min-h-[42dvh] flex-1 items-center justify-center p-6 md:p-10">
        <InstagramGallery
          primaryImage={{ src: imageSrc, alt: imageAlt }}
          secondaryImages={secondaryImages}
        />
      </section>

      <section className="flex flex-1 flex-col justify-center gap-6 px-8 py-12 md:px-14 md:py-16">
        <p className="font-serif text-sm tracking-[0.2em] uppercase opacity-70">
          Shop · Malas
        </p>
        <h1 className="font-script text-4xl md:text-5xl">{title}</h1>
        <p className="font-serif text-xl">€{price.toFixed(2)}</p>
        <p className="text-xs tracking-[0.16em] uppercase opacity-70">
          {inventoryStatus.replaceAll("_", " ")}
        </p>

        <div className="max-w-md space-y-4 font-serif text-base leading-relaxed md:text-lg">
          {portableDescription ? (
            <PortableText value={portableDescription} />
          ) : (
            paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          )}
        </div>

        {!soldOut ? (
          <div className="max-w-sm pt-2">
            <PayPalMalaButton
              productTitle={title}
              price={price}
              paypalClientId={paypalClientId}
            />
          </div>
        ) : (
          <p className="font-serif text-sm opacity-70">Currently sold out.</p>
        )}
      </section>
    </div>
  );
}
