import type { Metadata } from "next";
import { Bodoni_Moda, Great_Vibes } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getMainNav } from "@/lib/getMainNav";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Laura de la Riva",
    template: "%s · Laura de la Riva",
  },
  description: "Music, yoga, and therapy with Laura de la Riva.",
};


export const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const navItems = await getMainNav();

  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FDFBF7] text-[#2A2A2A]">
        <Navbar items={navItems} />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
