<script setup lang="ts">
// Spalvų pasirinkimas (RAL). Langelis – vientisa spalva. Atspalvis – vidurys tarp MTSoft gamyboje naudojamų spalvų
// (MTSoft data/initialValues.ts, RALcolors – aiškiai skiriasi viena nuo kitos, bet šviesokos) ir gamintojo
// pavyzdžių (public/images/colors – tikslūs, bet ekrane beveik juodi).
defineProps<{ colors: string[] }>();
const selected = defineModel<string>({ required: true });

const { t } = useI18n();

const COLOR_HEX: Record<string, string> = {
  "7016": "#474D59",
  "7024": "#636773",
  "8019": "#4F413B",
  "8017": "#69443C",
  "6020": "#335D3A",
  "6005": "#1D703F",
  "9005": "#0A0A0A",
  "3009": "#A74538",
  "8004": "#AF5538",
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
