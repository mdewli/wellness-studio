import { defineArrayMember, defineField } from "sanity";

export const PUBLISH_HINT =
  "After uploading, replacing, cropping, adjusting the hotspot, or removing an image, click the green Publish button (top right of the editor) for changes to appear on the live site.";

export function imageField(args: {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
}) {
  return defineField({
    name: args.name,
    title: args.title,
    type: "image",
    description: [args.description, PUBLISH_HINT].filter(Boolean).join(" "),
    options: {
      hotspot: true,
      collapsible: true,
      collapsed: false,
    },
    fields: [
      defineField({
        name: "alt",
        type: "string",
        title: "Alternative text",
        description: "Describe the image for accessibility and SEO.",
      }),
    ],
    validation: args.required ? (rule) => rule.required() : undefined,
  });
}

export function imageArrayField(args: {
  name: string;
  title: string;
  description?: string;
}) {
  return defineField({
    name: args.name,
    title: args.title,
    type: "array",
    description: [
      args.description ??
        "Add one or more images. The first image is shown as the primary photo; all images appear in the on-page gallery carousel.",
      "Use each image’s menu to replace, crop, set hotspot, or delete.",
      PUBLISH_HINT,
    ].join(" "),
    of: [
      defineArrayMember({
        type: "image",
        options: {
          hotspot: true,
        },
        fields: [
          defineField({
            name: "alt",
            type: "string",
            title: "Alternative text",
            description: "Describe the image for accessibility and SEO.",
          }),
        ],
      }),
    ],
    options: {
      layout: "grid",
    },
  });
}
