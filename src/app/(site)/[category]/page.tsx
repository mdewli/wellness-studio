import Link from "next/link";
import { notFound } from "next/navigation";
import { getMainNav } from "@/lib/getMainNav";
import { serviceCategories, type ServiceCategory } from "@/lib/navigation";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const nav = await getMainNav();
  const item = nav.find((entry) => entry.href === `/${category}`);
  return { title: item?.label ?? "Services" };
}

export default async function CategoryIndexPage({ params }: PageProps) {
  const { category } = await params;
  const nav = await getMainNav();
  const item = nav.find((entry) => entry.href === `/${category}`);

  if (
    !item ||
    !serviceCategories.includes(category as ServiceCategory)
  ) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-14">
      <p className="mb-3 font-serif text-sm tracking-[0.2em] uppercase opacity-70">
        Offerings
      </p>
      <h1 className="font-serif text-4xl md:text-5xl tracking-wide text-[#2A2A2A]">{item.label}</h1>
      <ul className="mt-10 space-y-4 border-t border-[#2A2A2A]/10 pt-8">
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              className="font-serif text-2xl transition-opacity hover:opacity-70"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
