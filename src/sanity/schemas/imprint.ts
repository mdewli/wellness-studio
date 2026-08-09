import { defineArrayMember, defineField, defineType } from "sanity";

export const imprint = defineType({
  name: "imprint",
  title: "Imprint",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "vatId",
      title: "VAT ID",
      type: "string",
    }),
    defineField({
      name: "legalText",
      title: "Legal Text",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "email" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Imprint",
        subtitle: subtitle || "Legal details",
      };
    },
  },
});
