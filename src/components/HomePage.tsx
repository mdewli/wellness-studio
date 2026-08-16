"use client";
import PageLayout from "./PageLayout";

export function HomePage({ data }: { data?: any }) {
  return (
    <PageLayout
      title={data?.title}
      heroImage={data?.heroImage}
      images={data?.images}
      paragraphs={data?.bioParagraphs}
      content={data?.content}
      bioText={data?.bioText}
      bio={data?.bio}
    />
  );
}

export default HomePage;
