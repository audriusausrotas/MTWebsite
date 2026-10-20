<script setup lang="ts">
import { navigation } from "~/config/navigation";
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const menuOpen = ref<boolean>(false);
const searchOpen = ref<boolean>(false);

const closeHandler = () => {
  menuOpen.value = false;
  searchOpen.value = false;
};

const isActive = (to: string) => {
  const path = localePath(to);
  return route.path === path || route.path.startsWith(path + "/");
};

watch(() => route.fullPath, closeHandler);
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex items-center fixed w-full z-50 bg-stone-900 p-4 gap-4 lg:hidden justify-between"
    >
      <button
        type="button"
        :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
        :aria-expanded="menuOpen"
        @click="menuOpen ? closeHandler() : (menuOpen = true)"
      >
        <img
          :src="menuOpen ? '/icons/close.svg' : '/icons/hamburger.svg'"
          alt=""
          width="40"
          height="40"
        />
      </button>

      <NuxtLinkLocale to="/" :aria-label="t('nav.home')" @click="closeHandler">
        <img src="/icons/logo.svg" :alt="t('nav.home')" width="100" height="50" />
      </NuxtLinkLocale>

      <NavigationLangSelector class="text-white" />
    </div>
    <Transition
      enter-active-class="transition-opacity duration-400"
      enter-from-class="opacity-0 "
      enter-to-class="opacity-100 "
      leave-active-class="transition-opacity duration-400"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <nav
        v-if="menuOpen"
        class="lg:hidden flex flex-col gap-4 items-center w-full h-full text-white bg-stone-900 py-8 px-4 top-19 z-40 fixed"
      >
        <button
          type="button"
          class="flex items-center gap-2"
          :aria-expanded="searchOpen"
          @click="searchOpen = !searchOpen"
        >
          <img src="/icons/search.svg" alt="" width="20" height="20" />
          {{ t("search.open") }}
        </button>
        <BaseSearch v-if="searchOpen" dark @navigate="closeHandler" />
        <template v-else>
          <NuxtLinkLocale
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="transition"
            :class="isActive(item.to) ? 'text-red-500 hover:text-red-500' : 'hover:text-red-300'"
          >
            {{ t(item.name) }}
          </NuxtLinkLocale>
        </template>
      </nav>
    </Transition>
  </div>
</template>
