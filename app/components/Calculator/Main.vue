<script setup lang="ts">
import type { CalculatorScope, EstimateResponse } from "#shared/types/calculator";

// Skaičiuoklė: žingsniai kairėje, santrauka su kaina dešinėje (telefone – juosta apačioje).
// Kaina perskaičiuojama po kiekvieno pasirinkimo (MTSoft, per /api/estimate).
// Viename skaičiavime gali būti kelios tvoros – žingsniai rodomi pasirinktai (aktyviai) tvorai.
const { t, locale } = useI18n();
const {
  config,
  selection,
  fence,
  model,
  result,
  loading,
  missing,
  request,
  hasFence,
  hasGates,
  isBlinds,
  modelOf,
  heightOf,
  heightValid,
  heightOptions,
  lengthValid,
  gateWidthsOf,
  segmentGateWidths,
  segmentWicket,
  hasAutomatics,
  wicketAvailable,
  setHeight,
  selectScope,
  selectGate,
  addFence,
  removeFence,
} = useCalculator();

// Viršuje: skaičiuoti pačiam arba klausti AI (atidaromas MTSoft pokalbių langas – jame atsako AI)
const mode = ref<"self" | "ai">("self");

const openChat = () => window.dispatchEvent(new Event("mtsoft-chat-open"));

const askAi = () => {
  mode.value = "ai";
  openChat();
};

const SCOPES = computed(() =>
  (
    [
      { key: "fence", image: "/images/tvoros/daimond6090.jpg" },
      { key: "both", image: "/images/tvoros/tvora14.jpg" },
      { key: "gates", image: "/images/vartai/stumdomi-vartai.png", contain: true },
      { key: "blinds", image: "/images/zaliuzes/blinds.jpg" },
    ] as { key: CalculatorScope; image: string; contain?: boolean }[]
  ).filter((scope) => scope.key !== "blinds" || config.value?.blinds),
);

const GATE_IMAGES = {
  sliding: "/images/vartai/stumdomi-vartai.png",
  swing: "/images/vartai/varstomi-vartai.png",
} as const;

// Žingsnių numeriai priklauso nuo to, kas skaičiuojama
const steps = computed(() => {
  const list = isBlinds.value
    ? ["scope", "blinds", "install"]
    : ["scope", "model", "size", ...(hasGates.value ? ["gates"] : []), "install"];
  return Object.fromEntries(list.map((key, index) => [key, index + 1])) as Record<string, number>;
});

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);
const meters = (cm: number) => `${number(cm / 100)} m`;

// ---------- tvorų kortelės

const tabName = (index: number) => {
  const item = selection.value.fences[index]!;
  const entry = modelOf(item);
  const label = t(hasFence.value ? "calc.fences.tab" : "calc.fences.gatesTab", { n: index + 1 });
  const name = entry ? (entry.category === "Segmentas" ? t("calc.model.segment") : entry.name) : "";
  return name ? `${label} · ${name}` : label;
};

const canAdd = computed(() => !!config.value && selection.value.fences.length < config.value.maxFences);

// ---------- aukštis ir ilgis

const fixedHeights = computed(() => Boolean(model.value?.variants.length));
const heights = computed(() => heightOptions(fence.value));
const step = computed(() => model.value?.steps[fence.value.seeThrough] ?? 0);

const heightInvalid = computed(() => !!fence.value.heightText.trim() && !!model.value && !heightValid(fence.value));
const lengthInvalid = computed(() => !!fence.value.lengthText.trim() && !lengthValid(fence.value));

// ---------- vartai

