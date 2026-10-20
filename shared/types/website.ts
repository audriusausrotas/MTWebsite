// Duomenys, kuriuos svetainė gauna iš MTSoft (per /api/site-data)

export interface SiteImage {
  name: string;
  url: string;
  alt: string;
  altEN?: string;
}

// Tik vieši tvoros laukai – kainos, savikaina ir gamybos duomenys į svetainę nepatenka
export interface WebsiteFence {
  _id: string;
  name: string;
  category: string;
  description: string;
  descriptionEn: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDescription: string;
  seoDescriptionEn: string;
  images: SiteImage[];
}

export interface SiteData {
  fences: WebsiteFence[];
  gallery: SiteImage[];
  funded: SiteImage[];
}

export interface SearchResult {
  type: "fence" | "article";
  title: string;
  // tvorai – kategorija, straipsniui – content kelias (/straipsniai/... arba /articles/...)
  category?: string;
  path?: string;
}

// Straipsnis sąraše (content kelias: /straipsniai/... arba /articles/...; excerpt – tekstas iki <!--more-->)
export interface ArticleListItem {
  title: string;
  path: string;
  image?: string;
  excerpt?: unknown;
}
