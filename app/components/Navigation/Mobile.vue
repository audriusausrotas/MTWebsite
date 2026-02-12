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

const homeHandler = () => {
  closeHandler();
  navigateTo(localePath("/"));
};
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex items-center fixed w-full z-50 bg-stone-900 p-4 gap-4 lg:hidden justify-between"
    >
      <NuxtImg
        v-if="!menuOpen"
        @click="menuOpen = true"
        src="/icons/hamburger.svg"
        width="40"
        height="40"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
      <NuxtImg
        v-else
        @click="closeHandler"
        src="/icons/close.svg"
        width="40"
        height="40"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />

      <NuxtImg
        src="/icons/logo.svg"
        width="100"
        height="50"
        @click="homeHandler"
        class="hover:cursor-pointer"
      />

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
        class="lg:hidden flex flex-col gap-4 items-center w-full h-full text-white bg-stone-900 py-8 top-19 z-40 fixed"
      >
        <div @click="searchOpen = !searchOpen" class="flex items-center gap-2">
          <NuxtImg
            src="/icons/search.svg"
            width="20"
            height="20"
            decoding="auto"
            loading="lazy"
            :ismap="true"
            class="text-white"
          />
          {{ t("home.search") }}
        </div>
        <BaseSearch v-if="searchOpen" />
        <NuxtLinkLocale
          v-if="!searchOpen"
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          @click="closeHandler"
          class="transition"
          :class="{
            'text-red-500  hover:text-red-500': route.path === localePath(item.to),
            'hover:text-red-300': route.path !== localePath(item.to),
          }"
        >
          {{ t(item.name) }}
        </NuxtLinkLocale>
      </nav>
    </Transition>
  </div>
</template>

<style scoped></style>
