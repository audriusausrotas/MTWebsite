<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const localePath = useLocalePath();
const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => {
  return route.path.replace(/^\/[a-z]{2}(?=\/)/, "");
});

const { data: page } = await useAsyncData(
  "page-" + slug.value,
  async () => {
    const collection = ("content_" + locale.value) as keyof Collections;
    const content = await queryCollection(collection).path(slug.value).first();

    return content as any;
  },
  {
    watch: [locale],
  },
);

const canonical = computed(() => `https://modernitvora.lt${route.path}`);

useSeoMeta({
  title: () => (page.value as any)?.seoTitle || page.value?.title,
  description: () => (page.value as any)?.seoDescription || page.value?.description,
});

useHead(() => ({
  meta: [
    { property: "og:title", content: (page.value as any)?.seoTitle || page.value?.title },
    {
      property: "og:description",
      content: (page.value as any)?.seoDescription || page.value?.description,
    },
    { property: "og:image", content: (page.value as any)?.image },

    { name: "twitter:title", content: (page.value as any)?.seoTitle || page.value?.title },
    {
      name: "twitter:description",
      content: (page.value as any)?.seoDescription || page.value?.description,
    },
    { name: "twitter:image", content: (page.value as any)?.image },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    {
      rel: "canonical",
      href: canonical.value,
    },
  ],
}));
</script>

<template>
  <div class="bg-stone-100 w-full h-full py-40">
    <div class="flex flex-col max-w-default w-full p-24 m-auto bg-white rounded-lg shadow-2xl">
      <NuxtImg :src="page?.meta?.image as string" class="rounded-md" />
      <article class="prose prose-lg px-4 max-w-default w-full m-auto mt-14">
        <ContentRenderer v-if="page" :value="page" />
      </article>
      <div class="flex gap-8">
        <div class="flex flex-col gap-4 justify-between flex-1 px-4">
          <h4 class="font-semibold text-xl">Planuojate tvoros statybą?</h4>
          <p class="text-justify leading-8">
            Nežinote, kokią tvorą pasirinkti? Turite kitų klausimų? Susisiekite su Moderni Tvora
            tvorų specialistais, kurie išklausę jūsų poreikius pasiūlys individualizuotą sprendimą
            bei atliks visus darbus. Viskas vienoje vietoje nuo A iki Z.
          </p>
          <BaseButton @click="navigateTo(localePath('/kontaktai'))">Susisiekti</BaseButton>
        </div>
        <NuxtImg
          src="/images/modernitvora_4909-2.jpeg"
          class="rounded- max-h-80 h-full flex-1 object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style>
.prose :where(h1, h2, h3, h4, h5, h6)[id] a {
  pointer-events: none;
  text-decoration: none;
  font-weight: 700;
}

.prose :where(h1, h2, h3, h4, h5, h6)[id]::before {
  content: none;
}

.prose h1 {
  font-size: 2.5rem;
}
.prose h2 {
  font-size: 2.2rem;
}
</style>
