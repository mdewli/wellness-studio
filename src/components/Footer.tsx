import Link from "next/link";

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-20 mt-auto w-full border-t border-[#2A2A2A]/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-10">
        <p className="font-serif text-sm tracking-wide opacity-70">
          © {new Date().getFullYear()} Laura de la Riva
        </p>
        <Link
          href="/imprint"
          className="text-xs tracking-[0.18em] uppercase opacity-70 transition-opacity hover:opacity-100"
        >
          Imprint
        </Link>
      </div>
    </footer>
  );
}
