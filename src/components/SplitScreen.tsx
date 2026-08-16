"use client";
import PageLayout from "./PageLayout";

export function SplitScreen({ title, image, images, content }: any) {
  return (
    <PageLayout
      title={title}
      heroImage={image}
      images={images}
      content={content}
    />
  );
}

export default SplitScreen;
