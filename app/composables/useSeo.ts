import { absoluteUrl } from "#shared/site";

// Puslapio pavadinimas ir aprašymas iš i18n `seo.<key>.title` / `seo.<key>.description`
export function useSeo(key: string, imagePath?: string) {
  const { t } = useI18n();

  useSeoMeta({
    title: () => t(`seo.${key}.title`),
    description: () => t(`seo.${key}.description`),
    ogTitle: () => t(`seo.${key}.title`),
    ogDescription: () => t(`seo.${key}.description`),
    ...(imagePath ? { ogImage: absoluteUrl(imagePath) } : {}),
  });
}
