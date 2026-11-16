<script setup lang="ts">
import type { CalculatorConfig } from "#shared/types/calculator";

definePageMeta({
  breadcrumb: "tvoru-skaiciuokle",
});

useSeo("tvoru-skaiciuokle");

// Parinktys (tvorų modeliai, spalvos, vartų pločiai) – iš MTSoft; kaina skaičiuojama ten pat.
// MTSoft nepasiekiamas – vietoj skaičiuoklės rodomi kontaktai.
const { config } = useCalculator();
const { locale } = useI18n();

// Straipsnis apie tvoros kainą (adresai abiem kalbomis skirtingi)
const priceArticle = computed(() =>
  locale.value === "en"
    ? "/en/articles/fence-price-how-much-does-a-fence-cost"
    : "/straipsniai/tvoros-kaina-kiek-kainuoja-tvora",
);

const { data } = await useFetch<CalculatorConfig>("/api/calculator", { key: "calculator-config" });
config.value = data.value ?? null;
</script>

<template>
  <BaseWrapper>
    <CalculatorMain v-if="config" />
    <div v-else class="flex flex-col gap-12">
      <p class="text-lg">{{ $t("calc.unavailable") }}</p>
      <ContactsBlock />
    </div>

    <section class="flex flex-col gap-4 max-w-200 pt-12">
      <h2 class="text-3xl font-medium">{{ $t("calc.about.title") }}</h2>
      <p>{{ $t("calc.about.p1") }}</p>
      <p>{{ $t("calc.about.p2") }}</p>
      <NuxtLink :to="priceArticle" class="font-semibold text-red-main hover:underline">
        {{ $t("calc.about.link") }}
      </NuxtLink>
    </section>
  </BaseWrapper>
</template>
