import { SplitScreen } from "@/components/SplitScreen";
import { SITE_LOGO } from "@/lib/site";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { safeImageAlt, safeImageUrl } from "@/sanity/lib/image";
import { bioQuery } from "@/sanity/lib/queries";

export async function HomePage() {
  let title = "Laura de la Riva";
  let imageSrc = SITE_LOGO;
  let imageAlt = "Laura de la Riva — music, yoga, and therapy";
  let paragraphs = [
    "A practice woven from sound, movement, and healing. Live concerts and sound baths, workshops and coaching, sound healing and nada yoga — offered with presence and care.",
    "Each session invites stillness, resonance, and a return to the body's own quiet intelligence.",
  ];

  if (assertSanityConfigured()) {
    try {
      const bio = await client.fetch(bioQuery);
      if (bio) {
        title = bio.title || title;
        imageSrc = safeImageUrl(bio.portrait, { width: 1200, height: 1600 });
        imageAlt = safeImageAlt(bio.portrait, imageAlt);
        const textBlocks =
          bio.body
            ?.map(
              (block: { _type?: string; children?: { text?: string }[] }) => {
                if (block._type !== "block" || !block.children) return null;
                return block.children.map((child) => child.text || "").join("");
              },
            )
            .filter(Boolean) ?? [];
        if (textBlocks.length) paragraphs = textBlocks;
      }
    } catch {
      // Keep fallbacks when Sanity is unreachable.
    }
  }

  return (
    <SplitScreen
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      eyebrow="Music · Yoga · Therapy"
      title={title}
      priority
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </SplitScreen>
  );
}
