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
const { t, te } = useI18n();

// Pavadinimas (h1) – pagal definePageMeta({ breadcrumb }): tikslesnė antraštė `seo.<raktas>.h1`, jei tokia yra,
// kitaip – meniu pavadinimas (tas pats šaltinis kaip ir trupiniams)
const title = computed(() => {
  if (props.title) return props.title;
  const key = route.meta.breadcrumb as string;
  return te(`seo.${key}.h1`) ? t(`seo.${key}.h1`) : t(`menu.${key}`);
});

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
