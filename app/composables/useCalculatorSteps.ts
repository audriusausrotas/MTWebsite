import type { CalculatorScope } from "#shared/types/calculator";

// Skaičiuoklės žingsniai iš eilės – bendri visiems išdėstymo variantams (Layout*.vue): pavadinimas, užuomina,
// trumpa pasirinkta reikšmė (rodoma sutrauktame bloke ar eilutėje) ir ar žingsnis jau užpildytas.
// Žingsnio turinys – Calculator/Section.vue.

export type StepKey = "scope" | "blinds" | "need" | "model" | "look" | "color" | "size" | "gates" | "parts" | "install";

export interface StepInfo {
  key: StepKey;
  number: number;
  title: string;
  hint: string;
  // pasirinkta reikšmė trumpai; tuščia – dar nepasirinkta
  value: string;
  done: boolean;
  // žingsnis priklauso redaguojamai tvorai (kelių tvorų atveju – skirtukui)
  fence: boolean;
}

export const useCalculatorSteps = () => {
  const { t, locale } = useI18n();
  const {
    config,
    selection,
    fence,
    model,
    isBlinds,
    hasFence,
    wantsPoles,
    missing,
    colorsOf,
    heightOf,
    heightValid,
    lengthOf,
    lengthValid,
  } = useCalculator();

  // Tvora ir vartai skaičiuojami kartu (ko reikia – kitame žingsnyje); atskirai – lauko žaliuzės
  const scopes = computed(() =>
    (["both", "blinds"] as CalculatorScope[]).filter((scope) => scope !== "blinds" || config.value?.blinds),
  );

  // Pramatomumas renkamas tik skardinėms tvoroms, montavimo būdas – tvoralentėms; segmentams šio žingsnio nėra
  const lookStep = computed(() => !model.value || model.value.seeThrough.length > 0 || model.value.twoSided);

  const number = (value: number) =>
    new Intl.NumberFormat(locale.value === "en" ? "en-GB" : "lt-LT", { maximumFractionDigits: 1 }).format(value);
  const colorName = (color: string) => (color === "Zn" ? t("calc.color.zinc") : `RAL ${color}`);

  const steps = computed<StepInfo[]>(() => {
    const item = fence.value;
    const entry = model.value;
    const list: Omit<StepInfo, "number">[] = [];

    if (scopes.value.length > 1) {
      list.push({
        key: "scope",
        title: t("calc.steps.scope"),
        hint: "",
        value: t(isBlinds.value ? "calc.scope.blinds" : "calc.scope.both"),
        done: true,
        fence: false,
      });
    }

    if (isBlinds.value) {
      const blinds = selection.value.blinds;
      list.push({
        key: "blinds",
        title: t("calc.steps.blinds"),
        hint: "",
        value: [blinds.type, blinds.color ? colorName(blinds.color) : ""].filter(Boolean).join(", "),
        done: !missing.value,
        fence: false,
      });
    } else {
      const height = heightOf(item);
      const length = lengthOf(item);

      list.push({
        key: "need",
        title: t("calc.steps.need"),
        hint: t("calc.need.hint"),
        value: [item.noFence ? "" : t("calc.need.fence"), item.needGates ? t("calc.need.gates") : ""].filter(Boolean).join(", "),
        done: true,
        fence: true,
      });

      list.push({
        key: "model",
        title: t(hasFence.value ? "calc.steps.model" : "calc.steps.modelGates"),
        hint: t(item.needGates ? "calc.model.hintGates" : "calc.model.hint"),
        value: entry ? (entry.category === "Segmentas" ? t("calc.model.segment") : entry.name) : "",
        done: !!entry,
        fence: true,
      });

      if (lookStep.value) {
        list.push({
          key: "look",
          title: t(entry?.twoSided ? "calc.boards.title" : "calc.seeThrough.title"),
          hint: "",
          value: !entry
            ? ""
            : entry.twoSided
              ? t(item.twoSided ? "calc.boards.twoSided" : "calc.boards.oneSided")
              : t(`calc.seeThrough.${item.seeThrough}`),
          done: !!entry,
          fence: true,
        });
      }

      const colorDone = !!entry && colorsOf(item).includes(item.color);
      list.push({
        key: "color",
        title: t(!entry || entry.steel ? "calc.steps.color" : "calc.color.title"),
        hint: "",
        value: colorDone ? [entry!.steel ? t(`calc.steel.${item.steel}`) : "", colorName(item.color)].filter(Boolean).join(", ") : "",
        done: colorDone,
        fence: true,
      });

      list.push({
        key: "size",
        title: t(hasFence.value ? "calc.steps.size" : "calc.steps.sizeGates"),
        hint: "",
        value: [
          height && heightValid(item) ? `${height} cm` : "",
          !item.noFence && length && lengthValid(item) ? `${number(length)} m` : "",
        ]
          .filter(Boolean)
          .join(", "),
        done: heightValid(item) && (item.noFence || lengthValid(item)),
        fence: true,
      });

      if (item.needGates) {
        list.push({
          key: "gates",
          title: t("calc.steps.gates"),
          hint: t("calc.gates.hint"),
          value: item.gates.map((gate) => t(`calc.gates.types.${gate.type}`)).join(", "),
          done: item.gates.length > 0,
          fence: true,
        });
      }

      list.push({
        key: "parts",
        title: t(hasFence.value ? "calc.steps.parts" : "calc.steps.partsGates"),
        hint: "",
        value: hasFence.value
          ? t(`calc.size.${item.parts}`)
          : t(wantsPoles(item) ? "calc.size.gatePoles" : "calc.size.noGatePoles"),
        done: true,
        fence: true,
      });
    }

    list.push({
      key: "install",
      title: t("calc.steps.install"),
      hint: "",
      value: t(selection.value.installation ? "calc.install.yes" : "calc.install.no"),
      done: true,
      fence: false,
    });

    return list.map((step, index) => ({ ...step, number: index + 1 }));
  });

  // žingsniai prieš tvorų rėmą, jame ir po jo
  const before = computed(() => steps.value.filter((step) => !step.fence && step.key !== "install"));
  const inFence = computed(() => steps.value.filter((step) => step.fence));
  const after = computed(() => steps.value.filter((step) => step.key === "install"));

  return { steps, before, inFence, after, scopes, lookStep };
};
