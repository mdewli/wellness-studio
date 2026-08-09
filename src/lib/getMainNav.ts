import { buildMainNav, type NavItem, type ServiceNavItem } from "@/lib/navigation";
import { assertSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { navServicesQuery } from "@/sanity/lib/queries";

export async function getMainNav(): Promise<NavItem[]> {
  if (!assertSanityConfigured()) {
    return buildMainNav();
  }

  try {
    const services = (await client.fetch(navServicesQuery)) as ServiceNavItem[];
    return buildMainNav(Array.isArray(services) ? services : []);
  } catch {
    return buildMainNav();
  }
}
