<script setup lang="ts">
definePageMeta({
  breadcrumb: "kontaktai",
  hero: "/images/tvoros/tvora20.jpg",
});

useSeo("kontaktai");
</script>

<template>
  <BaseWrapper customStyles="gap-20">
    <ContactsBlock class="w-full px-0!" />
    <ContactsTeam />
    <ContactsMap />
  </BaseWrapper>
</template>
