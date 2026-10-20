<script setup lang="ts">
import { absoluteUrl } from "#shared/site";

const { t } = useI18n();
const localePath = useLocalePath();
const { breadcrumbs } = useBreadcrumbs();

// Pradžia + puslapio kelias; adresai jau išversti į dabartinę kalbą
const items = computed(() => [
  { label: t("menu.pagrindinis"), to: localePath("/") },
  ...breadcrumbs.value.map((crumb) => ({ label: crumb.label, to: localePath(crumb.to) })),
]);

// Google rezultatuose rodomas kelias (BreadcrumbList)
useHead(() => ({
  script: [
    {
      key: "breadcrumbs-ld",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.value.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: absoluteUrl(item.to),
        })),
      }),
    },
  ],
}));
</script>

<template>
  <nav :aria-label="$t('nav.breadcrumbs')" class="max-w-default m-auto h-20 flex items-center px-4">
    <ol class="flex gap-2 items-center text-sm overflow-hidden">
      <li
        v-for="(item, index) in items"
        :key="item.to"
        class="flex items-center gap-2 whitespace-nowrap overflow-hidden"
        :class="index === 0 ? 'shrink-0' : ''"
      >
        <span v-if="index > 0" class="text-red-main shrink-0" aria-hidden="true">&gt;</span>
        <span
          v-if="index === items.length - 1"
          aria-current="page"
          class="overflow-hidden text-ellipsis text-red-main font-semibold"
        >
          {{ item.label }}
        </span>
        <NuxtLink v-else :to="item.to" class="overflow-hidden text-ellipsis hover:text-red-main">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>
