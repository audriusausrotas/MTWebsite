<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="w-full max-w-default px-4 m-auto flex flex-col gap-10">
    <h3 class="text-4xl font-medium">Produktai</h3>
    <div class="grid grid-cols-2 gap-4">
      <HomeProductCard
        :title="$t('menu.fences')"
        url="/images/daimond6090.jpg"
        :to="localePath('/tvoros')"
      />
      <HomeProductCard
        :title="$t('menu.gates')"
        url="/images/gates.jpeg"
        :to="localePath('/kiemo-vartai')"
      />
      <HomeProductCard
        :title="$t('menu.blinds')"
        url="/images/blinds.jpg"
        :to="localePath('/lauko-zaliuzes')"
      />
      <!-- <HomeProductCard :title="$t('menu.shop')" url="/images/daimond6090.jpg" :to="localePath('/parduotuve')"/> -->
    </div>
  </div>
</template>

<style scoped></style>
