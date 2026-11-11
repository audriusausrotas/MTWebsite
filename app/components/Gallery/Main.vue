<script setup lang="ts">
import type { Image } from "~/data/interfaces";

// be `images` rodoma bendra galerija (useGallery);
// `filters` – filtrų mygtukai pagal nuotraukos pavadinimą (tvoros modelį), kai pavadinimų daugiau nei vienas
const props = defineProps<{ images?: Image[]; filters?: boolean }>();

// Iš karto rodoma tiek nuotraukų, likusios – mygtuku „Rodyti daugiau“
const PAGE = 24;

const gallery = useGallery();
const { locale } = useI18n();

const all = computed(() => props.images ?? gallery.images.value);

const groups = computed(() => {
  const counts = new Map<string, number>();
  all.value.forEach((image) => {
    if (image.name) counts.set(image.name, (counts.get(image.name) ?? 0) + 1);
  });
  return [...counts].map(([name, count]) => ({ name, count }));
});
const showFilters = computed(() => props.filters && groups.value.length > 1);

// "" – visos nuotraukos
const active = ref("");
const visibleCount = ref(PAGE);

const filtered = computed(() =>
  active.value ? all.value.filter((image) => image.name === active.value) : all.value,
);
const images = computed(() => filtered.value.slice(0, visibleCount.value));

const select = (name: string) => {
  active.value = name;
  visibleCount.value = PAGE;
};

const altOf = (image: Image) => (locale.value === "en" ? image.altEN : image.alt) || image.name;

const modalOpen = ref<boolean>(false);
const currentImage = ref<number>(0);

const openModal = (index: number) => {
  currentImage.value = index;
  modalOpen.value = true;
};
</script>

<template>
  <div class="max-w-default w-full m-auto flex flex-col gap-8">
    <div v-if="showFilters" class="flex flex-wrap gap-2">
      <button
        v-for="group in [{ name: '', count: all.length }, ...groups]"
        :key="group.name"
        type="button"
        :aria-pressed="active === group.name"
        class="h-10 px-4 flex items-center gap-2 border-2 text-sm font-semibold transition-colors hover:cursor-pointer"
        :class="
          active === group.name
            ? 'border-red-main bg-red-main text-white'
            : 'border-gray-200 hover:border-red-main hover:text-red-main'
        "
        @click="select(group.name)"
      >
        {{ group.name || $t("gallery.all") }}
        <span class="font-normal opacity-70">{{ group.count }}</span>
      </button>
    </div>

    <!-- telefone – 2 stulpeliai; kas trečia nuotrauka aukšta, kas septinta – dviguba -->
    <div
      class="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 grid-flow-dense"
    >
      <button
        v-for="(image, index) in images"
        :key="image.url"
        type="button"
        :aria-label="altOf(image) || $t('gallery.enlarge')"
        class="group relative overflow-hidden rounded hover:cursor-pointer h-40 sm:h-50 nth-[3n]:row-span-2 nth-[3n]:h-84 sm:nth-[3n]:h-104 nth-[7n]:col-span-2 nth-[7n]:row-span-2 nth-[7n]:h-84 sm:nth-[7n]:h-104"
        @click="openModal(index)"
      >
        <NuxtImg
          :src="image.url"
          :alt="altOf(image)"
          sizes="sm:50vw md:50vw lg:600px"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          v-if="image.name"
          class="absolute inset-x-0 bottom-0 px-4 pt-10 pb-3 bg-linear-to-t from-black/75 to-transparent text-white text-sm font-semibold text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {{ image.name }}
        </span>
      </button>
    </div>

    <BaseButton
      v-if="filtered.length > images.length"
      width="w-60"
      class="self-center"
      @click="visibleCount += PAGE"
    >
      {{ $t("gallery.showMore") }}
    </BaseButton>
  </div>

  <BaseGalleryFullscreen
    v-if="modalOpen"
    :images="filtered"
    :currentImage="currentImage"
    @closeModal="modalOpen = false"
  />
</template>
