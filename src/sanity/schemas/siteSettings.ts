import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "paypalClientId",
      title: "PayPal Client ID",
      type: "string",
      description: "PayPal Client ID used for processing online payments via the PayPal integration.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "paypalClientId" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Site Settings",
        subtitle: subtitle ? `PayPal ID: ${subtitle}` : "No PayPal Client ID set",
      };
    },
  },
});
