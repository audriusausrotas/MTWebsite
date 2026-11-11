<script setup lang="ts">
definePageMeta({
  breadcrumb: "apie-mus",
  hero: "/images/tvoros/tvora11.jpg",
});

useSeo("apie-mus");
</script>

<template>
  <BaseWrapper customStyles="gap-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div class="flex flex-col gap-8">
        <h2 class="text-4xl font-medium text-center md:text-left">
          {{ $t("about.aprasymas.title") }}
        </h2>
        <p>
          {{ $t("about.aprasymas.text") }}
        </p>
      </div>
      <NuxtImg
        src="/images/sertifikatai/stipriausi.jpg"
        :alt="$t('about.awardsAlt')"
        sizes="sm:100vw md:50vw lg:600px"
        class="w-full h-auto rounded-lg"
      />
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
  </BaseWrapper>
</template>
