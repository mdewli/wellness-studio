import { defineArrayMember, defineField, defineType } from "sanity";

export const malaProduct = defineType({
  name: "malaProduct",
  title: "Mala Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (EUR)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "inventoryStatus",
      title: "Inventory Status",
      type: "string",
      options: {
        list: [
          { title: "In Stock", value: "in_stock" },
          { title: "Low Stock", value: "low_stock" },
          { title: "Sold Out", value: "sold_out" },
          { title: "Made to Order", value: "made_to_order" },
        ],
        layout: "radio",
      },
      initialValue: "in_stock",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", price: "price" },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: typeof price === "number" ? `€${price.toFixed(2)}` : undefined,
        media,
      };
    },
  },
});
