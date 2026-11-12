<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="w-full max-w-default px-4 m-auto flex flex-col gap-10">
    <h2 class="text-4xl font-medium text-center sm:text-left">{{ $t("home.products") }}</h2>
    <!-- penkios kortelės: dvi didesnės viršuje, trys apačioje -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
      <HomeProductCard
        class="md:col-span-3"
        :title="$t('menu.skardines-tvoros')"
        url="/images/tvoros/daimond6090.jpg"
        :to="localePath('/tvoros/skardines-tvoros')"
      />
      <HomeProductCard
        class="md:col-span-3"
        :title="$t('menu.tvoralentes')"
        url="/images/tvoros/dilė.jpg"
        :to="localePath('/tvoros/tvoralentes')"
      />
      <HomeProductCard
        class="md:col-span-2"
        :title="$t('menu.segmentines-tvoros')"
        url="/images/tvoros/tvora22.jpg"
        :to="localePath('/tvoros/segmentines-tvoros')"
      />
      <HomeProductCard
        class="md:col-span-2"
        :title="$t('menu.kiemo-vartai')"
        url="/images/tvoros/tvora14.jpg"
        :to="localePath('/kiemo-vartai')"
      />
      <HomeProductCard
        class="md:col-span-2"
        :title="$t('menu.lauko-zaliuzes')"
        url="/images/zaliuzes/blinds.jpg"
        :to="localePath('/lauko-zaliuzes')"
      />
    </div>
  </div>
</template>

<style scoped></style>
