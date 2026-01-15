<script setup lang="ts">
definePageMeta({
  breadcrumb: "apie",
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseHeroImage :name="$t('breadcrumbs.apie')" />
    <div class="flex flex-col gap-24 max-w-default w-full m-auto px-4 pb-28">
      <div class="flex flex-col gap-12 max-w-100 w-full">
        <h2 class="text-4xl font-medium">{{ $t("about.aprasymas.title") }}</h2>
        <p>
          {{ $t("about.aprasymas.text") }}
        </p>
      </div>
      <BaseVideo />
      <AboutBlock
        :title="$t('about.box1.title')"
        :text="$t('about.box1.text')"
        :url="$t('about.box1.url')"
      />
      <AboutCards />
      <AboutBlock
        reverse
        :title="$t('about.box2.title')"
        :text="$t('about.box2.text')"
        :url="$t('about.box2.url')"
      />
      <AboutBlock
        :title="$t('about.box3.title')"
        :text="$t('about.box3.text')"
        :url="$t('about.box3.url')"
      />
    </div>
  </div>
</template>
