<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="w-full max-w-default px-4 m-auto flex flex-col gap-10">
    <h3 class="text-4xl font-medium text-center sm:text-left">{{ $t("home.products") }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <HomeProductCard
        :title="$t('menu.skardines-tvoros')"
        url="/images/tvoros/daimond6090.jpg"
        :to="localePath('/tvoros/skardines-tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.metalines-tvoros')"
        url="/images/tvoros/metalines-tvoros.jpg"
        :to="localePath('/tvoros/metalines-tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.tvoralentes')"
        url="/images/tvoros/dilė.jpg"
        :to="localePath('/tvoros/tvoralentes')"
      />
      <HomeProductCard
        :title="$t('menu.segmentines-tvoros')"
        url="/images/tvoros/tvora22.jpg"
        :to="localePath('/tvoros/segmentines-tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.kiemo-vartai')"
        url="/images/tvoros/tvora14.jpg"
        :to="localePath('/kiemo-vartai')"
      />
      <HomeProductCard
        :title="$t('menu.lauko-zaliuzes')"
        url="/images/zaliuzes/blinds.jpg"
        :to="localePath('/lauko-zaliuzes')"
      />
    </div>
  </div>
</template>

<style scoped></style>
