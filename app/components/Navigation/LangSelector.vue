<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const isOpen = ref(false);

const flags: Record<string, string> = {
  lt: "/icons/lt.svg",
  en: "/icons/us.svg",
};

const changeLang = (code: string) => {
  setLocale(code as "lt" | "en");
  router.push(localePath(route.fullPath));
  isOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center rounded-md bg-white/10 hover:bg-white/20 transition hover:cursor-pointer"
    >
      <img :src="flags[locale]" class="w-6 h-4 rounded-xs" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-24 bg-black/70 backdrop-blur-md rounded-md overflow-hidden shadow-lg"
    >
      <button
        v-for="l in locales"
        :key="l.code"
        @click="changeLang(l.code)"
        class="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-white/30 transition hover:cursor-pointer"
      >
        <img :src="flags[l.code]" class="w-6 h-4 object-cover rounded-xs" />
        <span class="uppercase">{{ l.code }}</span>
      </button>
    </div>
  </div>
</template>
