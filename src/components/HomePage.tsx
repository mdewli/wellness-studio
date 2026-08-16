"use client";
import PageLayout from "./PageLayout";

export function HomePage({ data }: { data?: any }) {
  return (
    <PageLayout
      title={data?.title || "Tuning the instrument of the self..."}
      heroImage={data?.heroImage}
      images={data?.images}
      paragraphs={data?.bioParagraphs}
      content={data?.content}
    />
  );
}

export default HomePage;
