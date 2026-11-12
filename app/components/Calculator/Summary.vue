<script setup lang="ts">
import type { FenceSelection } from "~/composables/useCalculator";

// Santrauka su sąmatos kaina. „Gauti pasiūlymą“ atidaro užklausos formą (Request.vue) – užklausa su pasirinkimais
// ir ta pačia sąmata atsiranda MTSoft „Užklausose“.
const { t, locale } = useI18n();
const {
  selection,
  result,
  loading,
  missing,
  hasFence,
  hasGates,
  isBlinds,
  modelOf,
  heightOf,
  lengthOf,
  hasAutomatics,
  wicketAvailable,
} = useCalculator();

const number = (value: number, digits = 0) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);

const meters = (cm: number) => number(cm / 100, 2);
const colorName = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);

// Vienos tvoros pasirinkimų eilutės
const fenceLines = (item: FenceSelection) => {
  const entry = modelOf(item);
  const list: string[] = [];

  if (entry) {
    const details = [
      entry.steel ? t(`calc.steel.${item.steel}`) : "",
      entry.seeThrough.length ? t(`calc.seeThrough.${item.seeThrough}`) : "",
      entry.twoSided ? t(item.twoSided ? "calc.boards.twoSided" : "calc.boards.oneSided") : "",
      item.color ? colorName(item.color) : "",
    ].filter(Boolean);
    const name = entry.category === "Segmentas" ? t("calc.model.segment") : entry.name;
    list.push([name, ...details].join(", "));
  }

  const height = heightOf(item);
  const length = lengthOf(item);
  const size = [
    height ? t("calc.summary.heightLine", { value: height }) : "",
    hasFence.value && length ? t("calc.summary.lengthLine", { value: number(length, 1) }) : "",
  ].filter(Boolean);
  if (size.length) list.push(size.join(", "));

  if (hasFence.value) list.push(t(`calc.size.${item.parts}`));

  if (hasGates.value) {
    if (item.gateType === "segment" && item.gateWidth) {
      const line = t("calc.summary.segmentGateLine", { width: meters(item.gateWidth), count: item.gateCount });
      const automatics = t(item.automatics ? "calc.gates.withAutomatics" : "calc.gates.withoutAutomatics").toLowerCase();
      list.push(hasAutomatics(item) ? `${line}, ${automatics}` : line);
    } else if (item.gateType !== "none" && item.gateWidth) {
      list.push(
        t("calc.summary.gateLine", {
          type: t(`calc.gates.${item.gateType}`),
          width: meters(item.gateWidth),
          count: item.gateCount,
          automatics: t(item.automatics ? "calc.gates.withAutomatics" : "calc.gates.withoutAutomatics").toLowerCase(),
        }),
      );
    }
    if (item.wickets > 0 && wicketAvailable(item)) {
      list.push(
        t(item.wicketType === "segment" ? "calc.summary.wicketKitLine" : "calc.summary.wicketLine", {
          count: item.wickets,
        }),
      );
    }
  }

  return list;
};

// Santraukos grupės: po vieną kiekvienai tvorai (pavadinimas rodomas, kai tvorų kelios) arba žaliuzėms
const groups = computed(() => {
  const value = selection.value;

  if (isBlinds.value) {
    const blinds = value.blinds;
    return [
      {
        title: "",
        lines: [
          [blinds.type, t(`calc.blinds.${blinds.direction}`), blinds.color ? colorName(blinds.color) : ""]
            .filter(Boolean)
            .join(", "),
          ...blinds.openings
            .filter((opening) => opening.widthText.trim() && opening.heightText.trim())
            .map((opening) =>
              t("calc.summary.openingLine", {
                width: opening.widthText.trim(),
                height: opening.heightText.trim(),
                count: opening.count,
              }),
            ),
        ].filter(Boolean),
      },
    ];
  }

  return value.fences.map((item, index) => ({
    title:
      value.fences.length > 1 ? t(hasFence.value ? "calc.fences.tab" : "calc.fences.gatesTab", { n: index + 1 }) : "",
    lines: fenceLines(item),
  }));
});

