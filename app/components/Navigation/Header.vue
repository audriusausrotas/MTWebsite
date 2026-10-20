<script setup lang="ts">
import { navigation } from "~/config/navigation";
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

// Viršuje – permatoma ant hero, nuslinkus – vientisa tamsi
const scrolled = ref(false);

const onScroll = () => (scrolled.value = window.scrollY > 40);
onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

// aktyvus ir tėvinis punktas (pvz. „Tvoros“ esant /tvoros/skardines-tvoros)
const isActive = (to: string) => {
  const path = localePath(to);
  return route.path === path || route.path.startsWith(path + "/");
};
</script>

<template>
  <header
    class="hidden lg:flex fixed top-0 left-0 z-50 w-full h-20 px-6 items-center justify-between gap-6 text-white transition-colors duration-300"
    :class="scrolled ? 'bg-stone-950/95 shadow-lg backdrop-blur-md' : 'bg-black/40 backdrop-blur-xs'"
  >
    <NuxtLinkLocale to="/" :aria-label="t('nav.home')" class="shrink-0">
      <img src="/icons/logo.svg" :alt="t('nav.home')" width="100" height="50" />
    </NuxtLinkLocale>

    <nav class="flex gap-4 xl:gap-8 text-sm font-medium items-center">
      <NuxtLinkLocale
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="transition-colors whitespace-nowrap"
        :class="isActive(item.to) ? 'text-red-500' : 'hover:text-red-300'"
      >
        {{ t(item.name) }}
      </NuxtLinkLocale>
    </nav>

    <NavigationLangSelector class="shrink-0" />
  </header>
</template>
