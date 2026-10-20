import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

interface Crumb {
  label: string;
  to: string;
}

// Straipsnio puslapis čia įrašo straipsnio pavadinimą (vietoj slug'o)
export const useBreadcrumbTitle = () => useState<string>("breadcrumbTitle", () => "");

export const useBreadcrumbs = () => {
  const route = useRoute();
  const { t } = useI18n();
  const title = useBreadcrumbTitle();

  const breadcrumbs = computed(() => {
    const paths: string[] = (route.meta.pathVia as string[]) || [];
    const breadcrumb = (route.meta.breadcrumb as string) || "";
    const crumbs: Crumb[] = [];
    let path = "";

    paths.forEach((segment) => {
      path += "/" + segment;
      crumbs.push({ label: t(`menu.${segment}`), to: path });
    });

    path += "/" + breadcrumb;
    crumbs.push({ label: t(`menu.${breadcrumb}`), to: path });

    if (route.meta.slug) {
      crumbs.push({
        label: title.value || String(route.params.slug).replaceAll("-", " "),
        to: path + "/" + route.params.slug,
      });
    }

    return crumbs;
  });

  return { breadcrumbs };
};
