import Image from "next/image";
import CustomPortableText from "@/components/CustomPortableText";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { imprintQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Imprint",
};

export default async function ImprintPage() {
  let imprintData: any = null;

  if (assertSanityConfigured()) {
    try {
      imprintData = await client.fetch(imprintQuery);
    } catch {
      // Fall through
    }
  }

  const { companyName, address, email, phone, vatId, legalText } = imprintData || {};

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-14">
      <div className="mb-6">
        <Image
          src="/logo_image.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="h-20 w-20 object-contain rounded-md"
        />
      </div>

      <h1 className="font-script text-5xl mb-8">Imprint</h1>

      <div className="space-y-6 font-serif text-base leading-relaxed text-justify">
        {companyName && (
          <p>
            <strong>Company Name:</strong> {companyName}
          </p>
        )}

        {address && (
          <div>
            <strong>Address:</strong>
            <p className="whitespace-pre-line">{address}</p>
          </div>
        )}

        {email && (
          <p>
            <strong>Email:</strong> {email}
          </p>
        )}

        {phone && (
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        )}

        {vatId && (
          <p>
            <strong>VAT ID:</strong> {vatId}
          </p>
        )}

        {legalText && (
          <div className="pt-6 border-t border-black/10 text-justify">
            <CustomPortableText value={legalText} />
          </div>
        )}
      </div>
    </div>
  );
}
