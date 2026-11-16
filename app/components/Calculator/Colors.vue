<script setup lang="ts">
// Spalvų pasirinkimas (RAL). Langelis – vientisa spalva. Atspalviai – tie patys, kuriuos MTSoft naudoja gamyboje
// (MTSoft data/initialValues.ts, RALcolors): parinkti taip, kad ekrane spalvos aiškiai skirtųsi viena nuo kitos.
// Keičiant atspalvį – pakeisti abiejose vietose.
defineProps<{ colors: string[] }>();
const selected = defineModel<string>({ required: true });

const { t } = useI18n();

const COLOR_HEX: Record<string, string> = {
  "7016": "#686B7A",
  "7024": "#7E8394",
  "8019": "#785853",
  "8017": "#8C4F45",
  "6020": "#4D7849",
  "6005": "#289E4B",
  "9005": "#0A0A0A",
  "3009": "#D15441",
  "8004": "#D15C3B",
  Zn: "#c4c8cc",
};

const label = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="color in colors"
      :key="color"
      type="button"
      :aria-pressed="selected === color"
      class="flex flex-col items-center gap-1 p-1 border-2 rounded-lg transition-colors hover:cursor-pointer"
      :class="selected === color ? 'border-red-main' : 'border-transparent hover:border-gray-300'"
      @click="selected = color"
    >
      <span
        class="w-24 h-16 rounded-md border border-gray-200"
        :style="{ backgroundColor: COLOR_HEX[color] ?? '#9ca3af' }"
      ></span>
      <span class="text-sm font-semibold">{{ label(color) }}</span>
    </button>
  </div>
</template>
