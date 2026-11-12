<script setup lang="ts">
import type { EstimateResponse } from "#shared/types/calculator";

// Skaičiuoklė: žingsnių meniu su kaina kairėje, pasirinkto žingsnio turinys – šalia (Layout.vue);
// telefone – kainos juosta apačioje. Kaina perskaičiuojama po kiekvieno pasirinkimo (MTSoft, per /api/estimate).
const { t, locale } = useI18n();
const { config, result, loading, missing, request } = useCalculator();

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);

let timer: ReturnType<typeof setTimeout> | undefined;
let sequence = 0;

const estimate = (body: typeof request.value) => {
  clearTimeout(timer);
  const id = ++sequence;

  if (!body) {
    result.value = null;
    loading.value = false;
    return;
  }

  loading.value = true;
  // trumpas laukimas – kol lankytojas renka ilgį ar spaudo kelis pasirinkimus iš eilės
  timer = setTimeout(async () => {
    let response: EstimateResponse;
    try {
      response = await $fetch<EstimateResponse>("/api/estimate", { method: "POST", body });
    } catch {
      response = { status: "error" };
    }
    if (id !== sequence) return;
    result.value = response;
    loading.value = false;
  }, 350);
};

onMounted(() => {
  watch(request, estimate, { immediate: true });
});

onBeforeUnmount(() => clearTimeout(timer));

const missingText = computed(() => {
  if (!missing.value) return "";
  const text = t(`calc.summary.${missing.value.key}`);
  return missing.value.fence ? t("calc.summary.inFence", { n: missing.value.fence, text }) : text;
});

const barText = computed(() => {
  if (missing.value) return missingText.value;
  if (result.value?.status === "ok") return t("calc.summary.total", { value: number(result.value.price, 0) });
  if (loading.value || !result.value) return t("calc.summary.calculating");
  return t("calc.summary.show");
});
</script>

<template>
  <div v-if="config" class="pb-16 lg:pb-0">
    <CalculatorLayout />

    <!-- telefone – juosta apačioje su kaina ir nuoroda į santrauką -->
    <a
      href="#calc-summary"
      class="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-4 pl-20 pr-4 py-3 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
    >
      <span class="font-bold" :class="loading ? 'opacity-40' : ''">{{ barText }}</span>
      <span class="shrink-0 px-4 py-2 bg-red-main text-white font-bold">{{ $t("calc.summary.show") }}</span>
    </a>
  </div>
</template>
