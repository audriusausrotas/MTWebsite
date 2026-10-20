<script setup lang="ts">
const props = defineProps<{
  customStyles?: string;
  // puslapis turi savo <h1> (pvz. straipsnis) – hero pavadinimas tada ne h1
  ownHeading?: boolean;
}>();

const route = useRoute();
const { t } = useI18n();

// Pavadinimas imamas iš definePageMeta({ breadcrumb }) – tas pats šaltinis kaip ir trupiniams
const title = computed(() => t(`menu.${route.meta.breadcrumb as string}`));
</script>

<template>
  <div class="flex flex-col">
    <BaseHeroImage :name="title" :heading="!ownHeading" />
    <div
      class="flex flex-col gap-8 max-w-default w-full m-auto pt-8 pb-20 px-4"
      :class="customStyles"
    >
      <slot />
    </div>
  </div>
</template>
