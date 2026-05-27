import type { MetadataRoute } from "next";

const BASE = "https://familyfables.org";

const bookSlugs = [
  "whats-your-poo-poo-face",
  "dream-ideas",
  "amber-the-dragon-keeper",
  "gilroys-gobble",
  "finding-hampton",
  "the-lumpiest-pumpkin",
  "one-tom-turkey",
  "ollie-come-home",
  "what-a-doodle-do",
  "the-shut-in-button",
  "frog-a-dog",
  "brian-the-ghost",
];

const blogSlugs = [
  "funny-kids-read-aloud-books",
  "best-childrens-books-for-bedtime",
  "interactive-kids-books-online",
  "picture-books-about-animals",
  "kids-books-about-imagination",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/activities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/coloring`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const bookPages: MetadataRoute.Sitemap = bookSlugs.map((slug) => ({
    url: `${BASE}/books/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...bookPages, ...blogPages];
}
