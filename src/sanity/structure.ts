import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Music")
        .id("music-services")
        .child(
          S.documentList()
            .title("Music")
            .schemaType("service")
            .filter('_type == "service" && category == "music"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Yoga")
        .id("yoga-services")
        .child(
          S.documentList()
            .title("Yoga")
            .schemaType("service")
            .filter('_type == "service" && category == "yoga"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Therapy")
        .id("therapy-services")
        .child(
          S.documentList()
            .title("Therapy")
            .schemaType("service")
            .filter('_type == "service" && category == "therapy"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Shop")
        .id("shop")
        .child(
          S.list()
            .title("Shop")
            .items([
              S.listItem()
                .title("Mala Products")
                .schemaType("malaProduct")
                .child(
                  S.documentTypeList("malaProduct").title("Mala Products"),
                ),
              S.listItem()
                .title("Online Courses")
                .schemaType("onlineCourse")
                .child(
                  S.documentTypeList("onlineCourse").title("Online Courses"),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings & Contact Info")
        .id("site-settings")
        .child(
          S.list()
            .title("Site Settings & Contact Info")
            .items([
              S.listItem()
                .title("Site Settings")
                .schemaType("siteSettings")
                .child(
                  S.documentTypeList("siteSettings").title("Site Settings"),
                ),
              S.listItem()
                .title("Biography")
                .schemaType("bio")
                .child(S.documentTypeList("bio").title("Biography")),
              S.listItem()
                .title("Contact Information")
                .schemaType("contactInfo")
                .child(
                  S.documentTypeList("contactInfo").title(
                    "Contact Information",
                  ),
                ),
              S.listItem()
                .title("Imprint")
                .schemaType("imprint")
                .child(
                  S.documentTypeList("imprint").title("Imprint"),
                ),
            ]),
        ),
    ]);
