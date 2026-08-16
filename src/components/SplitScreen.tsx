"use client";
import PageLayout from "./PageLayout";

export function SplitScreen({ title, image, images, content, ...rest }: any) {
  return (
    <PageLayout
      title={title}
      heroImage={image}
      images={images}
      content={content}
      {...rest}
    />
  );
}

export default SplitScreen;
