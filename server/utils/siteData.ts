import type { SiteData, SiteImage, WebsiteFence } from "#shared/types/website";
import { FENCE_CATEGORY_PAGES } from "#shared/site";

interface MTSoftResponse {
  success: boolean;
  data: unknown;
  message?: string;
}

const text = (value: unknown) => (typeof value === "string" ? value : "");

const toImages = (value: unknown): SiteImage[] =>
  (Array.isArray(value) ? value : [])
    .filter((item) => item && typeof item.url === "string" && item.url.trim())
    .map((item) => ({
      name: text(item.name),
      url: item.url.trim(),
      alt: text(item.alt),
      altEN: text(item.altEN),
    }));

// MTSoft grąžina visą tvoros įrašą su kainomis – svetainei paliekami tik vieši laukai
const toWebsiteFence = (fence: any): WebsiteFence => {
  const aditional = fence.aditional ?? {};
  return {
    _id: String(fence._id),
    name: text(fence.name),
    category: text(fence.category),
    description: text(aditional.description),
    descriptionEn: text(aditional.descriptionEn),
    seoTitle: text(aditional.seoTitle),
    seoTitleEn: text(aditional.seoTitleEn),
    seoDescription: text(aditional.seoDescription),
    seoDescriptionEn: text(aditional.seoDescriptionEn),
    images: toImages(aditional.images),
  };
};

const fetchList = async (path: string): Promise<any[]> => {
  const { apiBase } = useRuntimeConfig();
  const response = await $fetch<MTSoftResponse>(`${apiBase}/api/${path}`, { timeout: 5000 });
  if (!response?.success || !Array.isArray(response.data)) {
    throw new Error(`${path}: ${response?.message || "neteisingas atsakymas"}`);
  }
  return response.data;
};

const valueOf = <T>(result: PromiseSettledResult<T>, path: string): T | null => {
  if (result.status === "fulfilled") return result.value;
  console.error(`Nepavyko gauti ${path} iš MTSoft:`, result.reason);
  return null;
};

// Kešuojama 10 min. (pasibaigus atiduodama sena reikšmė ir atnaujinama fone), kad kiekvienas
// lankytojas nekviestų mtsoft.lt. Nepilnas atsakymas nekešuojamas – kitas kreipimasis bandys vėl.
// Jei MTSoft nepasiekiamas, svetainė veikia toliau, tik be tvorų / galerijos duomenų.
export const getSiteData = defineCachedFunction(
  async (): Promise<SiteData & { complete: boolean }> => {
    const [fencesResult, galleryResult, fundedResult] = await Promise.allSettled([
      fetchList("getFences"),
      fetchList("getGallery"),
      fetchList("getFunded"),
    ]);

    const fences = valueOf(fencesResult, "getFences");
    const gallery = valueOf(galleryResult, "getGallery");
    const funded = valueOf(fundedResult, "getFunded");

    return {
      complete: Boolean(fences && gallery && funded),
      fences: (fences ?? [])
        .filter((fence) => fence?.aditional?.show === true && fence.category in FENCE_CATEGORY_PAGES)
        .map(toWebsiteFence),
      gallery: toImages(gallery),
      funded: toImages(funded),
    };
  },
  {
    name: "site-data",
    maxAge: 60 * 10,
    swr: true,
    validate: (entry) => entry.value?.complete === true,
  },
);
