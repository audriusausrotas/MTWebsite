import { c as useI18n, j as useSeoMeta } from './server.mjs';

function useSeo(key, imagePath) {
  const { t } = useI18n();
  useSeoMeta({
    title: () => t(`seo.${key}.title`),
    description: () => t(`seo.${key}.description`),
    ogTitle: () => t(`seo.${key}.title`),
    ogDescription: () => t(`seo.${key}.description`),
    ...{}
  });
}

export { useSeo as u };
//# sourceMappingURL=useSeo-DMuJFlsz.mjs.map
