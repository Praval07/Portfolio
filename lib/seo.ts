import type { Metadata } from "next";

const SITE_NAME = "Praval Saxena";
const SITE_URL = "https://your-domain.example"; // replace before launch
const DEFAULT_DESCRIPTION =
  "Praval Saxena builds intelligent, well-engineered software — AI systems, full-stack products, and thoughtful system design.";

interface PageMetaInput {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Central place for building per-page metadata so every route gets
 * consistent title formatting, Open Graph, and Twitter Card data
 * without repeating boilerplate.
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/assets/portrait-1200.jpg",
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** JSON-LD structured data for the homepage — helps AI/search engines
 *  understand this is a Person's professional site (per SEO/AI-search
 *  readiness requirements in the design bible). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Praval Saxena",
    jobTitle: ["AI Engineer", "Full-Stack Developer", "System Designer"],
    url: SITE_URL,
    sameAs: [
      // add real profile URLs
    ],
  };
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };
