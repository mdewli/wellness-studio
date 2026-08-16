import Link from "next/link";

export const metadata = {
  title: "Shop",
};

export default function ShopIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-16 md:px-14">
      <p className="mb-3 font-script italic text-sm tracking-[0.2em] uppercase opacity-70">
        Offerings
      </p>
      <h1 className="font-script italic text-4xl md:text-5xl tracking-wide">Shop</h1>
      <ul className="mt-10 space-y-4 border-t border-[#2A2A2A]/10 pt-8">
        <li>
          <Link href="/shop/malas" className="font-script italic text-2xl hover:opacity-70">
            Malas
          </Link>
        </li>
        <li>
          <Link href="/shop/courses" className="font-script italic text-2xl hover:opacity-70">
            Online Courses
          </Link>
        </li>
      </ul>
    </div>
  );
}
