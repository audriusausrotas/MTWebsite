<script setup lang="ts">
useSeo("home.seoTitle", "home.seoDescription");
</script>

<template>
  <div class="flex flex-col gap-24">
    <BaseHeroVideo />
    <!-- <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section> -->
    <section>
      <ContactsBlock />
    </section>
    <section>
      <ContactsMap />
    </section>
  </div>
</template>
