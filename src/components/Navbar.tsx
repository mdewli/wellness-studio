"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SafeImage } from "@/components/SafeImage";
import { mainNav as defaultNav, type NavItem } from "@/lib/navigation";
import { SITE_LOGO } from "@/lib/site";

type NavbarProps = {
  items?: NavItem[];
};

function Dropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const containerRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    item.children?.some(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`),
    );

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!item.children?.length) {
    return (
      <li className="relative isolate">
        <Link
          href={item.href}
          className={`inline-flex px-3 py-2 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-70 ${
            isActive ? "opacity-100" : "opacity-80"
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={containerRef}
      className={`relative isolate ${isOpen ? "z-50" : "z-10"}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-70 ${
          isActive ? "opacity-100" : "opacity-80"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onFocus={onOpen}
      >
        {item.label}
        <span aria-hidden className="text-[0.65rem]">
          ▾
        </span>
      </button>
      <ul
        id={menuId}
        role="menu"
        className={`absolute left-0 top-full z-50 mt-0 min-w-[13rem] border border-[#2A2A2A]/15 py-2 shadow-md transition ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {item.children.map((child) => (
          <li key={child.href} role="none">
            <Link
              role="menuitem"
              href={child.href}
              className="block whitespace-nowrap px-4 py-2 font-serif text-base tracking-wide transition-colors hover:bg-[#2A2A2A]/[0.04]"
              onClick={onClose}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Navbar({ items = defaultNav }: NavbarProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenKey(null);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#2A2A2A]/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <SafeImage
            src={SITE_LOGO}
            alt="Laura de la Riva logo"
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
            priority
          />
          <span className="min-w-0">
            <span className="font-script block text-2xl leading-none text-[#2A2A2A] md:text-[1.75rem] whitespace-nowrap">
              Laura de la Riva
            </span>
            <span className="mt-1 block font-serif text-[0.65rem] tracking-[0.22em] uppercase opacity-60">
              Music · Yoga · Therapy
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden lg:block ml-auto"
          onMouseLeave={() => setOpenKey(null)}
        >
          <ul className="relative flex items-center gap-0 -mr-3">
            {items.map((item) => (
              <Dropdown
                key={item.href}
                item={item}
                isOpen={openKey === item.href}
                onOpen={() => setOpenKey(item.href)}
                onClose={() =>
                  setOpenKey((current) =>
                    current === item.href ? null : current,
                  )
                }
              />
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-[#2A2A2A]/20 px-3 py-2 text-xs tracking-[0.16em] uppercase lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[#2A2A2A]/10 px-6 py-4 lg:hidden"
        >
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.href}>
                {item.children?.length ? (
                  <div>
                    <p className="mb-2 text-xs tracking-[0.18em] uppercase opacity-60">
                      {item.label}
                    </p>
                    <ul className="space-y-2 border-l border-[#2A2A2A]/15 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="font-serif text-lg"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={item.href} className="font-serif text-lg">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
