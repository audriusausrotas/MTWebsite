<script setup lang="ts"></script>

<template>
  <div class="w-full h-svh flex flex-col justify-between">
    <NavigationHeader />
    <main>
      <slot />
    </main>
    <NavigationFooter />
  </div>
</template>
<style scoped></style>
