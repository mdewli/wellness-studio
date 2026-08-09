import { defineQuery } from "next-sanity";

export const bioQuery = defineQuery(`
  *[_type == "bio"][0]{
    title,
    portrait,
    body
  }
`);

export const navServicesQuery = defineQuery(`
  *[_type == "service" && defined(slug.current) && defined(category)]|order(title asc){
    title,
    "slug": slug.current,
    category,
    subcategory
  }
`);

export const serviceByCategoryAndSlugQuery = defineQuery(`
  *[_type == "service" && category == $category && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    category,
    subcategory,
    images,
    description
  }
`);

export const servicesByCategoryQuery = defineQuery(`
  *[_type == "service" && category == $category]|order(title asc){
    title,
    "slug": slug.current,
    category,
    subcategory,
    images
  }
`);

export const allServiceParamsQuery = defineQuery(`
  *[_type == "service" && defined(slug.current) && defined(category)]{
    "slug": slug.current,
    category
  }
`);

export const malaBySlugQuery = defineQuery(`
  *[_type == "malaProduct" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    price,
    mainImage,
    gallery,
    description,
    inventoryStatus
  }
`);

export const malasQuery = defineQuery(`
  *[_type == "malaProduct"]|order(title asc){
    title,
    "slug": slug.current,
    price,
    mainImage,
    inventoryStatus
  }
`);

export const onlineCoursesQuery = defineQuery(`
  *[_type == "onlineCourse"]|order(title asc){
    title,
    "slug": slug.current,
    thumbnail,
    description,
    udemyUrl
  }
`);

export const contactInfoQuery = defineQuery(`
  *[_type == "contactInfo"][0]{
    email,
    phone,
    locationNote
  }
`);

export const imprintQuery = defineQuery(`
  *[_type == "imprint"][0]{
    companyName,
    address,
    email,
    phone,
    vatId,
    legalText
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    paypalClientId
  }
`);
