<script setup lang="ts">
// Atsiliepimų juosta: vienodo aukščio kortelės, slenkamos horizontaliai (pirštu arba rodyklėmis).
// Ilgi atsiliepimai sutrumpinami ir išskleidžiami paspaudus.
interface Review {
  name: string;
  text: string;
}

defineProps<{ reviews: Review[] }>();

const LONG = 260;

const track = ref<HTMLElement | null>(null);
const expanded = ref<Record<number, boolean>>({});

const scroll = (direction: 1 | -1) => {
  const el = track.value;
  const card = el?.firstElementChild as HTMLElement | null;
  if (!el || !card) return;
  // viena kortelė + tarpas
  el.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" });
};
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex justify-center sm:justify-between items-center gap-8">
      <h2 class="text-4xl font-medium">{{ $t("home.reviews") }}</h2>
      <div class="hidden sm:flex gap-2">
        <button
          v-for="direction in [-1, 1] as const"
          :key="direction"
          type="button"
          :aria-label="
            direction === -1 ? $t('articles.pagination.previous') : $t('articles.pagination.next')
          "
          class="w-14 h-14 flex items-center justify-center border-2 border-red-main text-red-main transition-colors duration-100 hover:bg-red-main hover:text-white hover:cursor-pointer"
          @click="scroll(direction)"
        >
          <svg
            class="w-6 h-6 fill-none stroke-current stroke-2"
            :class="direction === -1 ? 'rotate-180' : ''"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <ul
      ref="track"
      class="flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <li
        v-for="(review, index) in reviews"
        :key="review.name + index"
        class="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] bg-gray-100 rounded-lg p-8 flex flex-col gap-4"
      >
        <svg class="w-8 h-8 shrink-0 fill-red-main" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 18v-5.2C4 8.6 6.2 6 10 5l.6 1.8C8.5 7.6 7.5 9 7.4 11H10v7H4Zm10 0v-5.2c0-4.2 2.2-6.8 6-7.8l.6 1.8c-2.1.8-3.1 2.2-3.2 4.2H20v7h-6Z"
          />
        </svg>
        <p :class="expanded[index] ? '' : 'line-clamp-6'">{{ review.text }}</p>
        <button
          v-if="review.text.length > LONG"
          type="button"
          :aria-expanded="!!expanded[index]"
          class="self-start text-sm text-red-main font-semibold hover:underline hover:cursor-pointer"
          @click="expanded[index] = !expanded[index]"
        >
          {{ expanded[index] ? $t("fences.readLess") : $t("fences.readMore") }}
        </button>
        <p class="mt-auto pt-2 text-xl font-medium">{{ review.name }}</p>
      </li>
    </ul>
  </div>
</template>
