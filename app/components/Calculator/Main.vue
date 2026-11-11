<script setup lang="ts">
import type { CalculatorScope, EstimateResponse } from "#shared/types/calculator";

// Skaičiuoklė: žingsniai kairėje, santrauka su kaina dešinėje (telefone – juosta apačioje).
// Kaina perskaičiuojama po kiekvieno pasirinkimo (MTSoft, per /api/estimate).
const { t, locale } = useI18n();
const {
  config,
  selection,
  model,
  result,
  loading,
  missing,
  request,
  hasFence,
  hasGates,
  selectScope,
  selectGate,
} = useCalculator();

const SCOPES: { key: CalculatorScope; image: string; contain?: boolean }[] = [
  { key: "fence", image: "/images/tvoros/daimond6090.jpg" },
  { key: "both", image: "/images/tvoros/tvora14.jpg" },
  { key: "gates", image: "/images/vartai/stumdomi-vartai.png", contain: true },
];

const GATE_IMAGES = {
  sliding: "/images/vartai/stumdomi-vartai.png",
  swing: "/images/vartai/varstomi-vartai.png",
} as const;

// Žingsnių numeriai priklauso nuo to, ar yra vartų žingsnis
const steps = computed(() => {
  const list = ["scope", "model", "size", ...(hasGates.value ? ["gates"] : []), "install"];
  return Object.fromEntries(list.map((key, index) => [key, index + 1])) as Record<string, number>;
});

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);
const meters = (cm: number) => `${number(cm / 100)} m`;

// ---------- aukštis ir ilgis

const heights = computed(() =>
  model.value?.variants.length ? model.value.variants.map((variant) => variant.height) : (config.value?.heights ?? []),
);
const fixedHeights = computed(() => Boolean(model.value?.variants.length));

const selectHeight = (height: number) => {
  selection.value.height = height;
  selection.value.customHeight = false;
};

const customHeight = () => {
  selection.value.customHeight = true;
};

const onCustomHeight = (event: Event) => {
  const value = Math.round(Number((event.target as HTMLInputElement).value));
  selection.value.height = Number.isFinite(value) && value > 0 ? value : null;
};

// ilgis – tekstinis laukas: priimamas ir kablelis, ir taškas
const lengthText = ref(selection.value.length ? String(selection.value.length).replace(".", ",") : "");

const onLength = (event: Event) => {
  lengthText.value = (event.target as HTMLInputElement).value;
  const value = Number(lengthText.value.replace(",", ".").trim());
  selection.value.length = lengthText.value.trim() && Number.isFinite(value) && value > 0 ? value : null;
};

const lengthInvalid = computed(
  () =>
    !!config.value &&
    selection.value.length !== null &&
    (selection.value.length < config.value.lengthRange.min || selection.value.length > config.value.lengthRange.max),
);

const heightInvalid = computed(
  () =>
    !!config.value &&
    selection.value.customHeight &&
    selection.value.height !== null &&
    (selection.value.height < config.value.heightRange.min || selection.value.height > config.value.heightRange.max),
);

// ---------- vartai

const gateTypes = computed(() =>
  (["sliding", "swing"] as const).filter((type) => (config.value?.gates[type].length ?? 0) > 0),
);
const gateWidths = computed(() =>
  selection.value.gateType === "none" ? [] : (config.value?.gates[selection.value.gateType] ?? []),
);
const counts = (max: number, from = 1) => Array.from({ length: max - from + 1 }, (_, index) => index + from);

// ---------- kaina

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

const barText = computed(() => {
  if (missing.value) return t(`calc.summary.${missing.value}`);
  if (result.value?.status === "ok") {
    return t("calc.summary.range", {
      from: number(result.value.priceFrom, 0),
      to: number(result.value.priceTo, 0),
    });
  }
  if (loading.value || !result.value) return t("calc.summary.calculating");
  return t("calc.summary.show");
});
</script>

