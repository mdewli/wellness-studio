export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const useCdn = true;

export function assertSanityConfigured() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id && id !== "placeholder");
}
