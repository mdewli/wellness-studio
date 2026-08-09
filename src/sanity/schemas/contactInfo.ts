import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationNote",
      title: "Location Note",
      type: "text",
      rows: 3,
      description: "Short note about location, travel, or online sessions",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "phone" },
  },
});
