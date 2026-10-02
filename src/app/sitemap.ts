import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sahilsiddiqui.me",
      lastModified: new Date(),
    },
  ];
}
