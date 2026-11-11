<script setup lang="ts">
import type { ArticleListItem } from "#shared/types/website";

// Straipsnio kortelė (sąraše ir „Kiti straipsniai“): visa kortelė – nuoroda
const props = withDefaults(defineProps<{ article: ArticleListItem; tag?: "h2" | "h3" }>(), {
  tag: "h2",
});

const localePath = useLocalePath();

const slug = computed(() => props.article.path.split("/").pop() ?? "");
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'straipsniai-slug', params: { slug } })"
    class="group flex flex-col h-full rounded-lg overflow-hidden bg-white border border-gray-100 shadow-lg transition-shadow hover:shadow-xl"
  >
    <div class="overflow-hidden bg-gray-100">
      <NuxtImg
        v-if="article.image"
        :src="article.image"
        alt=""
        sizes="sm:100vw md:50vw lg:400px"
        loading="lazy"
        class="w-full aspect-3/2 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="flex flex-col gap-3 flex-1 p-6">
      <component
        :is="tag"
        class="text-xl font-medium transition-colors group-hover:text-red-main"
      >
        {{ article.title }}
      </component>
      <p v-if="article.description" class="text-gray-700 line-clamp-3">
        {{ article.description }}
      </p>
      <span class="mt-auto pt-2 font-bold text-red-main">
        {{ $t("articles.pagination.read-more") }}
      </span>
    </div>
  </NuxtLink>
</template>
