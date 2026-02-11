<script setup lang="ts">
definePageMeta({
  breadcrumb: "finansuojamas-projektas",
});

const { funded } = useFunded();
const { locale } = useI18n();
</script>

<template>
  <BaseWrapper breadcrumb="finansuojamas-projektas">
    <div class="max-w-200 w-full m-auto flex flex-col gap-20">
      <NuxtImg
        v-for="item in funded"
        :key="item.url"
        :src="item.url.trim()"
        :alt="locale === 'lt' ? item.alt : item.altEN"
        class="w-full shadow-2xl rounded-lg"
      />
    </div>
  </BaseWrapper>
</template>

<style scoped></style>
