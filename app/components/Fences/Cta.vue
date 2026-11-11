<script setup lang="ts">
// Raudona kvietimo susisiekti juosta tvorų puslapių apačioje (kaip vartų puslapyje)
const { t } = useI18n();
const localePath = useLocalePath();

const phone = computed(() => t("contacts.ofisoTelNr"));
</script>

<template>
  <section class="bg-red-main text-white p-8 md:p-12 flex flex-col gap-6 items-center text-center">
    <h2 class="text-4xl font-medium">{{ $t("fences.cta.title") }}</h2>
    <p class="max-w-150">{{ $t("fences.cta.text") }}</p>
    <div class="flex flex-col sm:flex-row gap-8 items-center">
      <BaseArrowButton
        :name="$t('fences.cta.button')"
        variant="secondary"
        :to="localePath('/kontaktai')"
      />
      <a :href="`tel:${phone.replaceAll(' ', '')}`" class="text-2xl font-bold hover:underline">
        {{ phone }}
      </a>
    </div>
  </section>
</template>
