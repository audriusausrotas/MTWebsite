export function useSeo(titleKey: string, descriptionKey: string, imagePath?: string) {
  const { t } = useI18n();

  useSeoMeta({
    title: t(titleKey),
    description: t(descriptionKey),
    ogTitle: t(titleKey),
    ogDescription: t(descriptionKey),
    // ogImage: imagePath || "/og/default.jpg", <---- reikia paveiksliuko / paveiksliuku
    ogType: "website",
  });
}
