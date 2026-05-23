export const SITE_URL = "https://www.surgerycarefoundation.com";

export const SITE_NAME = "Surgery Care Foundation";

export const SITE_TAGLINE = "India's Most Trusted Platform for Medical Surgery Funding";

export const SITE_DESCRIPTION =
  "Surgery Care Foundation is an India-based medical crowdfunding platform that helps patients raise funds for life-saving surgeries. Donate to verified medical campaigns and support patients in need.";

export const SITE_LOCALE = "en_IN";

export const DEFAULT_OG_IMAGE = "/opengraph-image";

export const TWITTER_HANDLE = "@surgerycarefdn";

export const ORG_LEGAL_NAME = "Surgery Care Foundation";

export const ORG_LOGO_URL = `${SITE_URL}/images/new_logo.png`;

export const ORG_CONTACT_PHONE = "+91 8815935091";

export const ORG_CONTACT_EMAIL = "contact@surgerycarefoundation.com";

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildPageTitle(pageTitle?: string | null): string {
  if (!pageTitle) return SITE_NAME;
  if (pageTitle === SITE_NAME) return SITE_NAME;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + "…";
}
