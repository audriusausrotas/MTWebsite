<script setup lang="ts">
import type { StepInfo, StepKey } from "~/composables/useCalculatorSteps";

// Skaičiuoklės išdėstymas: meniu kairėje. Vienas šoninis stulpelis: visų žingsnių sąrašas su pasirinktomis reikšmėmis
// (galima šokti į bet kurį), po juo – kaina su užklausos mygtuku ir „Reikia pagalbos?“ (AI pokalbis).
// Visas likęs plotis – pasirinkto žingsnio turiniui.
// Telefone sąrašas virsta slenkama juosta viršuje, kaina ir pagalba – po turiniu.
const { fence } = useCalculator();
const { steps } = useCalculatorSteps();

// pradedama nuo pirmo žingsnio: lankytojas pats pereina visus, taip pat ir tuos, kur reikšmė parinkta iš anksto
const active = ref<StepKey>(steps.value[0]!.key);

// pasikeitus žingsnių sąrašui (pvz. perjungus į žaliuzes) pasirinkto gali nebelikti
const current = computed(() => steps.value.find((step) => step.key === active.value) ?? steps.value[0]!);
const index = computed(() => steps.value.indexOf(current.value));

// Žingsnis meniu pažymimas atliktu (raudonas numeris) tik tada, kai lankytojas jame jau buvo: iš anksto parinktos
// reikšmės (pvz. automatiškai pridėti vartai, komplektacija, montavimas) lieka baltos, kol į žingsnį neužeita.
// Tvoros žingsniai – kiekvienai tvorai atskirai.
const visited = ref(new Set<string>());
const visitKey = (step: StepInfo) => (step.fence ? `${fence.value.id}:${step.key}` : step.key);
const complete = (step: StepInfo) => step.done && visited.value.has(visitKey(step));

watch(
  () => visitKey(current.value),
  (key) => visited.value.add(key),
  { immediate: true },
);

const go = (offset: number) => {
  const target = steps.value[index.value + offset];
  if (target) active.value = target.key;
};

// „Reikia pagalbos?“ atidaro MTSoft pokalbių langą (tą patį, kaip plaukiojantis mygtukas): AI asistentas sąmatą
// paskaičiuoja pagal aprašymą. Langas įkeliamas asinchroniškai – jei dar neįkeltas, trumpai palaukiama.
let chatTimer: ReturnType<typeof setTimeout> | undefined;

const openChat = (tries = 0) => {
  clearTimeout(chatTimer);
  if ((window as unknown as { __mtsoftChatLoaded?: boolean }).__mtsoftChatLoaded) {
    window.dispatchEvent(new Event("mtsoft-chat-open"));
  } else if (tries < 25) {
    chatTimer = setTimeout(() => openChat(tries + 1), 200);
  }
};

// Šoninis stulpelis slenkant lieka matomas (sticky), bet vidinio slinkimo neturi – auga tiek, kiek reikia, ir išstumia
// puslapį. Kai jis aukštesnis už langą, prisitvirtina ne viršumi, o apačia: kaina ir mygtukai lieka matomi.
const STICKY_TOP = 96;
const STICKY_GAP = 16;
const sidebar = ref<HTMLElement | null>(null);
const stickyTop = ref<string>();
let observer: ResizeObserver | undefined;

const placeSidebar = () => {
  const height = sidebar.value?.offsetHeight ?? 0;
  stickyTop.value = `${Math.min(STICKY_TOP, window.innerHeight - height - STICKY_GAP)}px`;
};

onMounted(() => {
  if (!sidebar.value) return;
  observer = new ResizeObserver(placeSidebar);
  observer.observe(sidebar.value);
  window.addEventListener("resize", placeSidebar);
  placeSidebar();
});

onBeforeUnmount(() => {
  clearTimeout(chatTimer);
  observer?.disconnect();
  window.removeEventListener("resize", placeSidebar);
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-5 lg:gap-8 items-start">
    <!-- šoninis stulpelis; telefone jo dalys – atskiri blokai (meniu viršuje, kaina ir pagalba po turiniu) -->
    <div ref="sidebar" class="contents lg:flex lg:flex-col lg:gap-4 lg:sticky lg:top-24" :style="{ top: stickyTop }">
      <nav
        class="order-1 flex lg:flex-col gap-2 lg:gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
        :aria-label="$t('calc.layout.stepsNav')"
      >
        <button
          v-for="step in steps"
          :key="step.key"
          type="button"
          class="flex items-center gap-3 shrink-0 lg:shrink px-3 py-2 lg:py-1.5 border-2 text-left transition-colors hover:cursor-pointer"
          :class="
            step.key === current.key
              ? 'border-red-main bg-red-main text-white'
              : 'border-gray-300 bg-white hover:border-gray-500'
          "
          :aria-current="step.key === current.key ? 'step' : undefined"
          @click="active = step.key"
        >
          <span
            class="flex items-center justify-center w-7 h-7 shrink-0 text-sm font-bold"
            :class="
              step.key === current.key
                ? 'bg-white text-red-main'
                : complete(step)
                  ? 'bg-red-main text-white'
                  : 'border-2 border-gray-400 text-gray-600'
            "
          >
            {{ step.number }}
          </span>
          <span class="flex flex-col min-w-0">
            <span class="font-bold leading-tight whitespace-nowrap lg:whitespace-normal">{{ step.title }}</span>
            <span
              class="hidden lg:block text-sm leading-tight truncate"
              :class="step.key === current.key ? 'text-white/90' : step.done && step.value ? 'text-gray-600' : 'text-red-main font-semibold'"
            >
              {{ step.done && step.value ? step.value : $t("calc.layout.choose") }}
            </span>
          </span>
        </button>
      </nav>

      <CalculatorSummary class="order-3" />

      <button
        type="button"
        class="order-4 flex items-center gap-3 p-4 border border-gray-200 rounded-lg shadow-lg bg-white text-left transition-colors hover:border-red-main hover:cursor-pointer"
        @click="openChat()"
      >
        <span class="flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-red-main text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span class="flex flex-col gap-0.5 min-w-0">
          <span class="font-bold">{{ $t("calc.help.title") }}</span>
          <span class="text-sm leading-tight text-gray-600">{{ $t("calc.help.text") }}</span>
        </span>
      </button>
    </div>

    <div class="order-2 flex flex-col gap-5 min-w-0">
      <CalculatorFenceTabs v-if="current.fence" />

      <CalculatorStep :number="current.number" :title="current.title" :hint="current.hint">
        <CalculatorSection :key="`${fence.id}-${current.key}`" :step="current.key" />
      </CalculatorStep>

      <div class="flex justify-between gap-3">
        <button
          type="button"
          class="min-h-12 px-6 border-2 border-gray-300 bg-white font-bold hover:border-black hover:cursor-pointer disabled:opacity-40 disabled:cursor-default"
          :disabled="index === 0"
          @click="go(-1)"
        >
          ← {{ $t("calc.layout.back") }}
        </button>
        <BaseButton v-if="index < steps.length - 1" width="w-40 sm:w-60" @click="go(1)">
          {{ $t("calc.layout.next") }} →
        </BaseButton>
      </div>
    </div>
  </div>
</template>
