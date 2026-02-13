<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div class="max-w-default m-auto h-20 flex gap-2 items-center px-4 text-sm overflow-hidden">
    <NuxtLinkLocale to="/" class="">{{ $t("menu.pagrindinis") }}</NuxtLinkLocale>
    <p
      v-for="crumb in breadcrumbs"
      :key="crumb?.to"
      :class="crumb?.slug ? '' : 'last:text-red-main last:font-semibold'"
      class="whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2"
    >
      <span class="text-red-main shrink-0">> </span>
      <NuxtLinkLocale :to="crumb?.to" class="overflow-hidden text-ellipsis">{{
        crumb?.label.replaceAll("-", " ")
      }}</NuxtLinkLocale>
    </p>
  </div>
</template>

<style scoped></style>
