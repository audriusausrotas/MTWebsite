<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const { t } = useI18n();
const localePath = useLocalePath();

const notFound = computed(() => props.error.statusCode === 404);
const title = computed(() => (notFound.value ? t("error.notFoundTitle") : t("error.title")));

useSeoMeta({ title, robots: "noindex, follow" });

const goHome = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <NuxtLayout>
    <BaseHeroImage :name="title" :heading="false" :breadcrumbs="false" />
    <div class="flex flex-col items-center gap-8 max-w-default w-full m-auto px-4 pt-8 pb-28 text-center">
      <p class="text-8xl font-bold text-red-main">{{ error.statusCode }}</p>
      <h1 class="text-3xl font-medium">{{ title }}</h1>
      <p class="max-w-120">{{ notFound ? $t("error.notFoundText") : $t("error.text") }}</p>
      <BaseButton width="w-60" @click="goHome">{{ $t("error.back") }}</BaseButton>
    </div>
  </NuxtLayout>
</template>