const scopeLine = computed(() => t(`calc.scope.${selection.value.scope}`));
const installLine = computed(() => t(selection.value.installation ? "calc.install.yes" : "calc.install.no"));

const missingText = computed(() => {
  if (!missing.value) return "";
  const text = t(`calc.summary.${missing.value.key}`);
  return missing.value.fence ? t("calc.summary.inFence", { n: missing.value.fence, text }) : text;
});

const price = computed(() => (result.value?.status === "ok" ? result.value : null));

const priceText = computed(() => (price.value ? t("calc.summary.total", { value: number(price.value.price) }) : ""));

const parts = computed(() =>
  !price.value
    ? []
    : (["materials", "gates", "works"] as const)
        .filter((key) => price.value!.parts[key] > 0)
        .map((key) => ({
          label: t(key === "materials" && isBlinds.value ? "calc.summary.blindMaterials" : `calc.summary.${key}`),
          value: t("calc.summary.part", { value: number(price.value!.parts[key]) }),
        })),
);

// Užklausos laukai MTSoft „Užklausose“: tie patys pasirinkimai, kuriuos lankytojas mato santraukoje
const requestOpen = ref(false);

const fields = computed(() => [
  { label: t("calc.steps.scope"), values: [scopeLine.value] },
  ...groups.value.map((group) => ({ label: group.title || scopeLine.value, values: group.lines })),
  { label: t("calc.steps.install"), values: [installLine.value] },
]);

const phone = computed(() => t("contacts.ofisoTelNr"));
</script>

<template>
  <aside id="calc-summary" class="flex flex-col gap-5 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
    <h2 class="text-2xl font-bold">{{ $t("calc.summary.title") }}</h2>

    <div class="flex flex-col gap-4">
      <p class="font-bold">{{ scopeLine }}</p>
      <div v-for="(group, index) in groups" :key="index" class="flex flex-col gap-2">
        <p v-if="group.title" class="text-sm font-bold uppercase tracking-wide text-red-main">{{ group.title }}</p>
        <ul class="flex flex-col gap-2">
          <li v-for="line in group.lines" :key="line" class="flex gap-3">
            <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
            <span>{{ line }}</span>
          </li>
        </ul>
      </div>
      <p class="font-medium">{{ installLine }}</p>
    </div>

    <div class="flex flex-col gap-3 pt-5 border-t border-gray-200" aria-live="polite">
      <p v-if="missing" class="font-medium text-gray-600">{{ missingText }}</p>

      <template v-else-if="price">
        <p class="text-sm text-gray-600">{{ $t("calc.summary.price") }}</p>
        <p class="text-4xl font-bold transition-opacity" :class="loading ? 'opacity-40' : ''">
          {{ priceText }}
        </p>
        <p class="text-sm text-gray-600 -mt-2">{{ $t("calc.summary.net", { value: number(price.priceNet) }) }}</p>
        <dl class="flex flex-col gap-1 text-sm">
          <div v-for="part in parts" :key="part.label" class="flex justify-between gap-4">
            <dt class="text-gray-600">{{ part.label }}</dt>
            <dd class="font-semibold whitespace-nowrap">{{ part.value }}</dd>
          </div>
        </dl>
        <p class="text-xs text-gray-500">{{ $t(isBlinds ? "calc.summary.blindNote" : "calc.summary.note") }}</p>
      </template>

      <p v-else-if="loading || !result" class="font-medium text-gray-600">
        {{ $t("calc.summary.calculating") }}
      </p>
      <p v-else-if="result.status === 'manual'" class="font-medium">{{ $t("calc.summary.manual") }}</p>
      <p v-else class="font-medium">{{ $t("calc.summary.error") }}</p>
    </div>

    <BaseButton width="w-full" :disabled="!!missing" @click="requestOpen = true">
      {{ $t("calc.summary.cta") }}
    </BaseButton>

    <div class="flex flex-col gap-2 text-center">
      <a :href="`tel:${phone.replaceAll(' ', '')}`" class="text-xl font-bold hover:underline">{{ phone }}</a>
    </div>
    <CalculatorRequest v-model="requestOpen" :fields="fields" :price="price?.price ?? null" />
  </aside>
</template>
