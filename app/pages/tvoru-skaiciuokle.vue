<script setup lang="ts">
import type { CalculatorConfig } from "#shared/types/calculator";

definePageMeta({
  breadcrumb: "tvoru-skaiciuokle",
});

useSeo("tvoru-skaiciuokle");

// Parinktys (tvorų modeliai, spalvos, vartų pločiai) – iš MTSoft; kaina skaičiuojama ten pat.
// MTSoft nepasiekiamas – vietoj skaičiuoklės rodomi kontaktai.
const { config } = useCalculator();

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
  </BaseWrapper>
</template>
