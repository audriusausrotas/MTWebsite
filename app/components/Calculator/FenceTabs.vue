<script setup lang="ts">
// Tvorų skirtukai: viename skaičiavime gali būti kelios tvoros (ar vartai su kitu užpildu) – žingsniai rodomi pasirinktai
const { t } = useI18n();
const { config, selection, modelOf, addFence, removeFence } = useCalculator();

const tabName = (index: number) => {
  const item = selection.value.fences[index]!;
  const entry = modelOf(item);
  const label = t(item.noFence ? "calc.fences.gatesTab" : "calc.fences.tab", { n: index + 1 });
  const name = entry ? (entry.category === "Segmentas" ? t("calc.model.segment") : entry.name) : "";
  return name ? `${label} · ${name}` : label;
};

const canAdd = computed(() => !!config.value && selection.value.fences.length < config.value.maxFences);
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2" role="tablist">
      <div
        v-for="(item, index) in selection.fences"
        :key="item.id"
        class="flex items-stretch border-2 transition-colors"
        :class="selection.active === index ? 'border-red-main bg-red-main text-white' : 'border-gray-300 bg-white'"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="selection.active === index"
          class="min-h-12 px-4 py-2 font-bold hover:cursor-pointer"
          @click="selection.active = index"
        >
          {{ tabName(index) }}
        </button>
        <button
          v-if="selection.fences.length > 1"
          type="button"
          class="px-3 border-l border-current/30 text-xl leading-none hover:cursor-pointer"
          :aria-label="`${$t('calc.fences.remove')}: ${tabName(index)}`"
          :title="$t('calc.fences.remove')"
          @click="removeFence(index)"
        >
          ×
        </button>
      </div>
      <button
        v-if="canAdd"
        type="button"
        class="min-h-12 px-4 py-2 border-2 border-dashed border-gray-400 bg-white font-bold text-gray-700 hover:border-red-main hover:text-red-main hover:cursor-pointer"
        @click="addFence"
      >
        + {{ $t("calc.fences.add") }}
      </button>
    </div>
    <p class="text-sm text-gray-600">{{ $t("calc.fences.hint") }}</p>
  </div>
</template>
