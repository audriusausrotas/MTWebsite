<script setup lang="ts">
import type { StepKey } from "~/composables/useCalculatorSteps";

// Vieno skaičiuoklės žingsnio turinys (redaguojamai tvorai). Tas pats turinys naudojamas visuose išdėstymo
// variantuose (Layout*.vue) – skiriasi tik tai, kaip žingsniai sudėti puslapyje.
const props = defineProps<{ step: StepKey }>();

const { locale } = useI18n();
const {
  config,
  selection,
  fence,
  model,
  hasFence,
  wantsPoles,
  heightOf,
  heightValid,
  heightOptions,
  lengthValid,
  setHeight,
  selectScope,
  toggleNeed,
} = useCalculator();
const { scopes } = useCalculatorSteps();

const SCOPE_IMAGES: Record<string, string> = {
  both: "/images/tvoros/tvora14.jpg",
  blinds: "/images/zaliuzes/blinds.jpg",
};

// „Ko reikia“ (redaguojamai tvorai): tvoros, vartų ar abiejų
const NEEDS = computed(() => [
  { key: "fence" as const, checked: !fence.value.noFence },
  { key: "gates" as const, checked: fence.value.needGates },
]);

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);

// ---------- aukštis ir ilgis

const fixedHeights = computed(() => Boolean(model.value?.variants.length));
const heights = computed(() => heightOptions(fence.value));
const pitch = computed(() => model.value?.steps[fence.value.seeThrough] ?? 0);

const heightInvalid = computed(() => !!fence.value.heightText.trim() && !!model.value && !heightValid(fence.value));
const lengthInvalid = computed(() => !!fence.value.lengthText.trim() && !lengthValid(fence.value));

// Pamatėlis (bortelis) tvorą pakelia nuo žemės apie 12 cm
const BORDER_HEIGHT = 12;
const PARTS = ["full", "poles", "borders", "none"] as const;
const withBorder = computed(() => fence.value.parts === "full" || fence.value.parts === "borders");
</script>

