<script setup lang="ts">
import type { FenceGroup } from "~/composables/useFences";

// Tvoros modelio blokas: galerija (nuotrauka + brėžinys) ir aprašymas
const props = defineProps<{ group: FenceGroup; reverse?: boolean }>();
const localePath = useLocalePath();
const { locale } = useI18n();

const fence = computed(() => props.group.fence);

// Aprašymas MTSoft'e skirstomas <br>
const text = computed(() =>
  (locale.value === "en" ? fence.value.descriptionEn : fence.value.description)
    .split("<br>")
    .map((line) => line.trim())
    .filter(Boolean),
);

// Rodoma aprašymo pradžia (tiek pastraipų, kad susidarytų bent ~350 simbolių), likusios pastraipos
// išskleidžiamos (lieka HTML'e – paieškos sistemos jas mato)
const expanded = ref(false);
const visibleCount = computed(() => {
  let length = 0;
  for (let index = 0; index < text.value.length; index++) {
    length += text.value[index]!.length;
    if (length >= 350) return index + 1;
  }
  return text.value.length;
});
</script>

<template>
  <article :id="group.anchor" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start scroll-mt-28">
    <div v-if="fence.images.length" class="min-w-0" :class="reverse ? 'md:order-2' : ''">
      <BaseGallerySmall :images="fence.images" :fallback-alt="group.name" />
    </div>

    <div class="flex flex-col gap-6" :class="fence.images.length ? '' : 'md:col-span-2'">
      <h2 class="text-3xl font-medium text-center md:text-left">{{ group.name }}</h2>

      <div v-if="group.variants.length" class="flex flex-col gap-3">
        <span class="font-medium">{{ $t("fences.variants") }}</span>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="variant in group.variants"
            :key="variant"
            class="border border-gray-300 px-3 py-1 text-sm font-medium"
          >
            {{ variant }}
          </li>
        </ul>
      </div>

      <div v-if="text.length" class="flex flex-col gap-4">
        <p v-for="(item, index) in text" v-show="index < visibleCount || expanded" :key="index">
          {{ item }}
        </p>
      </div>

      <button
        v-if="text.length > visibleCount"
        type="button"
        :aria-expanded="expanded"
        class="self-center md:self-start flex items-center gap-2 text-red-main font-semibold hover:underline hover:cursor-pointer"
        @click="expanded = !expanded"
      >
        {{ expanded ? $t("fences.readLess") : $t("fences.readMore") }}
        <svg
          class="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300"
          :class="expanded ? 'rotate-180' : ''"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
        <BaseButton :to="localePath('/tvoru-skaiciuokle')">{{ $t("fences.getPrice") }}</BaseButton>
        <BaseButton :to="localePath('/kontaktai')">{{ $t("fences.constact") }}</BaseButton>
      </div>
    </div>
  </article>
</template>
