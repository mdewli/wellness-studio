import type { ComponentProps } from "react";
import { PortableText } from "@portabletext/react";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { imprintQuery } from "@/sanity/lib/queries";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-3 mt-5 first:mt-0">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-medium mb-2 mt-4 first:mt-0">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#2A2A2A]/20 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-1.5">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-1.5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          target={rel ? "_blank" : undefined}
          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      );
    },
  },
};

export const metadata = {
  title: "Imprint",
};

export default async function ImprintPage() {
  let imprintData: {
    companyName?: string;
    address?: string;
    email?: string;
    phone?: string;
    vatId?: string;
    legalText?: ComponentProps<typeof PortableText>["value"];
  } | null = null;

  if (assertSanityConfigured()) {
    try {
      imprintData = await client.fetch(imprintQuery);
    } catch {
      // Fall through to fallback content.
    }
  }

  const companyName = imprintData?.companyName || "Laura de la Riva";
  const address = imprintData?.address;
  const email = imprintData?.email;
  const phone = imprintData?.phone || "+49 151 / 19 655 651";
  const vatId = imprintData?.vatId;
  const legalText = imprintData?.legalText;

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-14">
      <h1 className="font-script text-5xl">Imprint</h1>
      <div className="mt-8 space-y-4 font-serif text-base leading-relaxed md:text-lg">
        <p className="font-semibold text-xl">{companyName}</p>
        <p>Music · Yoga · Therapy</p>
        {address ? <p className="whitespace-pre-line">{address}</p> : null}
        {email ? (
          <p>
            Email:{" "}
            <a
              href={`mailto:${email}`}
              className="underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </p>
        ) : (
          <p>
            Website:{" "}
            <a
              href="https://laura-delariva.com"
              className="underline-offset-4 hover:underline"
            >
              laura-delariva.com
            </a>
          </p>
        )}
        <p>Phone: {phone}</p>
        {vatId ? <p>VAT ID: {vatId}</p> : null}
        {legalText ? (
          <div className="mt-6 border-t border-[#2A2A2A]/10 pt-6 space-y-4">
            <PortableText value={legalText} />
          </div>
        ) : (
          <p className="opacity-70">
            Legal details and responsible party information can be updated here
            once provided.
          </p>
        )}
      </div>
    </div>
  );
}
