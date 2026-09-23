import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://xyz-treks-and-tours.vercel.app";
  const staticPaths = ["", "/trekking", "/tours", "/destinations", "/about", "/blog", "/contact"];
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.8 }));

  const { data } = await supabase.from("xyz_packages").select("slug,updated_at").eq("is_active", true);
  for (const item of data || []) {
    entries.push({ url: `${base}/packages/${item.slug}`, lastModified: item.updated_at || undefined, changeFrequency: "weekly", priority: 0.9 });
  }
  return entries;
}
