<script setup lang="ts">
import { navigation } from "~/config/navigation";
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
</script>

<template>
  <header
    class="hidden lg:flex gap-4 w-full m-auto px-4 h-20 items-center justify-between text-white bg-black/50 absolute top-0 left-0 backdrop-blur-xs z-50"
  >
    <NuxtImg
      src="/icons/logo.svg"
      width="100"
      height="50"
      @click="navigateTo(localePath('/'))"
      class="hover:cursor-pointer"
    />

    <nav class="flex gap-4 xl:gap-8 text-sm font-medium items-center text-center">
      <NuxtLinkLocale
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="transition"
        :class="{
          'text-red-500  hover:text-red-500': route.path === localePath(item.to),
          'hover:text-red-300': route.path !== localePath(item.to),
        }"
      >
        {{ t(item.name) }}
      </NuxtLinkLocale>
    </nav>
    <div class="flex gap-8">
      <NuxtImg
        src="/icons/search.svg"
        width="20"
        height="20"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        class="text-white"
      />
      <NavigationLangSelector />
    </div>
  </header>
</template>

<style scoped></style>
