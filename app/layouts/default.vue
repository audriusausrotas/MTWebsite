<script setup lang="ts">
import getData from "~/utils/getData";

if (import.meta.server) {
  await getData();
}
</script>

<template>
  <div class="w-full h-dvh flex flex-col justify-between">
    <NavigationHeader />
    <NavigationMobile />
    <main>
      <slot />
    </main>
    <NavigationFooter />
  </div>
</template>
<style scoped></style>
