<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="w-full max-w-default px-4 m-auto flex flex-col gap-10">
    <h3 class="text-4xl font-medium">Produktai</h3>
    <div class="grid grid-cols-2 gap-4">
      <HomeProductCard
        :title="$t('menu.skardines')"
        url="/images/tvoros/daimond6090.jpg"
        :to="localePath('/tvoros/skardines-tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.metalines')"
        url="/images/tvoros/metalines-tvoros.jpg"
        :to="localePath('/tvoros/metalines-tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.tvoralentes')"
        url="/images/tvoros/dilė.jpg"
        :to="localePath('/tvoros/tvoralentes')"
      />
      <HomeProductCard
        :title="$t('menu.gates')"
        url="/images/tvoros/tvora14.jpg"
        :to="localePath('/kiemo-vartai')"
      />
      <HomeProductCard
        :title="$t('menu.blinds')"
        url="/images/zaliuzes/blinds.jpg"
        :to="localePath('/lauko-zaliuzes')"
      />
      <!-- <HomeProductCard
        :title="$t('menu.shop')"
        url="/images/tvoros/daimond6090.jpg"
        :to="localePath('/parduotuve')"
      /> -->
    </div>
  </div>
</template>

<style scoped></style>
