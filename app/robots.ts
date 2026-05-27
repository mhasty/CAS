import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/orders", "/accounting", "/vendors", "/lenders", "/review", "/xml"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
