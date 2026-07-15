import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/api/",
        "/_next/",
        "/_static/",
        "/_static/",
        "/organization",
        "/sign-in",
        "/sign-up",
      ],
    },
    sitemap: "https://www.kyronmedical.com/sitemap.xml",
  };
}
