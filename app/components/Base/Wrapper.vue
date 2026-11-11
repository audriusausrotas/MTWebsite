<script setup lang="ts">
const props = defineProps<{
  customStyles?: string;
  // puslapis turi savo <h1> – hero pavadinimas tada ne h1
  ownHeading?: boolean;
  // hero pavadinimas vietoj meniu pavadinimo (pvz. straipsnio pavadinimas)
  title?: string;
  // ilgas pavadinimas – mažesnis šriftas
  smallTitle?: boolean;
}>();

const route = useRoute();
const { t } = useI18n();

// Pavadinimas imamas iš definePageMeta({ breadcrumb }) – tas pats šaltinis kaip ir trupiniams
const title = computed(() => props.title || t(`menu.${route.meta.breadcrumb as string}`));

// Hero nuotrauka – definePageMeta({ hero }); be jos lieka numatytoji
const hero = computed(() => (route.meta.hero as string | undefined) || undefined);
</script>

<template>
  <div class="flex flex-col">
    <BaseHeroImage :name="title" :url="hero" :heading="!ownHeading" :small="smallTitle" />
    <div
      class="flex flex-col gap-8 max-w-default w-full m-auto pt-8 pb-20 px-4"
      :class="customStyles"
    >
      <slot />
    </div>
  </div>
</template>
