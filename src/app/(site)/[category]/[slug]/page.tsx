import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import { SplitScreen } from "@/components/SplitScreen";
import {
  getServiceFallback,
  serviceCategories,
  serviceFallbacks,
  type ServiceCategory,
} from "@/lib/navigation";
import { SITE_LOGO } from "@/lib/site";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { safeImageAlt, safeImageUrl } from "@/sanity/lib/image";
import {
  allServiceParamsQuery,
  serviceByCategoryAndSlugQuery,
} from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const fallbackParams = serviceFallbacks.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));

  if (!assertSanityConfigured()) return fallbackParams;

  try {
    const services = await client.fetch(allServiceParamsQuery);
    const cmsParams =
      services
        ?.filter(
          (service: { category?: string; slug?: string }) =>
            service.category &&
            service.slug &&
            serviceCategories.includes(service.category as ServiceCategory),
        )
        .map((service: { category: string; slug: string }) => ({
          category: service.category,
          slug: service.slug,
        })) ?? [];

    const seen = new Set(
      fallbackParams.map((param) => `${param.category}/${param.slug}`),
    );
    for (const param of cmsParams) {
      const key = `${param.category}/${param.slug}`;
      if (!seen.has(key)) {
        fallbackParams.push(param);
        seen.add(key);
      }
    }
  } catch {
    // Keep fallback params only.
  }

  return fallbackParams;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const fallback = getServiceFallback(category, slug);

  if (assertSanityConfigured()) {
    try {
      const service = await client.fetch(serviceByCategoryAndSlugQuery, {
        category,
        slug,
      });
      if (service?.title) return { title: service.title };
    } catch {
      // Fall through.
    }
  }

  return { title: fallback?.title ?? "Service" };
}

export default async function ServicePage({ params }: PageProps) {
  const { category, slug } = await params;

  if (!serviceCategories.includes(category as ServiceCategory)) {
    notFound();
  }

  let title: string | undefined;
  let eyebrow: string | undefined;
  let imageSrc = SITE_LOGO;
  let imageAlt = "Laura de la Riva";
  let secondaryImages: { src: string; alt: string }[] = [];
  let paragraphs: string[] = [];
  let portableDescription: ComponentProps<typeof PortableText>["value"] = null;
  let foundInCms = false;

  if (assertSanityConfigured()) {
    try {
      const service = await client.fetch(serviceByCategoryAndSlugQuery, {
        category,
        slug,
      });

      if (service) {
        foundInCms = true;
        title = service.title;
        eyebrow = `${service.category} · ${service.subcategory}`;
        portableDescription = service.description ?? null;
        const image = service.images?.[0];
        imageSrc = safeImageUrl(image, { width: 1200, height: 1600 });
        imageAlt = safeImageAlt(image, service.title);
        if (Array.isArray(service.images) && service.images.length > 1) {
          secondaryImages = service.images.slice(1).map((img: unknown) => ({
            src: safeImageUrl(img, { width: 800, height: 800 }),
            alt: safeImageAlt(img, service.title),
          }));
        }
      }
    } catch {
      // Use fallbacks below.
    }
  }

  const fallback = getServiceFallback(category, slug);
  if (!foundInCms && !fallback) {
    notFound();
  }

  title ??= fallback?.title ?? "Service";
  eyebrow ??= fallback
    ? `${fallback.category} · ${fallback.subcategory}`
    : category;
  if (!foundInCms && fallback) {
    imageSrc = fallback.imageSrc;
    imageAlt = fallback.imageAlt;
  }
  paragraphs = fallback?.body ?? [];

  return (
    <SplitScreen
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      secondaryImages={secondaryImages}
      eyebrow={eyebrow}
      title={title}
    >
      {portableDescription ? (
        <div className="space-y-4 [&_a]:underline [&_strong]:font-semibold">
          <PortableText value={portableDescription} />
        </div>
      ) : (
        paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
      )}
      {fallback?.summary && !portableDescription ? (
        <p className="opacity-80">{fallback.summary}</p>
      ) : null}
    </SplitScreen>
  );
}
