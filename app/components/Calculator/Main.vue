<script setup lang="ts">
import type { EstimateResponse } from "#shared/types/calculator";

// Skaičiuoklė: pasirinkimai kairėje, santrauka su kaina dešinėje (telefone – juosta apačioje).
// Kaina perskaičiuojama po kiekvieno pasirinkimo (MTSoft, per /api/estimate).
// Pasirinkimų išdėstymas – vienas iš kelių variantų (Layout*.vue); žingsniai ir jų turinys visuose tie patys
// (useCalculatorSteps, Section.vue), tad skaičiuojama vienodai.
const { t, locale } = useI18n();
const { config, result, loading, missing, request } = useCalculator();

// Viršuje: skaičiuoti pačiam arba klausti AI
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

// ---------- išdėstymo variantas (bandymui: kuris patogiausias). Įsimenamas naršyklėje; galima nurodyti ir ?v=2

const LAYOUTS = [
  "steps",
  "accordion",
  "modal",
  "wizard",
  "sidebar",
  "visual",
  "chat",
  "form",
  "wide",
  "sentence",
] as const;
type Layout = (typeof LAYOUTS)[number];

// platus išdėstymas užima visą puslapio plotį: santrauka – po pasirinkimais, kaina – juostoje apačioje
const wide = computed(() => layout.value === "wide");
const LAYOUT_KEY = "calcLayout";

const layout = useState<Layout>("calculatorLayout", () => "steps");
const route = useRoute();

onMounted(() => {
  const fromQuery = LAYOUTS[Number(route.query.v) - 1];
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(LAYOUT_KEY);
  } catch {
    // saugykla neprieinama – lieka numatytasis
  }
  const initial = fromQuery ?? (LAYOUTS as readonly string[]).find((item) => item === saved);
  if (initial) layout.value = initial as Layout;

  watch(layout, (value) => {
    try {
      localStorage.setItem(LAYOUT_KEY, value);
    } catch {
      // neįsimenama
    }
  });
});

// ---------- kaina

const number = (value: number, digits = 2) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: digits }).format(value);

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
  <div v-if="config" class="flex flex-col gap-8">
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

    <template v-else>
      <!-- išdėstymo variantų perjungimas (bandymui) -->
      <label class="flex flex-wrap items-center gap-3 self-start px-4 py-3 border-2 border-dashed border-gray-400 bg-gray-50">
        <span class="font-bold">{{ $t("calc.layout.label") }}</span>
        <select
          v-model="layout"
          class="h-12 px-3 border-2 border-gray-300 bg-white font-bold focus:outline-none focus:border-red-main hover:cursor-pointer"
        >
          <option v-for="(item, index) in LAYOUTS" :key="item" :value="item">
            {{ index + 1 }}. {{ $t(`calc.layout.${item}`) }}
          </option>
        </select>
      </label>

      <div
        class="grid grid-cols-1 gap-10 items-start pb-16"
        :class="wide ? '' : 'lg:grid-cols-[minmax(0,1fr)_340px] lg:pb-0'"
      >
        <CalculatorLayoutAccordion v-if="layout === 'accordion'" />
        <CalculatorLayoutModal v-else-if="layout === 'modal'" />
        <CalculatorLayoutWizard v-else-if="layout === 'wizard'" />
        <CalculatorLayoutSidebar v-else-if="layout === 'sidebar'" />
        <CalculatorLayoutVisual v-else-if="layout === 'visual'" />
        <CalculatorLayoutChat v-else-if="layout === 'chat'" />
        <CalculatorLayoutForm v-else-if="layout === 'form'" />
        <CalculatorLayoutWide v-else-if="layout === 'wide'" />
        <CalculatorLayoutSentence v-else-if="layout === 'sentence'" />
        <CalculatorLayoutSteps v-else />

        <CalculatorSummary :class="wide ? 'w-full lg:max-w-xl lg:mx-auto' : 'lg:sticky lg:top-24'" />

        <!-- juosta apačioje su kaina ir nuoroda į santrauką: telefone – visada, kompiuteryje – plačiame išdėstyme -->
        <a
          href="#calc-summary"
          :class="wide ? '' : 'lg:hidden'"
          class="fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-4 pl-20 pr-4 py-3 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
        >
          <span class="font-bold" :class="loading ? 'opacity-40' : ''">{{ barText }}</span>
          <span class="shrink-0 px-4 py-2 bg-red-main text-white font-bold">{{ $t("calc.summary.show") }}</span>
        </a>
      </div>
    </template>
  </div>
</template>
