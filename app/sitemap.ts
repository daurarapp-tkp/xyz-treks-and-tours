import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://xyz-treks-and-tours.vercel.app";
  const staticPaths = ["", "/trekking", "/tours", "/destinations", "/about", "/blog", "/contact", "/booking"];
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  // Keep the production build independent of Supabase environment variables.
  // When configured on Vercel, include active package pages dynamically.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/xyz_packages?select=slug,updated_at&is_active=eq.true`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, next: { revalidate: 3600 } }
      );
      if (response.ok) {
        const items = (await response.json()) as { slug: string; updated_at?: string }[];
        for (const item of items) {
          entries.push({
            url: `${base}/packages/${item.slug}`,
            lastModified: item.updated_at || undefined,
            changeFrequency: "weekly",
            priority: 0.9,
          });
        }
      }
    } catch {
      // Static sitemap entries remain available if the database is temporarily unavailable.
    }
  }

  return entries;
}