<template>
  <!-- ---------- ką skaičiuojame ---------- -->
  <div v-if="props.step === 'scope'" class="grid grid-cols-2 gap-2 sm:gap-4">
    <CalculatorCard
      v-for="scope in scopes"
      :key="scope"
      compact
      wide
      :title="$t(`calc.scope.${scope}`)"
      :text="$t(`calc.scope.${scope}Text`)"
      :image="SCOPE_IMAGES[scope]"
      :selected="selection.scope === scope"
      @select="selectScope(scope)"
    />
  </div>

  <CalculatorBlinds v-else-if="props.step === 'blinds'" />

  <!-- ---------- ko reikia ---------- -->
  <div v-else-if="props.step === 'need'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <button
      v-for="need in NEEDS"
      :key="need.key"
      type="button"
      role="checkbox"
      :aria-checked="need.checked"
      class="flex items-center gap-4 p-4 rounded-lg border-2 bg-white text-left transition-all hover:cursor-pointer"
      :class="need.checked ? 'border-red-main shadow-lg' : 'border-gray-200 hover:border-gray-400'"
      @click="toggleNeed(need.key)"
    >
      <span
        class="flex items-center justify-center w-7 h-7 shrink-0 border-2"
        :class="need.checked ? 'border-red-main bg-red-main text-white' : 'border-gray-400 bg-white'"
      >
        <svg v-if="need.checked" class="w-4 h-4 fill-none stroke-current stroke-3" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 5 5 9-10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="flex flex-col gap-1">
        <span class="text-lg font-bold" :class="need.checked ? 'text-red-main' : ''">{{ $t(`calc.need.${need.key}`) }}</span>
        <span class="text-sm text-gray-600">{{ $t(`calc.need.${need.key}Text`) }}</span>
      </span>
    </button>
  </div>

  <!-- ---------- modelis, pramatomumas, skarda ir spalva ---------- -->
  <CalculatorModel
    v-else-if="props.step === 'model' || props.step === 'look' || props.step === 'color'"
    :section="props.step"
  />

  <!-- ---------- aukštis ir ilgis ---------- -->
  <template v-else-if="props.step === 'size'">
    <p v-if="!model" class="text-gray-600">{{ $t("calc.model.first") }}</p>

    <template v-else>
      <div class="flex flex-col gap-3">
        <template v-if="fixedHeights">
          <CalculatorHeading>{{ $t("calc.size.segmentHeights") }}</CalculatorHeading>
          <div class="flex flex-wrap gap-3">
            <CalculatorChip
              v-for="height in heights"
              :key="height"
              :selected="heightOf(fence) === height"
              @select="setHeight(String(height))"
            >
              {{ height }}
            </CalculatorChip>
          </div>
        </template>

        <template v-else>
          <CalculatorHeading :for="`calc-height-${fence.id}`">
            {{ $t(hasFence ? "calc.size.height" : "calc.size.gateHeight") }}
          </CalculatorHeading>
          <input
            :id="`calc-height-${fence.id}`"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            :value="fence.heightText"
            placeholder="170"
            class="h-12 w-full sm:w-72 px-4 border-2 bg-white text-lg focus:outline-none focus:border-red-main"
            :class="heightInvalid ? 'border-red-main' : 'border-gray-300'"
            @input="setHeight(($event.target as HTMLInputElement).value)"
          />
          <p v-if="heightInvalid" class="text-sm text-red-main">
            {{ $t("calc.size.heightHint", config!.heightRange) }}
          </p>
          <template v-if="heights.length">
            <p class="text-sm text-gray-600">{{ $t("calc.size.suggested", { step: number(pitch) }) }}</p>
            <div class="flex flex-wrap gap-2">
              <CalculatorChip
                v-for="height in heights"
                :key="height"
                :selected="heightOf(fence) === height"
                @select="setHeight(String(height))"
              >
                {{ height }}
              </CalculatorChip>
            </div>
          </template>
        </template>

        <!-- įvedamas aukštis – be pamatėlio; su pamatėliu tvora nuo žemės aukštesnė -->
        <div
          v-if="hasFence && heightValid(fence)"
          class="flex flex-col gap-1 self-start px-4 py-3 border-l-4 border-red-main bg-gray-100"
        >
          <p>
            {{ $t("calc.size.withoutBorder") }}
            <span class="font-bold whitespace-nowrap">{{ heightOf(fence) }} cm</span>
          </p>
          <p v-if="withBorder">
            {{ $t("calc.size.withBorder") }}
            <span class="font-bold whitespace-nowrap">~{{ heightOf(fence)! + BORDER_HEIGHT }} cm</span>
          </p>
        </div>
      </div>

      <div v-if="hasFence" class="flex flex-col gap-3">
        <CalculatorHeading :for="`calc-length-${fence.id}`">{{ $t("calc.size.length") }}</CalculatorHeading>
        <input
          :id="`calc-length-${fence.id}`"
          v-model="fence.lengthText"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          placeholder="25,5"
          class="h-12 w-full sm:w-72 px-4 border-2 bg-white text-lg focus:outline-none focus:border-red-main"
          :class="lengthInvalid ? 'border-red-main' : 'border-gray-300'"
        />
        <p class="text-sm" :class="lengthInvalid ? 'text-red-main' : 'text-gray-600'">
          {{ $t("calc.size.lengthHint", config!.lengthRange) }}
        </p>
      </div>
    </template>
  </template>

  <!-- ---------- vartai ir varteliai ---------- -->
  <CalculatorGates v-else-if="props.step === 'gates'" />

  <!-- ---------- stulpai ir pamatėliai ---------- -->
  <template v-else-if="props.step === 'parts'">
    <div v-if="hasFence" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <CalculatorCard
        v-for="parts in PARTS"
        :key="parts"
        :title="$t(`calc.size.${parts}`)"
        :text="$t(`calc.size.${parts}Text`)"
        :selected="fence.parts === parts"
        @select="fence.parts = parts"
      />
    </div>
    <!-- be tvoros komplektacija lemia tik vartų stulpus -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CalculatorCard
        :title="$t('calc.size.gatePoles')"
        :text="$t('calc.size.gatePolesText')"
        :selected="wantsPoles(fence)"
        @select="fence.parts = 'full'"
      />
      <CalculatorCard
        :title="$t('calc.size.noGatePoles')"
        :text="$t('calc.size.noGatePolesText')"
        :selected="!wantsPoles(fence)"
        @select="fence.parts = 'none'"
      />
    </div>
  </template>

  <!-- ---------- montavimas ---------- -->
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
</template>
