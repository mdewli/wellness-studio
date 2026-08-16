import type { ComponentProps } from "react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { SafeImage } from "@/components/SafeImage";
import { SITE_LOGO } from "@/lib/site";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { safeImageUrl } from "@/sanity/lib/image";
import { onlineCoursesQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Online Courses",
};

const fallbackCourses = [
  {
    title: "Introduction to Nada Yoga",
    slug: "nada-yoga-intro",
    udemyUrl: "https://www.udemy.com",
    imageSrc: SITE_LOGO,
    description: [
      "A gentle online introduction to sound as a yogic path — listening, breath, and resonance.",
    ],
  },
];

export default async function OnlineCoursesPage() {
  let courses = fallbackCourses as Array<{
    title: string;
    slug: string;
    udemyUrl: string;
    imageSrc: string;
    description: string[];
    portable?: ComponentProps<typeof PortableText>["value"];
  }>;

  if (assertSanityConfigured()) {
    try {
      const data = await client.fetch(onlineCoursesQuery);
      if (data?.length) {
        courses = data.map(
          (course: {
            title: string;
            slug: string;
            udemyUrl: string;
            thumbnail?: unknown;
            description?: { _type?: string; children?: { text?: string }[] }[];
          }) => ({
            title: course.title,
            slug: course.slug,
            udemyUrl: course.udemyUrl,
            imageSrc: safeImageUrl(course.thumbnail, {
              width: 800,
              height: 1000,
            }),
            description:
              course.description
                ?.map((block) => {
                  if (block._type !== "block" || !block.children) return null;
                  return block.children
                    .map((child) => child.text || "")
                    .join("");
                })
                .filter(Boolean) ?? [],
            portable: course.description,
          }),
        );
      }
    } catch {
      // Keep fallback courses.
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-16 md:px-14">
      <p className="mb-3 font-script italic text-sm tracking-[0.2em] uppercase opacity-70">
        Shop
      </p>
      <h1 className="font-script italic text-4xl md:text-5xl tracking-wide">Online Courses</h1>
      <p className="mt-4 max-w-xl font-script italic text-lg opacity-80">
        Self-paced courses hosted on Udemy — learn at your own rhythm.
      </p>

      <ul className="mt-12 space-y-12">
        {courses.map((course) => (
          <li
            key={course.slug}
            className="grid gap-8 border-t border-[#2A2A2A]/10 pt-10 md:grid-cols-2"
          >
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden">
              <SafeImage
                src={course.imageSrc}
                alt={course.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <h2 className="font-script italic text-2xl md:text-3xl tracking-wide">{course.title}</h2>
              <div className="space-y-3 font-script italic text-base leading-relaxed md:text-lg">
                {course.portable ? (
                  <PortableText value={course.portable} />
                ) : (
                  course.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                )}
              </div>
              <Link
                href={course.udemyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit border border-[#2A2A2A] px-5 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors hover:bg-[#2A2A2A] hover:text-[#FDFBF7]"
              >
                View on Udemy
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
