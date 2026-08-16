import { client } from '@/sanity/lib/client';
import CustomPortableText from '@/components/CustomPortableText';

export const revalidate = 0;

async function getImprint() {
  const query = `*[_type == "imprint"][0]{
    title,
    companyName,
    address,
    email,
    content,
    body
  }`;
  return await client.fetch(query);
}

export default async function ImprintPage() {
  const imprint = await getImprint();

  if (!imprint) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose max-w-none text-justify">
        <h1 className="text-3xl font-light mb-6 text-left">{imprint.title || 'Imprint'}</h1>
        
        {imprint.companyName && (
          <p className="mb-2"><strong>Company Name:</strong> {imprint.companyName}</p>
        )}
        {imprint.address && (
          <p className="whitespace-pre-line mb-2"><strong>Address:</strong><br />{imprint.address}</p>
        )}
        {imprint.email && (
          <p className="mb-6"><strong>Email:</strong> {imprint.email}</p>
        )}

        {imprint.body && <CustomPortableText value={imprint.body} />}
        {imprint.content && <CustomPortableText value={imprint.content} />}
      </div>
    </main>
  );
}
