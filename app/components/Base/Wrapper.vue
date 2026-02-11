<script setup lang="ts">
const props = defineProps(["breadcrumb", "customStyles"]);
</script>

<template>
  <div class="flex flex-col">
    <BaseHeroImage :name="$t(`menu.${breadcrumb}`)" />
    <div
      class="flex flex-col gap-8 max-w-default w-full m-auto pt-8 pb-20 px-4"
      :class="customStyles"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
