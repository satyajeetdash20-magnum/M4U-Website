import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { getCategoryLabel, type ShopCategory } from "@/lib/shop";

const defaultTitle = "MentorSubhiMath | SAT & IGCSE Math Tutoring | 750+ Score Guarantee";
const defaultDescription =
  "Join 150+ students who achieved 750+ SAT Math & A/A* IGCSE scores. Small batch coaching, topic-wise videos, mock exams. Book free consultation.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://mentorsubhimath.com";

export function getSiteUrl() {
  return siteUrl;
}

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  keywords,
  path,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
}): Metadata {
  const finalTitle = title ?? defaultTitle;
  const finalDescription = description ?? defaultDescription;
  const canonical = path ? toAbsoluteUrl(path) : siteUrl;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: "website",
      locale: "en_GB",
      siteName: "MentorSubhiMath",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
    },
  };
}

export function getCategoryMetadata(category: ShopCategory): Metadata {
  const label = getCategoryLabel(category);
  return buildMetadata({
    title: `${label} Math Resources | Workbooks & Past Papers | MentorSubhiMath`,
    description: `Browse ${label} math resources including workbooks, predicted papers, and exam-focused revision packs to improve confidence and grades.`,
    keywords: [
      `${label} math resources`,
      `${label} workbooks`,
      `${label} past papers`,
      `${label} revision resources`,
    ],
    path: `/shop/${category}`,
  });
}

export function getProductMetadata(product: Product): Metadata {
  const shortDescription = product.long_description.slice(0, 160);
  return buildMetadata({
    title: `${product.title} | MentorSubhiMath`,
    description: shortDescription,
    keywords: [
      product.title,
      `${getCategoryLabel(product.category)} math resources`,
      "math workbook",
      "predicted papers",
    ],
    path: `/shop/${product.category}/${product.slug}`,
  });
}
