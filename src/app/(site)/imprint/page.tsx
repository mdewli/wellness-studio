import { client } from '@/sanity/lib/client';
import CustomPortableText from '@/components/CustomPortableText';

export const revalidate = 0;

async function getImprint() {
  const query = `*[_type == "imprint"][0]{
    companyName,
    address,
    email,
    phone,
    vatId,
    legalText
  }`;
  return await client.fetch(query);
}

export default async function ImprintPage() {
  const imprint = await getImprint();

  if (!imprint) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose max-w-none text-justify">
        <h1 className="font-script text-4xl md:text-5xl text-left text-[#2A2A2A] mb-8">
          Imprint
        </h1>
        
        {imprint.companyName && (
          <p className="mb-2"><strong>Company Name:</strong> {imprint.companyName}</p>
        )}
        {imprint.address && (
          <p className="whitespace-pre-line mb-2"><strong>Address:</strong><br />{imprint.address}</p>
        )}
        {imprint.email && (
          <p className="mb-2"><strong>Email:</strong> {imprint.email}</p>
        )}
        {imprint.phone && (
          <p className="mb-2"><strong>Phone:</strong> {imprint.phone}</p>
        )}
        {imprint.vatId && (
          <p className="mb-6"><strong>VAT ID:</strong> {imprint.vatId}</p>
        )}

        {imprint.legalText && (
          <div className="mt-6">
            <CustomPortableText value={imprint.legalText} />
          </div>
        )}
      </div>
    </main>
  );
}
