import type { Metadata } from "next";
import type { Locale } from "./i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://casacusia.org";
const SITE_NAME = "CASACUSIA";
const DEFAULT_OG_IMAGE = "/og-default.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  image?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  locale = "es",
  image = DEFAULT_OG_IMAGE,
  noindex = false
}: BuildMetadataOptions): Metadata {
  const canonical = `${SITE_URL}${normalizePath(path)}`;
  const finalImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}${normalizePath(stripLocalePrefix(path))}`,
        en: `${SITE_URL}/en${normalizePath(stripLocalePrefix(path))}`,
        "x-default": `${SITE_URL}${normalizePath(stripLocalePrefix(path))}`
      }
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "es_AR",
      images: [{ url: finalImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [finalImage]
    }
  };
}

function normalizePath(path: string): string {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function stripLocalePrefix(path: string): string {
  return path.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
}
