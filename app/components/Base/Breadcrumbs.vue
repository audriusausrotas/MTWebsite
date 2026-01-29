<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div class="max-w-default m-auto h-20 flex gap-2 items-center capitalize px-4 text-sm">
    <NuxtLinkLocale to="/">{{ $t("breadcrumbs.pagrindinis") }}</NuxtLinkLocale>
    <p
      v-for="crumb in breadcrumbs"
      :key="crumb.to"
      :class="crumb.slug ? '' : 'last:text-red-main last:font-semibold'"
    >
      <span class="text-red-main">> </span>
      <NuxtLinkLocale :to="crumb.to.replace('/:slug()', '')">{{ crumb.label }}</NuxtLinkLocale>
      <NuxtLinkLocale
        v-if="crumb.slug"
        :to="crumb.to.replace('/:slug()', '/') + crumb.slug"
        class="text-red-main font-semibold"
      >
        > {{ crumb.slug.replaceAll("-", "  ") }}
      </NuxtLinkLocale>
    </p>
  </div>
</template>

<style scoped></style>
