<script setup lang="ts">
// Santrauka su preliminaria kaina. Kol nėra užklausų formos, „Gauti pasiūlymą“ atidaro laišką su pasirinkimais.
const { t, locale } = useI18n();
const { selection, model, result, loading, missing, hasFence, hasGates } = useCalculator();

const EMAIL = "info@modernitvora.lt";

const number = (value: number, digits = 0) =>
  new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);

const meters = (cm: number) => number(cm / 100, 2);

// Pasirinkimų eilutės (tos pačios keliauja ir į laišką)
const lines = computed(() => {
  const value = selection.value;
  const item = model.value;
  const list: string[] = [t(`calc.scope.${value.scope}`)];

  if (item) {
    const details = [
      item.steel ? t(`calc.steel.${value.steel}`) : "",
      item.seeThrough.length ? t(`calc.seeThrough.${value.seeThrough}`) : "",
      item.twoSided ? t(value.twoSided ? "calc.boards.twoSided" : "calc.boards.oneSided") : "",
      value.color ? (value.color === "Zn" ? t("calc.color.zinc") : `RAL ${value.color}`) : "",
    ].filter(Boolean);
    const name = item.category === "Segmentas" ? t("calc.model.segment") : item.name;
    list.push([name, ...details].join(", "));
  }

  const size = [
    value.height ? t("calc.summary.heightLine", { value: meters(value.height) }) : "",
    hasFence.value && value.length ? t("calc.summary.lengthLine", { value: number(value.length, 1) }) : "",
  ].filter(Boolean);
  if (size.length) list.push(size.join(", "));

  if (hasFence.value) list.push(t(`calc.size.${value.parts}`));

  if (hasGates.value) {
    if (value.gateType !== "none" && value.gateWidth) {
      list.push(
        t("calc.summary.gateLine", {
          type: t(`calc.gates.${value.gateType}`),
          width: meters(value.gateWidth),
          count: value.gateCount,
          automatics: t(value.automatics ? "calc.gates.withAutomatics" : "calc.gates.withoutAutomatics").toLowerCase(),
        }),
      );
    }
    if (value.wickets > 0) list.push(t("calc.summary.wicketLine", { count: value.wickets }));
  }

  list.push(t(value.installation ? "calc.install.yes" : "calc.install.no"));
  return list;
});

const price = computed(() => (result.value?.status === "ok" ? result.value : null));

const priceText = computed(() =>
  price.value ? t("calc.summary.range", { from: number(price.value.priceFrom), to: number(price.value.priceTo) }) : "",
);

const parts = computed(() =>
  !price.value
    ? []
    : (["materials", "gates", "works"] as const)
        .filter((key) => price.value!.parts[key] > 0)
        .map((key) => ({
          label: t(`calc.summary.${key}`),
          value: t("calc.summary.about", { value: number(price.value!.parts[key]) }),
        })),
);

const mail = (subject: string, body: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const offerLink = computed(() =>
  mail(
    t("calc.summary.emailSubject"),
    [
      t("calc.summary.emailIntro"),
      "",
      ...lines.value.map((line) => `- ${line}`),
      ...(priceText.value ? ["", `${t("calc.summary.price")}: ${priceText.value}`] : []),
      "",
    ].join("\n"),
  ),
);

const customLink = computed(() => mail(t("calc.summary.emailCustomSubject"), ""));

const phone = computed(() => t("contacts.ofisoTelNr"));
</script>

<template>
  <aside id="calc-summary" class="flex flex-col gap-5 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
    <h2 class="text-2xl font-bold">{{ $t("calc.summary.title") }}</h2>

    <ul class="flex flex-col gap-2">
      <li v-for="line in lines" :key="line" class="flex gap-3">
        <span class="mt-2 w-2 h-2 shrink-0 bg-red-main"></span>
        <span>{{ line }}</span>
      </li>
    </ul>

    <div class="flex flex-col gap-3 pt-5 border-t border-gray-200" aria-live="polite">
      <p v-if="missing" class="font-medium text-gray-600">{{ $t(`calc.summary.${missing}`) }}</p>

      <template v-else-if="price">
        <p class="text-sm text-gray-600">{{ $t("calc.summary.price") }}</p>
        <p class="text-3xl font-bold transition-opacity" :class="loading ? 'opacity-40' : ''">
          {{ priceText }}
        </p>
        <dl class="flex flex-col gap-1 text-sm">
          <div v-for="part in parts" :key="part.label" class="flex justify-between gap-4">
            <dt class="text-gray-600">{{ part.label }}</dt>
            <dd class="font-semibold whitespace-nowrap">{{ part.value }}</dd>
          </div>
        </dl>
        <p class="text-xs text-gray-500">{{ $t("calc.summary.note") }}</p>
      </template>

      <p v-else-if="loading || !result" class="font-medium text-gray-600">
        {{ $t("calc.summary.calculating") }}
      </p>
      <p v-else-if="result.status === 'manual'" class="font-medium">{{ $t("calc.summary.manual") }}</p>
      <p v-else class="font-medium">{{ $t("calc.summary.error") }}</p>
    </div>

    <BaseButton :href="offerLink" width="w-full">{{ $t("calc.summary.cta") }}</BaseButton>

    <div class="flex flex-col gap-2 text-center">
      <a :href="`tel:${phone.replaceAll(' ', '')}`" class="text-xl font-bold hover:underline">{{ phone }}</a>
      <a :href="customLink" class="text-sm text-red-main font-semibold hover:underline">
        {{ $t("calc.summary.custom") }}
      </a>
    </div>
  </aside>
</template>
