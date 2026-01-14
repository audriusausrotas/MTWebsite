<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-full h-svh justify-between">
    <NavigationHeader />
    <main class="h-full">
      <slot />
    </main>
    <NavigationFooter />
  </div>
</template>
<style scoped></style>
