<script setup lang="ts">
import { navigation } from "~/config/navigation";
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
</script>

<template>
  <header
    class="flex w-full h-20 items-center justify-between p-8 bg-black/50 text-white absolute top-0 left-0 backdrop-blur-xs z-50"
  >
    <NuxtImg
      src="/icons/logo.svg"
      width="100"
      height="50"
      @click="navigateTo(localePath('/'))"
      class="hover:cursor-pointer"
    />

    <nav class="flex gap-8 text-sm font-medium">
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
    <NavigationLangSelector />
  </header>
</template>

<style scoped></style>