const madeTypes = computed(() =>
  (["sliding", "swing"] as const).filter((type) => gateWidthsOf(fence.value, type).length > 0),
);
const hasKit = computed(() => segmentGateWidths(fence.value).length > 0);
const gateWidths = computed(() => gateWidthsOf(fence.value));
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
  <div v-if="config" class="flex flex-col gap-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CalculatorCard
        :title="$t('calc.mode.self')"
        :text="$t('calc.mode.selfText')"
        :selected="mode === 'self'"
        @select="mode = 'self'"
      />
      <CalculatorCard
        :title="$t('calc.mode.ai')"
        :text="$t('calc.mode.aiText')"
        :selected="mode === 'ai'"
        @select="askAi"
      />
    </div>

    <div v-if="mode === 'ai'" class="flex flex-col gap-6 max-w-200 p-6 sm:p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 class="text-2xl font-bold">{{ $t("calc.mode.aiTitle") }}</h2>
      <p>{{ $t("calc.mode.aiBody") }}</p>
      <BaseButton width="w-full sm:w-60" @click="openChat">{{ $t("calc.mode.open") }}</BaseButton>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start pb-16 lg:pb-0">
    <div class="flex flex-col gap-16">
      <p class="text-lg -mb-6">{{ $t("calc.intro") }}</p>

      <CalculatorStep :number="steps.scope!" :title="$t('calc.steps.scope')">
        <div class="grid grid-cols-2 gap-2 sm:gap-4" :class="SCOPES.length > 3 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'">
          <CalculatorCard
            v-for="scope in SCOPES"
            :key="scope.key"
            compact
            :title="$t(`calc.scope.${scope.key}`)"
            :text="$t(`calc.scope.${scope.key}Text`)"
            :image="scope.image"
            :contain="scope.contain"
            :selected="selection.scope === scope.key"
            @select="selectScope(scope.key)"
          />
        </div>
      </CalculatorStep>

      <template v-if="isBlinds">
        <CalculatorStep :number="steps.blinds!" :title="$t('calc.steps.blinds')">
          <CalculatorBlinds />
        </CalculatorStep>
      </template>

      <template v-else>
        <!-- kelios tvoros: žemiau esantys žingsniai – pasirinktai tvorai -->
        <div class="flex flex-col gap-3 -mb-6">
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
                class="h-12 px-4 font-bold hover:cursor-pointer"
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
              class="h-12 px-4 border-2 border-dashed border-gray-400 font-bold text-gray-700 hover:border-red-main hover:text-red-main hover:cursor-pointer"
              @click="addFence"
            >
              + {{ $t(hasFence ? "calc.fences.add" : "calc.fences.addGates") }}
            </button>
          </div>
          <p v-if="hasFence" class="text-sm text-gray-600">{{ $t("calc.fences.hint") }}</p>
        </div>

        <CalculatorStep
          :number="steps.model!"
          :title="$t(hasFence ? 'calc.steps.model' : 'calc.steps.modelGates')"
          :hint="$t(hasFence ? 'calc.model.hint' : 'calc.model.hintGates')"
        >
          <CalculatorModel :key="fence.id" />
        </CalculatorStep>

        <CalculatorStep :number="steps.size!" :title="$t(hasFence ? 'calc.steps.size' : 'calc.steps.sizeGates')">
          <div class="flex flex-col gap-3">
            <template v-if="fixedHeights">
              <h3 class="text-xl font-medium">{{ $t("calc.size.segmentHeights") }}</h3>
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
              <label :for="`calc-height-${fence.id}`" class="text-xl font-medium">
                {{ $t(hasFence ? "calc.size.height" : "calc.size.gateHeight") }}
              </label>
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
              <p class="text-sm" :class="heightInvalid ? 'text-red-main' : 'text-gray-600'">
                {{ $t("calc.size.heightHint", config.heightRange) }}
              </p>
              <template v-if="heights.length">
                <p class="text-sm text-gray-600">{{ $t("calc.size.suggested", { step: number(step) }) }}</p>
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
          </div>

          <div v-if="hasFence" class="flex flex-col gap-3">
            <label :for="`calc-length-${fence.id}`" class="text-xl font-medium">{{ $t("calc.size.length") }}</label>
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
              {{ $t("calc.size.lengthHint", config.lengthRange) }}
            </p>
          </div>

          <div v-if="hasFence" class="flex flex-col gap-4">
            <h3 class="text-xl font-medium">{{ $t("calc.size.parts") }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CalculatorCard
                v-for="parts in ['full', 'poles', 'none'] as const"
                :key="parts"
                :title="$t(`calc.size.${parts}`)"
                :text="$t(`calc.size.${parts}Text`)"
                :selected="fence.parts === parts"
                @select="fence.parts = parts"
              />
            </div>
          </div>
        </CalculatorStep>

        <CalculatorStep v-if="hasGates" :number="steps.gates!" :title="$t('calc.steps.gates')">
          <div class="flex flex-col gap-6">
            <h3 class="text-xl font-medium">{{ $t("calc.gates.gate") }}</h3>

            <!-- gaminami pagal užsakymą ir gatavi komplektai – aiškiai atskirti -->
            <div v-if="madeTypes.length" class="flex flex-col gap-3">
              <div>
                <p class="font-bold">{{ $t("calc.gates.made") }}</p>
                <p class="text-sm text-gray-600">{{ $t("calc.gates.madeText") }}</p>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <CalculatorCard
                  v-for="type in madeTypes"
                  :key="type"
                  :title="$t(`calc.gates.${type}`)"
                  :image="GATE_IMAGES[type]"
                  contain
                  :selected="fence.gateType === type"
                  @select="selectGate(type)"
                />
              </div>
            </div>

            <div v-if="hasKit" class="flex flex-col gap-3">
              <div>
                <p class="font-bold">{{ $t("calc.gates.kit") }}</p>
                <p class="text-sm text-gray-600">{{ $t("calc.gates.kitText") }}</p>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <CalculatorCard
                  :title="$t('calc.gates.segment')"
                  :image="model?.images[0]?.url"
                  :placeholder="!model?.images.length"
                  :selected="fence.gateType === 'segment'"
                  @select="selectGate('segment')"
                />
              </div>
            </div>

            <CalculatorChip class="self-start" :selected="fence.gateType === 'none'" @select="selectGate('none')">
              {{ $t("calc.gates.none") }}
            </CalculatorChip>
          </div>

          <template v-if="fence.gateType !== 'none'">
            <div class="flex flex-col gap-4">
              <h3 class="text-xl font-medium">{{ $t("calc.gates.width") }}</h3>
              <div class="flex flex-wrap gap-3">
                <CalculatorChip
                  v-for="width in gateWidths"
                  :key="width"
                  :selected="fence.gateWidth === width"
                  @select="fence.gateWidth = width"
                >
                  {{ meters(width) }}
                </CalculatorChip>
              </div>
            </div>

            <div class="flex flex-wrap gap-x-12 gap-y-6">
              <!-- gatavam komplektui – tik jei kainyne jam yra automatika -->
              <div v-if="hasAutomatics(fence)" class="flex flex-col gap-4">
                <h3 class="text-xl font-medium">{{ $t("calc.gates.automatics") }}</h3>
                <div class="flex flex-wrap gap-3">
                  <CalculatorChip :selected="fence.automatics" @select="fence.automatics = true">
                    {{ $t("calc.gates.withAutomatics") }}
                  </CalculatorChip>
                  <CalculatorChip :selected="!fence.automatics" @select="fence.automatics = false">
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
                    :selected="fence.gateCount === count"
                    @select="fence.gateCount = count"
                  >
                    {{ count }}
                  </CalculatorChip>
                </div>
              </div>
            </div>
          </template>

          <div v-if="config.gates.wicket || segmentWicket(fence)" class="flex flex-col gap-4">
            <h3 class="text-xl font-medium">{{ $t("calc.gates.wickets") }}</h3>

            <div v-if="config.gates.wicket && segmentWicket(fence)" class="flex flex-col gap-2">
              <p class="text-sm font-medium">{{ $t("calc.gates.wicketType") }}</p>
              <div class="flex flex-wrap gap-3">
                <CalculatorChip :selected="fence.wicketType === 'made'" @select="fence.wicketType = 'made'">
                  {{ $t("calc.gates.wicketMade") }}
                </CalculatorChip>
                <CalculatorChip :selected="fence.wicketType === 'segment'" @select="fence.wicketType = 'segment'">
                  {{ $t("calc.gates.wicketKit") }}
                </CalculatorChip>
              </div>
            </div>

            <div v-if="wicketAvailable(fence)" class="flex flex-wrap gap-3">
              <CalculatorChip
                v-for="count in counts(config.gates.maxWickets, 0)"
                :key="count"
                :selected="fence.wickets === count"
                @select="fence.wickets = count"
              >
                {{ count === 0 ? $t("calc.gates.none") : count }}
              </CalculatorChip>
            </div>
            <p class="text-sm text-gray-600">{{ $t("calc.gates.wicketsHint") }}</p>
          </div>
        </CalculatorStep>
      </template>

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

    <CalculatorSummary class="lg:sticky lg:top-24" />

    <!-- telefone – juosta apačioje su kaina ir nuoroda į santrauką -->
    <a
      href="#calc-summary"
      class="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-4 pl-20 pr-4 py-3 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
    >
      <span class="font-bold" :class="loading ? 'opacity-40' : ''">{{ barText }}</span>
      <span class="shrink-0 px-4 py-2 bg-red-main text-white font-bold">{{ $t("calc.summary.show") }}</span>
    </a>
    </div>
  </div>
</template>
