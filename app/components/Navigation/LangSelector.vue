<script setup lang="ts">
const { t, locale, locales } = useI18n();
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const isOpen = ref(false);

const flags: Record<string, string> = {
  lt: "/icons/lt.svg",
  en: "/icons/us.svg",
};

const articleAlternates = useArticleAlternates();

// Straipsnio vertimas turi kitą slug'ą – einama į jį, o jei vertimo nėra, į straipsnių sąrašą
const targetFor = (code: "lt" | "en") =>
  route.meta.article
    ? articleAlternates.value[code] || localePath("/straipsniai", code)
    : switchLocalePath(code) || localePath("/", code);

watch(
  () => route.fullPath,
  () => (isOpen.value = false),
);
</script>

<template>
  <div class="relative">
    <button
      type="button"
      :aria-label="t('nav.language')"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
      class="flex items-center rounded-md bg-white/10 hover:bg-white/20 transition hover:cursor-pointer"
    >
      <img :src="flags[locale]" :alt="locale.toUpperCase()" class="w-6 h-4 rounded-xs" />
    </button>

    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false"></div>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-24 bg-black/70 backdrop-blur-md rounded-md overflow-hidden shadow-lg z-50"
    >
      <NuxtLink
        v-for="l in locales"
        :key="l.code"
        :to="targetFor(l.code)"
        :hreflang="l.code"
        class="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-white/30 transition"
        @click="isOpen = false"
      >
        <img :src="flags[l.code]" alt="" class="w-6 h-4 object-cover rounded-xs" />
        <span class="uppercase">{{ l.code }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
