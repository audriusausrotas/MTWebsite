<script setup lang="ts">
import type { CalculatorCategory, CalculatorScope } from "#shared/types/calculator";

// Vienas skaičiuoklės pasirinkimas paprastu lauku (išskleidžiamas sąrašas arba įvedimas) – kompaktiškiems išdėstymams
// (forma, sakinys su laukais). Pasirinkimai ir taisyklės – tie patys kaip kortelėse (useCalculator).
// inline – laukas teksto eilutėje (sakinyje), kitaip – per visą plotį.
const props = defineProps<{
  field: "scope" | "need" | "model" | "look" | "steel" | "color" | "height" | "length" | "parts" | "install";
  inline?: boolean;
}>();

const { t } = useI18n();
const {
  config,
  selection,
  fence,
  model,
  hasFence,
  wantsPoles,
  colorsOf,
  heightOf,
  heightValid,
  heightOptions,
  lengthValid,
  needOf,
  setNeed,
  setHeight,
  selectModel,
  selectSteel,
  selectScope,
} = useCalculator();
const { scopes } = useCalculatorSteps();

const GROUPS: { category: CalculatorCategory; title: string }[] = [
  { category: "Tvora", title: "menu.skardines-tvoros" },
  { category: "Tvoralentė", title: "menu.tvoralentes" },
  { category: "Segmentas", title: "menu.segmentines-tvoros" },
];

const groups = computed(() =>
  GROUPS.map((group) => ({
    ...group,
    models: (config.value?.models ?? []).filter((item) => item.category === group.category),
  })).filter((group) => group.models.length),
);

const colors = computed(() => colorsOf(fence.value));
const colorName = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);

const fixedHeights = computed(() => Boolean(model.value?.variants.length));
const heights = computed(() => heightOptions(fence.value));
const heightInvalid = computed(() => !!fence.value.heightText.trim() && !!model.value && !heightValid(fence.value));
const lengthInvalid = computed(() => !!fence.value.lengthText.trim() && !lengthValid(fence.value));

const PARTS = ["full", "poles", "borders", "none"] as const;

const value = (event: Event) => (event.target as HTMLSelectElement | HTMLInputElement).value;

const boxClass = computed(() =>
  props.inline
    ? "inline-block align-baseline max-w-full h-10 mx-1 px-2 border-0 border-b-2 border-red-main bg-red-50 font-bold text-red-main focus:outline-none focus:bg-red-100 hover:cursor-pointer"
    : "h-12 w-full px-3 border-2 border-gray-300 bg-white font-semibold focus:outline-none focus:border-red-main hover:cursor-pointer",
);

const inputClass = (invalid: boolean) =>
  props.inline
    ? `inline-block align-baseline w-20 h-10 mx-1 px-2 border-0 border-b-2 bg-red-50 text-center font-bold focus:outline-none focus:bg-red-100 ${invalid ? "border-black text-black" : "border-red-main text-red-main"}`
    : `h-12 w-full px-3 border-2 bg-white font-semibold focus:outline-none focus:border-red-main ${invalid ? "border-red-main" : "border-gray-300"}`;
</script>

