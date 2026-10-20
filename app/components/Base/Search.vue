<script setup lang="ts">
import type { SearchResult } from "#shared/types/website";
import { FENCE_CATEGORY_PAGES } from "#shared/site";

const props = withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });
const emit = defineEmits<{ navigate: [] }>();

const { locale } = useI18n();
const localePath = useLocalePath();

const input = ref("");
const results = ref<SearchResult[]>([]);
const searched = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

let timer: ReturnType<typeof setTimeout> | undefined;
let lastRequest = 0;

watch(input, (value) => {
  clearTimeout(timer);
  const term = value.trim();
  if (term.length < 2) {
    results.value = [];
    searched.value = false;
    return;
  }
  timer = setTimeout(async () => {
    const request = ++lastRequest;
    try {
      const data = await $fetch<SearchResult[]>("/api/search", {
        query: { q: term, locale: locale.value },
      });
      // senesnis atsakymas neperrašo naujesnio
      if (request !== lastRequest) return;
      results.value = data;
    } catch {
      if (request === lastRequest) results.value = [];
    }
    searched.value = true;
  }, 250);
});

onMounted(() => inputRef.value?.focus());
onBeforeUnmount(() => clearTimeout(timer));

const fences = computed(() => results.value.filter((r) => r.type === "fence"));
const articles = computed(() => results.value.filter((r) => r.type === "article"));

const linkTo = (result: SearchResult) =>
  result.type === "fence"
    ? localePath(FENCE_CATEGORY_PAGES[result.category ?? ""] ?? "/tvoros")
    : localePath({
        name: "straipsniai-slug",
        params: { slug: result.path?.split("/").pop() ?? "" },
      });
</script>

<template>
  <div class="flex flex-col w-full gap-3 font-medium">
    <input
      ref="inputRef"
      v-model="input"
      type="search"
      :placeholder="$t('search.placeholder')"
      :aria-label="$t('search.open')"
      class="w-full p-2 rounded border focus:outline-none"
      :class="
        dark
          ? 'bg-stone-800 border-stone-700 text-white placeholder:text-stone-400'
          : 'bg-white border-gray-300 text-black'
      "
    />

    <div v-if="searched" class="flex flex-col gap-4 max-h-[60dvh] overflow-y-auto">
      <p v-if="!results.length" class="text-sm opacity-70">{{ $t("search.noResults") }}</p>

      <div v-if="fences.length" class="flex flex-col gap-1">
        <p class="text-xs uppercase opacity-60">{{ $t("search.fences") }}</p>
        <NuxtLink
          v-for="result in fences"
          :key="'f' + result.title"
          :to="linkTo(result)"
          class="hover:text-red-500"
          @click="emit('navigate')"
        >
          {{ result.title }}
        </NuxtLink>
      </div>

      <div v-if="articles.length" class="flex flex-col gap-1">
        <p class="text-xs uppercase opacity-60">{{ $t("search.articles") }}</p>
        <NuxtLink
          v-for="result in articles"
          :key="'a' + result.path"
          :to="linkTo(result)"
          class="hover:text-red-500"
          @click="emit('navigate')"
        >
          {{ result.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
