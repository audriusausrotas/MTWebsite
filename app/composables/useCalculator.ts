import type {
  CalculatorConfig,
  CalculatorModel,
  CalculatorScope,
  EstimateRequest,
  EstimateResponse,
} from "#shared/types/calculator";

// Tinklapio skaičiuoklės būsena: parinktys iš MTSoft, lankytojo pasirinkimai ir paskaičiuota kaina.
// Kaina skaičiuojama MTSoft'e (/api/estimate) – čia tik pasirinkimai ir jų tarpusavio taisyklės.

export interface CalculatorSelection {
  scope: CalculatorScope;
  modelId: string;
  steel: "premium" | "eco";
  seeThrough: string;
  twoSided: boolean;
  color: string;
  // cm
  height: number | null;
  // aukštis įvedamas ranka („Kitas“)
  customHeight: boolean;
  // m
  length: number | null;
  parts: "full" | "poles" | "none";
  gateType: "none" | "sliding" | "swing";
  // cm
  gateWidth: number | null;
  gateCount: number;
  automatics: boolean;
  wickets: number;
  installation: boolean;
}

const initialSelection = (): CalculatorSelection => ({
  scope: "fence",
  modelId: "",
  steel: "premium",
  seeThrough: "nepramatoma",
  twoSided: false,
  color: "",
  height: 170,
  customHeight: false,
  length: null,
  parts: "full",
  gateType: "none",
  gateWidth: null,
  gateCount: 1,
  automatics: true,
  wickets: 0,
  installation: true,
});

const closest = (list: number[], value: number) =>
  list.reduce((best, item) => (Math.abs(item - value) < Math.abs(best - value) ? item : best), list[0] ?? value);

export const useCalculator = () => {
  const config = useState<CalculatorConfig | null>("calculatorConfig", () => null);
  const selection = useState<CalculatorSelection>("calculatorSelection", initialSelection);
  const result = useState<EstimateResponse | null>("calculatorResult", () => null);
  const loading = useState<boolean>("calculatorLoading", () => false);

  const model = computed<CalculatorModel | null>(
    () => config.value?.models.find((item) => item.id === selection.value.modelId) ?? null,
  );

  const hasFence = computed(() => selection.value.scope !== "gates");
  const hasGates = computed(() => selection.value.scope !== "fence");

  // Eco skarda būna tik kelių spalvų
  const colorsOf = (item: CalculatorModel | null, steel: "premium" | "eco") =>
    !item ? [] : item.steel && steel === "eco" ? item.ecoColors : item.colors;

  const colors = computed(() => colorsOf(model.value, selection.value.steel));

  const heightValid = computed(() => {
    const { height } = selection.value;
    if (!height || !config.value || !model.value) return false;
    if (model.value.variants.length) return model.value.variants.some((variant) => variant.height === height);
    return height >= config.value.heightRange.min && height <= config.value.heightRange.max;
  });

  const lengthValid = computed(() => {
    const { length } = selection.value;
    return (
      !!config.value && !!length && length >= config.value.lengthRange.min && length <= config.value.lengthRange.max
    );
  });

  // Ko dar trūksta kainai (i18n raktas `calc.summary.*`), null – galima skaičiuoti
  const missing = computed<string | null>(() => {
    const value = selection.value;
    if (!model.value) return "chooseModel";
    if (!colors.value.includes(value.color)) return "chooseColor";
    if (!heightValid.value) return "chooseHeight";
    if (hasFence.value && !lengthValid.value) return "enterLength";
    if (value.scope === "gates" && value.gateType === "none" && value.wickets === 0) return "chooseGates";
    return null;
  });

  const request = computed<EstimateRequest | null>(() => {
    const value = selection.value;
    const item = model.value;
    if (missing.value || !item) return null;

    const variant = item.variants.find((entry) => entry.height === value.height);

    return {
      scope: value.scope,
      fence: {
        name: variant ? variant.name : item.id,
        steel: item.steel ? value.steel : "premium",
        seeThrough: item.seeThrough.length ? value.seeThrough : undefined,
        twoSided: item.twoSided ? value.twoSided : undefined,
        color: value.color,
        height: value.height!,
        length: hasFence.value ? value.length! : undefined,
        parts: value.parts,
      },
      gate:
        hasGates.value && value.gateType !== "none" && value.gateWidth
          ? { type: value.gateType, width: value.gateWidth, automatics: value.automatics, count: value.gateCount }
          : null,
      wickets: hasGates.value ? value.wickets : 0,
      installation: value.installation,
    };
  });

  const selectModel = (id: string) => {
    const next = config.value?.models.find((item) => item.id === id);
    if (!next || !config.value) return;

    const value = selection.value;
    const previous = model.value;
    value.modelId = id;

    if (!next.steel || (value.steel === "eco" && !next.eco)) value.steel = "premium";
    if (!next.seeThrough.includes(value.seeThrough)) {
      value.seeThrough = next.seeThrough.includes("nepramatoma") ? "nepramatoma" : (next.seeThrough[0] ?? "");
    }
    if (!next.twoSided) value.twoSided = false;

    const list = colorsOf(next, value.steel);
    if (!list.includes(value.color)) value.color = list.includes("7016") ? "7016" : (list[0] ?? "");

    if (next.variants.length) {
      // fiksuoti aukščiai – artimiausias anksčiau pasirinktam
      value.height = closest(
        next.variants.map((variant) => variant.height),
        value.height ?? 150,
      );
      value.customHeight = false;
    } else if (previous?.variants.length || !value.height) {
      value.height = closest(config.value.heights, value.height ?? 170);
      value.customHeight = false;
    }
  };

  const selectSteel = (steel: "premium" | "eco") => {
    const value = selection.value;
    value.steel = steel;
    const list = colorsOf(model.value, steel);
    if (!list.includes(value.color)) value.color = list.includes("7016") ? "7016" : (list[0] ?? "");
  };

  const selectScope = (scope: CalculatorScope) => {
    const value = selection.value;
    value.scope = scope;
    // „Tik vartai“ be vartų neturi prasmės – iš karto parenkami pirmi galimi
    if (scope === "gates" && value.gateType === "none" && value.wickets === 0) selectGate(firstGateType());
  };

  const firstGateType = (): "sliding" | "swing" | "none" =>
    config.value?.gates.sliding.length ? "sliding" : config.value?.gates.swing.length ? "swing" : "none";

  const selectGate = (type: "none" | "sliding" | "swing") => {
    const value = selection.value;
    value.gateType = type;
    if (type === "none" || !config.value) return;
    const widths = config.value.gates[type];
    if (!value.gateWidth || !widths.includes(value.gateWidth)) value.gateWidth = widths[0] ?? null;
  };

  return {
    config,
    selection,
    result,
    loading,
    model,
    colors,
    hasFence,
    hasGates,
    heightValid,
    lengthValid,
    missing,
    request,
    selectModel,
    selectSteel,
    selectScope,
    selectGate,
  };
};
