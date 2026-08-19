import HomePage from "@/components/HomePage";
import { client } from "@/sanity/lib/client";
import { bioQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Page() {
  const bioData = await client.fetch(bioQuery);
  return <HomePage data={bioData} />;
}
