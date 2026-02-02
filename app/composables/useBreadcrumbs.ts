import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

export const useBreadcrumbs = () => {
  const route = useRoute();
  const { t } = useI18n();

  const breadcrumbs = computed(() => {
    let paths: string[] = (route.meta as any).pathVia || [];
    let breadcrumb = (route.meta as any).breadcrumb || "";
    let path = "";

    if (paths.length > 0) {
      const temp = [];

      paths.forEach((segment) => {
        path += "/" + segment;
        temp.push({
          label: t(`breadcrumbs.${segment}`),
          to: path,
        });
      });

      temp.push({
        label: t(`breadcrumbs.${breadcrumb}`),
        to: path + "/" + breadcrumb,
      });

      if (route.meta.slug) {
        temp.push({
          label: route.params.slug,
          to: "/" + breadcrumb + "/" + route.params.slug,
        });
      }

      return temp;
    } else {
      const temp: any = [];

      temp.push({
        label: t(`breadcrumbs.${breadcrumb}`),
        to: "/" + breadcrumb,
      });

      if (route.meta.slug) {
        temp.push({
          label: route.params.slug,
          to: "/" + breadcrumb + "/" + route.params.slug,
        });
      }

      return temp;
    }
  });

  return { breadcrumbs };
};
