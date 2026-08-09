import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { SITE_LOGO } from "@/lib/site";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type ImageLike = {
  asset?: { _ref?: string; _id?: string; url?: string } | null;
  _ref?: string;
};

/** True when Sanity image has a resolvable asset reference. */
export function hasImageAsset(source: unknown): source is SanityImageSource {
  if (!source || typeof source !== "object") return false;
  const image = source as ImageLike;
  if (typeof image._ref === "string" && image._ref.length > 0) return true;
  const asset = image.asset;
  if (!asset || typeof asset !== "object") return false;
  return Boolean(asset._ref || asset._id || asset.url);
}

type SafeImageOptions = {
  width?: number;
  height?: number;
};

/**
 * Build a Sanity CDN URL, or return the site logo when the image is missing/invalid.
 */
export function safeImageUrl(
  source: unknown,
  options: SafeImageOptions = {},
): string {
  if (!hasImageAsset(source)) return SITE_LOGO;

  try {
    let imageBuilder = urlFor(source);
    if (options.width) imageBuilder = imageBuilder.width(options.width);
    if (options.height) imageBuilder = imageBuilder.height(options.height);
    const url = imageBuilder.url();
    return url || SITE_LOGO;
  } catch {
    return SITE_LOGO;
  }
}

export function safeImageAlt(
  source: unknown,
  fallback: string,
): string {
  if (!source || typeof source !== "object") return fallback;
  const alt = (source as { alt?: unknown }).alt;
  return typeof alt === "string" && alt.trim() ? alt.trim() : fallback;
}