<template>
  <div v-if="config" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start pb-16 lg:pb-0">
    <div class="flex flex-col gap-16">
      <p class="text-lg -mb-6">{{ $t("calc.intro") }}</p>

      <CalculatorStep :number="steps.scope!" :title="$t('calc.steps.scope')">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalculatorCard
            v-for="scope in SCOPES"
            :key="scope.key"
            :title="$t(`calc.scope.${scope.key}`)"
            :text="$t(`calc.scope.${scope.key}Text`)"
            :image="scope.image"
            :contain="scope.contain"
            :selected="selection.scope === scope.key"
            @select="selectScope(scope.key)"
          />
        </div>
      </CalculatorStep>

      <CalculatorStep
        :number="steps.model!"
        :title="$t(hasFence ? 'calc.steps.model' : 'calc.steps.modelGates')"
        :hint="$t(hasFence ? 'calc.model.hint' : 'calc.model.hintGates')"
      >
        <CalculatorModel />
      </CalculatorStep>

      <CalculatorStep :number="steps.size!" :title="$t(hasFence ? 'calc.steps.size' : 'calc.steps.sizeGates')">
        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-medium">{{ $t("calc.size.height") }}</h3>
          <div class="flex flex-wrap gap-3">
            <CalculatorChip
              v-for="height in heights"
              :key="height"
              :selected="!selection.customHeight && selection.height === height"
              @select="selectHeight(height)"
            >
              {{ meters(height) }}
            </CalculatorChip>
            <CalculatorChip v-if="!fixedHeights" :selected="selection.customHeight" @select="customHeight">
              {{ $t("calc.size.other") }}
            </CalculatorChip>
          </div>
          <div v-if="selection.customHeight && !fixedHeights" class="flex flex-col gap-1 w-full sm:w-72">
            <label for="calc-height" class="text-sm font-medium">{{ $t("calc.size.customHeight") }}</label>
            <input
              id="calc-height"
              type="number"
              inputmode="numeric"
              :min="config.heightRange.min"
              :max="config.heightRange.max"
              :value="selection.height ?? ''"
              class="h-12 px-4 border-2 bg-white focus:outline-none focus:border-red-main"
              :class="heightInvalid ? 'border-red-main' : 'border-gray-300'"
              @input="onCustomHeight"
            />
            <p class="text-sm" :class="heightInvalid ? 'text-red-main' : 'text-gray-600'">
              {{ $t("calc.size.heightHint", config.heightRange) }}
            </p>
          </div>
        </div>

        <div v-if="hasFence" class="flex flex-col gap-2 w-full sm:w-72">
          <label for="calc-length" class="text-xl font-medium">{{ $t("calc.size.length") }}</label>
          <input
            id="calc-length"
            type="text"
            inputmode="decimal"
            autocomplete="off"
            :value="lengthText"
            placeholder="25,5"
            class="h-12 px-4 border-2 bg-white text-lg focus:outline-none focus:border-red-main"
            :class="lengthInvalid ? 'border-red-main' : 'border-gray-300'"
            @input="onLength"
          />
        </div>
        <p v-if="hasFence" class="text-sm -mt-4" :class="lengthInvalid ? 'text-red-main' : 'text-gray-600'">
          {{ $t("calc.size.lengthHint", config.lengthRange) }}
        </p>

        <div v-if="hasFence" class="flex flex-col gap-4">
          <h3 class="text-xl font-medium">{{ $t("calc.size.parts") }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalculatorCard
              v-for="parts in ['full', 'poles', 'none'] as const"
              :key="parts"
              :title="$t(`calc.size.${parts}`)"
              :text="$t(`calc.size.${parts}Text`)"
              :selected="selection.parts === parts"
              @select="selection.parts = parts"
            />
          </div>
        </div>
      </CalculatorStep>

      <CalculatorStep v-if="hasGates" :number="steps.gates!" :title="$t('calc.steps.gates')">
        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-medium">{{ $t("calc.gates.gate") }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <CalculatorCard
              v-for="type in gateTypes"
              :key="type"
              :title="$t(`calc.gates.${type}`)"
              :image="GATE_IMAGES[type]"
              contain
              :selected="selection.gateType === type"
              @select="selectGate(type)"
            />
            <CalculatorCard
              :title="$t('calc.gates.none')"
              placeholder
              :selected="selection.gateType === 'none'"
              @select="selectGate('none')"
            />
          </div>
        </div>

        <template v-if="selection.gateType !== 'none'">
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-medium">{{ $t("calc.gates.width") }}</h3>
            <div class="flex flex-wrap gap-3">
              <CalculatorChip
                v-for="width in gateWidths"
                :key="width"
                :selected="selection.gateWidth === width"
                @select="selection.gateWidth = width"
              >
                {{ meters(width) }}
              </CalculatorChip>
            </div>
          </div>

          <div class="flex flex-wrap gap-x-12 gap-y-6">
            <div class="flex flex-col gap-4">
              <h3 class="text-xl font-medium">{{ $t("calc.gates.automatics") }}</h3>
              <div class="flex flex-wrap gap-3">
                <CalculatorChip :selected="selection.automatics" @select="selection.automatics = true">
                  {{ $t("calc.gates.withAutomatics") }}
                </CalculatorChip>
                <CalculatorChip :selected="!selection.automatics" @select="selection.automatics = false">
                  {{ $t("calc.gates.withoutAutomatics") }}
                </CalculatorChip>
              </div>
            </div>

            <div v-if="config.gates.maxGates > 1" class="flex flex-col gap-4">
              <h3 class="text-xl font-medium">{{ $t("calc.gates.count") }}</h3>
              <div class="flex flex-wrap gap-3">
                <CalculatorChip
                  v-for="count in counts(config.gates.maxGates)"
                  :key="count"
                  :selected="selection.gateCount === count"
                  @select="selection.gateCount = count"
                >
                  {{ count }}
                </CalculatorChip>
              </div>
            </div>
          </div>
        </template>

        <div v-if="config.gates.wicket" class="flex flex-col gap-4">
          <h3 class="text-xl font-medium">{{ $t("calc.gates.wickets") }}</h3>
          <div class="flex flex-wrap gap-3">
            <CalculatorChip
              v-for="count in counts(config.gates.maxWickets, 0)"
              :key="count"
              :selected="selection.wickets === count"
              @select="selection.wickets = count"
            >
              {{ count === 0 ? $t("calc.gates.none") : count }}
            </CalculatorChip>
          </div>
          <p class="text-sm text-gray-600">{{ $t("calc.gates.wicketsHint") }}</p>
        </div>
      </CalculatorStep>

      <CalculatorStep :number="steps.install!" :title="$t('calc.steps.install')">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorCard
            :title="$t('calc.install.yes')"
            :text="$t('calc.install.yesText')"
            :selected="selection.installation"
            @select="selection.installation = true"
          />
          <CalculatorCard
            :title="$t('calc.install.no')"
            :text="$t('calc.install.noText')"
            :selected="!selection.installation"
            @select="selection.installation = false"
          />
        </div>
      </CalculatorStep>
    </div>

    <CalculatorSummary class="lg:sticky lg:top-6" />

    <!-- telefone – juosta apačioje su kaina ir nuoroda į santrauką -->
    <a
      href="#calc-summary"
      class="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
    >
      <span class="font-bold" :class="loading ? 'opacity-40' : ''">{{ barText }}</span>
      <span class="shrink-0 px-4 py-2 bg-red-main text-white font-bold">{{ $t("calc.summary.show") }}</span>
    </a>
  </div>
</template>