<template>
  <select
    v-if="props.field === 'scope'"
    :class="boxClass"
    :value="selection.scope"
    :aria-label="$t('calc.steps.scope')"
    @change="selectScope(value($event) as CalculatorScope)"
  >
    <option v-for="scope in scopes" :key="scope" :value="scope">{{ $t(`calc.scope.${scope}`) }}</option>
  </select>

  <select
    v-else-if="props.field === 'need'"
    :class="boxClass"
    :value="needOf(fence)"
    :aria-label="$t('calc.steps.need')"
    @change="setNeed(value($event))"
  >
    <option value="fence">{{ $t("calc.need.onlyFence") }}</option>
    <option value="both">{{ $t("calc.need.both") }}</option>
    <option value="gates">{{ $t("calc.need.onlyGates") }}</option>
  </select>

  <select
    v-else-if="props.field === 'model'"
    :class="boxClass"
    :value="fence.modelId"
    :aria-label="$t('calc.steps.model')"
    @change="selectModel(value($event))"
  >
    <option value="" disabled>{{ $t("calc.layout.chooseModel") }}</option>
    <optgroup v-for="group in groups" :key="group.category" :label="$t(group.title)">
      <option v-for="item in group.models" :key="item.id" :value="item.id">
        {{ item.category === "Segmentas" ? $t("calc.model.segment") : item.name }}
      </option>
    </optgroup>
  </select>

  <template v-else-if="props.field === 'look'">
    <select
      v-if="model?.seeThrough.length"
      v-model="fence.seeThrough"
      :class="boxClass"
      :aria-label="$t('calc.seeThrough.title')"
    >
      <option v-for="key in model.seeThrough" :key="key" :value="key">{{ $t(`calc.seeThrough.${key}`) }}</option>
    </select>
    <select
      v-else-if="model?.twoSided"
      :class="boxClass"
      :value="fence.twoSided ? 'two' : 'one'"
      :aria-label="$t('calc.boards.title')"
      @change="fence.twoSided = value($event) === 'two'"
    >
      <option value="one">{{ $t("calc.boards.oneSided") }}</option>
      <option value="two">{{ $t("calc.boards.twoSided") }}</option>
    </select>
  </template>

  <select
    v-else-if="props.field === 'steel'"
    :class="boxClass"
    :value="fence.steel"
    :aria-label="$t('calc.steel.title')"
    @change="selectSteel(value($event) as 'premium' | 'eco')"
  >
    <option value="premium">{{ $t("calc.steel.premium") }}</option>
    <option v-if="model?.eco" value="eco">{{ $t("calc.steel.eco") }}</option>
  </select>

  <select
    v-else-if="props.field === 'color'"
    v-model="fence.color"
    :class="boxClass"
    :disabled="!model"
    :aria-label="$t('calc.color.title')"
  >
    <option v-if="!model" value="">–</option>
    <option v-for="color in colors" :key="color" :value="color">{{ colorName(color) }}</option>
  </select>

  <template v-else-if="props.field === 'height'">
    <!-- segmentams – tik fiksuoti aukščiai; kitoms – įvedamas, su siūlomais standartiniais -->
    <select
      v-if="fixedHeights"
      :class="boxClass"
      :value="heightOf(fence) ?? ''"
      :aria-label="$t('calc.size.height')"
      @change="setHeight(value($event))"
    >
      <option v-for="height in heights" :key="height" :value="height">{{ height }}</option>
    </select>
    <template v-else>
      <input
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="170"
        :list="`calc-heights-${fence.id}`"
        :value="fence.heightText"
        :class="inputClass(heightInvalid)"
        :aria-label="$t(hasFence ? 'calc.size.height' : 'calc.size.gateHeight')"
        @input="setHeight(value($event))"
      />
      <datalist :id="`calc-heights-${fence.id}`">
        <option v-for="height in heights" :key="height" :value="height"></option>
      </datalist>
    </template>
  </template>

  <input
    v-else-if="props.field === 'length'"
    v-model="fence.lengthText"
    type="text"
    inputmode="decimal"
    autocomplete="off"
    placeholder="25,5"
    :class="inputClass(lengthInvalid)"
    :aria-label="$t('calc.size.length')"
  />

  <template v-else-if="props.field === 'parts'">
    <select v-if="hasFence" v-model="fence.parts" :class="boxClass" :aria-label="$t('calc.steps.parts')">
      <option v-for="parts in PARTS" :key="parts" :value="parts">{{ $t(`calc.size.${parts}`) }}</option>
    </select>
    <!-- be tvoros komplektacija lemia tik vartų stulpus -->
    <select
      v-else
      :class="boxClass"
      :value="wantsPoles(fence) ? 'full' : 'none'"
      :aria-label="$t('calc.steps.partsGates')"
      @change="fence.parts = value($event) === 'full' ? 'full' : 'none'"
    >
      <option value="full">{{ $t("calc.size.gatePoles") }}</option>
      <option value="none">{{ $t("calc.size.noGatePoles") }}</option>
    </select>
  </template>

  <select
    v-else
    :class="boxClass"
    :value="selection.installation ? 'yes' : 'no'"
    :aria-label="$t('calc.steps.install')"
    @change="selection.installation = value($event) === 'yes'"
  >
    <option value="yes">{{ $t("calc.install.yes") }}</option>
    <option value="no">{{ $t("calc.install.no") }}</option>
  </select>
</template>
