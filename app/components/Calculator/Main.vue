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
  wantsPoles,
  isBlinds,
  modelOf,
  heightOf,
  heightValid,
  heightOptions,
  lengthValid,
  setHeight,
  selectScope,
  toggleNeed,
  addFence,
  removeFence,
} = useCalculator();

// Viršuje: skaičiuoti pačiam arba klausti AI (atidaromas MTSoft pokalbių langas – jame atsako AI)
const mode = ref<"self" | "ai">("self");

// „Klausti AI“: vietoje skaičiuoklės – didelis pokalbio langas. Tai tas pats MTSoft pokalbių langas (ta pati užklausa
// ir istorija), tik įdėtas į šį bloką; grįžus prie skaičiuoklės jis vėl tampa plaukiojančiu mygtuku.
const chatBox = ref<HTMLElement | null>(null);
let chatTimer: ReturnType<typeof setTimeout> | undefined;

const embedChat = (tries = 0) => {
  clearTimeout(chatTimer);
  const target = chatBox.value;
  if (mode.value !== "ai" || !target) return;
  // pokalbių langas įkeliamas asinchroniškai – palaukiama, kol atsiras
  if (!(window as unknown as { __mtsoftChatLoaded?: boolean }).__mtsoftChatLoaded) {
    if (tries < 50) chatTimer = setTimeout(() => embedChat(tries + 1), 200);
    return;
  }
  window.dispatchEvent(new CustomEvent("mtsoft-chat-embed", { detail: { target } }));
  // senesnė lango versija įdėjimo nemoka – tada tiesiog atidaromas plaukiojantis langas
  chatTimer = setTimeout(() => {
    if (!target.childElementCount) window.dispatchEvent(new Event("mtsoft-chat-open"));
  }, 300);
};

const releaseChat = () => {
  clearTimeout(chatTimer);
  if (import.meta.client) window.dispatchEvent(new Event("mtsoft-chat-unembed"));
};

const askAi = async () => {
  mode.value = "ai";
  await nextTick();
  embedChat();
};

const calculate = () => {
  if (mode.value === "ai") releaseChat();
  mode.value = "self";
};

// Tvora ir vartai skaičiuojami kartu (ko reikia – kitame žingsnyje); atskirai – lauko žaliuzės
const SCOPES = computed(() =>
  (
    [
      { key: "both", image: "/images/tvoros/tvora14.jpg" },
      { key: "blinds", image: "/images/zaliuzes/blinds.jpg" },
    ] as { key: CalculatorScope; image: string }[]
  ).filter((scope) => scope.key !== "blinds" || config.value?.blinds),
);

// „Ko reikia“ (redaguojamai tvorai): tvoros, vartų ar abiejų
const NEEDS = computed(() => [
  { key: "fence" as const, checked: !fence.value.noFence },
  { key: "gates" as const, checked: fence.value.needGates },
]);

// Pramatomumas renkamas tik skardinėms tvoroms, montavimo būdas – tvoralentėms; segmentams šio žingsnio nėra
const lookStep = computed(() => !model.value || model.value.seeThrough.length > 0 || model.value.twoSided);

// Žingsniai iš eilės; numeriai priklauso nuo to, kas skaičiuojama
const steps = computed(() => {
  const list = [
    ...(SCOPES.value.length > 1 ? ["scope"] : []),
    ...(isBlinds.value
      ? ["blinds"]
      : ["need", "model", ...(lookStep.value ? ["look"] : []), "color", "size", ...(fence.value.needGates ? ["gates"] : []), "parts"]),
    "install",
  ];
  return Object.fromEntries(list.map((key, index) => [key, index + 1])) as Record<string, number>;
});

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);

// ---------- tvorų kortelės

const tabName = (index: number) => {
  const item = selection.value.fences[index]!;
  const entry = modelOf(item);
  const label = t(item.noFence ? "calc.fences.gatesTab" : "calc.fences.tab", { n: index + 1 });
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

// Pamatėlis (bortelis) tvorą pakelia nuo žemės apie 12 cm
const BORDER_HEIGHT = 12;
const PARTS = ["full", "poles", "borders", "none"] as const;
const withBorder = computed(() => fence.value.parts === "full" || fence.value.parts === "borders");

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

onBeforeUnmount(() => {
  clearTimeout(timer);
  // langas grąžinamas į puslapį, kad nedingtų kartu su šiuo bloku
  if (mode.value === "ai") releaseChat();
});

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
        @select="calculate"
      />
      <CalculatorCard
        :title="$t('calc.mode.ai')"
        :text="$t('calc.mode.aiText')"
        :selected="mode === 'ai'"
        @select="askAi"
      />
    </div>

    <div v-if="mode === 'ai'" class="flex flex-col gap-4">
      <p class="text-gray-600">{{ $t("calc.mode.aiBody") }}</p>
      <div ref="chatBox" class="w-full h-[70vh] min-h-120 max-h-200"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start pb-16 lg:pb-0">
      <div class="flex flex-col gap-8">
        <CalculatorStep v-if="SCOPES.length > 1" :number="steps.scope!" :title="$t('calc.steps.scope')">
          <div class="grid grid-cols-2 gap-2 sm:gap-4">
            <CalculatorCard
              v-for="scope in SCOPES"
              :key="scope.key"
              compact
              wide
              :title="$t(`calc.scope.${scope.key}`)"
              :text="$t(`calc.scope.${scope.key}Text`)"
              :image="scope.image"
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

        <!-- viena tvora (užpildas, aukštis, ilgis, vartai) – bendrame rėme; tvorų gali būti kelios -->
        <div v-else class="flex flex-col gap-6 p-3 sm:p-5 rounded-lg border-2 border-gray-300 bg-gray-100">
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

          <CalculatorStep :number="steps.need!" :title="$t('calc.steps.need')" :hint="$t('calc.need.hint')">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </CalculatorStep>

          <CalculatorStep
            :number="steps.model!"
            :title="$t(hasFence ? 'calc.steps.model' : 'calc.steps.modelGates')"
            :hint="$t(fence.needGates ? 'calc.model.hintGates' : 'calc.model.hint')"
          >
            <CalculatorModel :key="fence.id" section="model" />
          </CalculatorStep>

          <CalculatorStep
            v-if="lookStep"
            :number="steps.look!"
            :title="$t(model?.twoSided ? 'calc.boards.title' : 'calc.seeThrough.title')"
          >
            <CalculatorModel :key="fence.id" section="look" />
          </CalculatorStep>

          <CalculatorStep :number="steps.color!" :title="$t(!model || model.steel ? 'calc.steps.color' : 'calc.color.title')">
            <CalculatorModel :key="fence.id" section="color" />
          </CalculatorStep>

          <CalculatorStep :number="steps.size!" :title="$t(hasFence ? 'calc.steps.size' : 'calc.steps.sizeGates')">
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
                  {{ $t("calc.size.lengthHint", config.lengthRange) }}
                </p>
              </div>
            </template>
          </CalculatorStep>

          <CalculatorStep v-if="fence.needGates" :number="steps.gates!" :title="$t('calc.steps.gates')" :hint="$t('calc.gates.hint')">
            <CalculatorGates :key="fence.id" />
          </CalculatorStep>

          <CalculatorStep :number="steps.parts!" :title="$t(hasFence ? 'calc.steps.parts' : 'calc.steps.partsGates')">
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
          </CalculatorStep>
        </div>

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
