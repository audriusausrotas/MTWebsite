<script setup lang="ts">
definePageMeta({
  breadcrumb: "kontaktai",
});
</script>

<template>
  <div class="flex flex-col gap-20">
    <BaseHeroImage :name="$t('menu.kontaktai')" />
    <ContactsBlock />
    <ContactsMap />
  </div>
</template>

<style scoped></style>
