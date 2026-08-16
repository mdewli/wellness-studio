import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { contactInfoQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  let email = "hello@laura-delariva.com";
  let phone = "+49 151 / 19 655 651";
  let locationNote = "Sessions available in person and online.";

  if (assertSanityConfigured()) {
    try {
      const info = await client.fetch(contactInfoQuery);
      if (info) {
        email = info.email || email;
        phone = info.phone || phone;
        locationNote = info.locationNote || locationNote;
      }
    } catch {
      // Fall through to default contact info.
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 md:grid-cols-2 md:px-14">
      <div>
        <div className="mb-6">
          <Image
            src="/logo_image.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="h-20 w-20 object-contain rounded-md"
          />
        </div>
        <p className="mb-3 font-serif not-italic text-sm tracking-[0.2em] uppercase opacity-70">
          Get in touch
        </p>
        <h1 className="font-script italic text-4xl md:text-5xl tracking-wide mb-6">Contact</h1>
        <div className="mt-8 space-y-4 font-serif not-italic text-lg">
          <p>
            <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">
              {email}
            </a>
          </p>
          <p>
            <a href={`tel:${phone.replace(/\s|\//g, "")}`} className="underline-offset-4 hover:underline">
              {phone}
            </a>
          </p>
          <p className="max-w-sm opacity-80">{locationNote}</p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
