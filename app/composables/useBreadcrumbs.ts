import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

export const useBreadcrumbs = () => {
  const route = useRoute();
  const { t } = useI18n();

  const breadcrumbs = computed(() =>
    route.matched
      .filter((r) => r.meta?.breadcrumb)
      .map((r) => ({
        label: t(`breadcrumbs.${r.meta.breadcrumb}`),
        to: r.path,
      }))
  );

  return { breadcrumbs };
};
