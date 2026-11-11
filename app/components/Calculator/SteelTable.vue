<script setup lang="ts">
// Premium ir Eco skardos palyginimas (tie patys duomenys kaip MTSoft pasiūlyme – Offers/SteelInfo.vue)
const { t } = useI18n();

const rows = computed(() => [
  { label: t("calc.steel.rows.maker"), premium: "Arcelor Ultramatt", eco: t("calc.steel.values.ukraine") },
  {
    label: t("calc.steel.rows.country"),
    premium: t("calc.steel.values.belgium"),
    eco: t("calc.steel.values.ukraine"),
  },
  {
    label: t("calc.steel.rows.warranty"),
    premium: t("calc.steel.values.years50"),
    eco: t("calc.steel.values.years20"),
  },
  {
    label: t("calc.steel.rows.colorWarranty"),
    premium: t("calc.steel.values.years20"),
    eco: t("calc.steel.values.years5"),
  },
  { label: t("calc.steel.rows.thickness"), premium: "0,5 mm", eco: "0,5 mm" },
  { label: t("calc.steel.rows.shade"), premium: t("calc.steel.values.yes"), eco: t("calc.steel.values.no") },
  { label: t("calc.steel.rows.zinc"), premium: "Zn 275 g/m²", eco: "Zn 100 g/m²" },
  { label: t("calc.steel.rows.coating"), premium: t("calc.steel.values.min35"), eco: t("calc.steel.values.mic35") },
]);
</script>

<template>
  <div class="overflow-x-auto border border-gray-200 rounded-lg">
    <table class="w-full text-sm sm:text-base">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="px-3 py-2 font-medium text-gray-600">{{ $t("calc.steel.type") }}</th>
          <th class="px-3 py-2 font-bold text-red-main">{{ $t("calc.steel.premium") }}</th>
          <th class="px-3 py-2 font-bold">{{ $t("calc.steel.eco") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.label" class="border-t border-gray-200">
          <td class="px-3 py-2 text-gray-600">{{ row.label }}</td>
          <td class="px-3 py-2 font-semibold">{{ row.premium }}</td>
          <td class="px-3 py-2">{{ row.eco }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
