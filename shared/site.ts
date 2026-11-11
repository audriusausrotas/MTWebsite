export const SITE_URL = "https://modernitvora.lt";
export const SITE_NAME = "Moderni Tvora";
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

// MTSoft tvoros kategorija -> svetainės puslapis (lietuviškas kelias, localePath jį išverčia)
export const FENCE_CATEGORY_PAGES: Record<string, string> = {
  Tvora: "/tvoros/skardines-tvoros",
  Metalinė: "/tvoros/metalines-tvoros",
  Tvoralentė: "/tvoros/tvoralentes",
  Segmentas: "/tvoros/segmentines-tvoros",
};

// Lauko žaliuzių skaičiuoklė – MTSoft programoje (skaičiuoklės režimas „Lauko žaliuzės"), atidaroma naujame lange.
// MTSoft'e šis puslapis pasiekiamas tik prisijungus.
export const BLINDS_CALCULATOR_URL = "https://mtsoft.lt/skaiciuokle";

export const absoluteUrl =(path: string) => (/^https?:\/\//.test(path) ? path : SITE_URL + path);

