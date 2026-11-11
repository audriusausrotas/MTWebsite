import type {
  CalculatorConfig,
  CalculatorModel,
  CalculatorScope,
  EstimateFence,
  EstimateRequest,
  EstimateResponse,
  GateType,
} from "#shared/types/calculator";

// Tinklapio skaičiuoklės būsena: parinktys iš MTSoft, lankytojo pasirinkimai ir paskaičiuota kaina.
// Kaina skaičiuojama MTSoft'e (/api/estimate) – čia tik pasirinkimai ir jų tarpusavio taisyklės.
// Viename skaičiavime gali būti kelios tvoros (pvz. priekyje viena, gale – kita) arba lauko žaliuzės.

export interface FenceSelection {
  id: number;
  modelId: string;
  steel: "premium" | "eco";
  seeThrough: string;
  twoSided: boolean;
  color: string;
  // lankytojo įvestas tekstas: aukštis cm, ilgis m
  heightText: string;
  lengthText: string;
  parts: "full" | "poles" | "none";
  gateType: "none" | GateType;
  // cm
  gateWidth: number | null;
  gateCount: number;
  automatics: boolean;
  wickets: number;
  // gaminami pagal užsakymą arba gatavas segmentinis komplektas
  wicketType: "made" | "segment";
}

export interface OpeningSelection {
  id: number;
  // cm
  widthText: string;
  heightText: string;
  count: number;
}

export interface BlindSelection {
  type: string;
  direction: string;
  color: string;
  openings: OpeningSelection[];
}

export interface CalculatorSelection {
  scope: CalculatorScope;
  fences: FenceSelection[];
  // rodomos (redaguojamos) tvoros indeksas
  active: number;
  blinds: BlindSelection;
  installation: boolean;
  nextId: number;
}

// Ko trūksta kainai: i18n raktas `calc.summary.*` ir tvoros numeris (kai tvorų kelios)
export interface Missing {
  key: string;
  fence?: number;
}

const newFence = (id: number): FenceSelection => ({
  id,
  modelId: "",
  steel: "premium",
  seeThrough: "nepramatoma",
  twoSided: false,
  color: "",
  heightText: "",
  lengthText: "",
  parts: "full",
  gateType: "none",
  gateWidth: null,
  gateCount: 1,
  automatics: true,
  wickets: 0,
  wicketType: "made",
});

const initialSelection = (): CalculatorSelection => ({
  scope: "fence",
  fences: [newFence(1)],
  active: 0,
  blinds: { type: "", direction: "Horizontali", color: "", openings: [{ id: 2, widthText: "", heightText: "", count: 1 }] },
  installation: true,
  nextId: 3,
});

// Tekstas → skaičius (priimamas ir kablelis, ir taškas); netinkamas – null
export const parseNumber = (value: string) => {
  const parsed = Number(value.replace(",", ".").trim());
  return value.trim() && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const closest = (list: number[], value: number) =>
  list.reduce((best, item) => (Math.abs(item - value) < Math.abs(best - value) ? item : best), list[0] ?? value);

// Gatavų segmentinių komplektų aukštis parenkamas pagal tvoros aukštį (kaip MTSoft skaičiuoklėje)
const kitHeight = (height: number) => Math.floor(height / 10) * 10;

export const useCalculator = () => {
  const config = useState<CalculatorConfig | null>("calculatorConfig", () => null);
  const selection = useState<CalculatorSelection>("calculatorSelection", initialSelection);
  const result = useState<EstimateResponse | null>("calculatorResult", () => null);
  const loading = useState<boolean>("calculatorLoading", () => false);

  const hasFence = computed(() => selection.value.scope === "fence" || selection.value.scope === "both");
  const hasGates = computed(() => selection.value.scope === "both" || selection.value.scope === "gates");
  const isBlinds = computed(() => selection.value.scope === "blinds");

  // redaguojama tvora
  const fence = computed(() => selection.value.fences[selection.value.active] ?? selection.value.fences[0]!);

  const modelOf = (item: FenceSelection): CalculatorModel | null =>
    config.value?.models.find((entry) => entry.id === item.modelId) ?? null;

  const model = computed(() => modelOf(fence.value));

  // Eco skarda būna tik kelių spalvų
  const colorsFor = (item: CalculatorModel | null, steel: "premium" | "eco") =>
    !item ? [] : item.steel && steel === "eco" ? item.ecoColors : item.colors;

  const colorsOf = (item: FenceSelection) => colorsFor(modelOf(item), item.steel);

  // aukštis cm: segmentams – vienas iš variantų, kitoms – lankytojo įvestas
  const heightOf = (item: FenceSelection) => {
    const value = parseNumber(item.heightText);
    return value ? Math.round(value) : null;
  };

  const heightValid = (item: FenceSelection) => {
    const height = heightOf(item);
    const entry = modelOf(item);
    if (!height || !config.value || !entry) return false;
    if (entry.variants.length) return entry.variants.some((variant) => variant.height === height);
    return height >= config.value.heightRange.min && height <= config.value.heightRange.max;
  };

  const lengthOf = (item: FenceSelection) => parseNumber(item.lengthText);

  const lengthValid = (item: FenceSelection) => {
    const length = lengthOf(item);
    return !!config.value && !!length && length >= config.value.lengthRange.min && length <= config.value.lengthRange.max;
  };

  // Siūlomi aukščiai (cm): segmentams – variantai; horizontaliai skardinei tvorai – lamelių žingsnio kartotiniai
  const heightOptions = (item: FenceSelection) => {
    const entry = modelOf(item);
    if (!entry) return [];
    if (entry.variants.length) return entry.variants.map((variant) => variant.height);

    const step = entry.steps[item.seeThrough];
    if (!step) return [];
    const list: number[] = [];
    for (let count = Math.ceil(100 / step); count * step <= 220; count++) list.push(Math.round(count * step));
    return [...new Set(list)];
  };

  // Gatavi segmentiniai vartai / varteliai – tik segmentinei tvorai ir tik jos aukščio komplektai
  const segmentGateWidths = (item: FenceSelection) => {
    const height = heightOf(item);
    if (modelOf(item)?.category !== "Segmentas" || !height || !config.value) return [];
    return config.value.gates.segment.filter((kit) => kit.height === kitHeight(height)).map((kit) => kit.width);
  };

  // ar pasirinktam segmentiniam komplektui kainyne yra automatika
  const kitAutomation = (item: FenceSelection) => {
    const height = heightOf(item);
    return (
      item.gateType === "segment" &&
      !!height &&
      !!config.value?.gates.segment.some(
        (kit) => kit.width === item.gateWidth && kit.height === kitHeight(height) && kit.automation,
      )
    );
  };

  // automatikos pasirinkimas: gaminamiems vartams – visada, komplektui – tik jei ji yra
  const hasAutomatics = (item: FenceSelection) =>
    item.gateType !== "none" && (item.gateType !== "segment" || kitAutomation(item));

  const segmentWicket = (item: FenceSelection) => {
    const height = heightOf(item);
    return (
      modelOf(item)?.category === "Segmentas" && !!height && !!config.value?.gates.segmentWickets.includes(kitHeight(height))
    );
  };

  const gateWidthsOf = (item: FenceSelection, type: "none" | GateType = item.gateType) =>
    type === "none" || !config.value ? [] : type === "segment" ? segmentGateWidths(item) : config.value.gates[type];

  const wicketAvailable = (item: FenceSelection) =>
    item.wicketType === "segment" ? segmentWicket(item) : !!config.value?.gates.wicket;

  // Po modelio ar aukščio pakeitimo vartų pasirinkimas gali nebetikti – pataisomas
  const fixGates = (item: FenceSelection) => {
    if (item.gateType !== "none") {
      const widths = gateWidthsOf(item);
      if (!widths.length) item.gateType = "none";
      else if (!item.gateWidth || !widths.includes(item.gateWidth)) item.gateWidth = widths[0]!;
    }
    if (item.wicketType === "segment" && !segmentWicket(item)) item.wicketType = "made";
  };

  const missingOf = (item: FenceSelection): string | null => {
    if (!modelOf(item)) return "chooseModel";
    if (!colorsOf(item).includes(item.color)) return "chooseColor";
    if (!heightValid(item)) return "enterHeight";
    if (hasFence.value && !lengthValid(item)) return "enterLength";
    if (selection.value.scope === "gates" && item.gateType === "none" && item.wickets === 0) return "chooseGates";
    return null;
  };

  const openingValid = (opening: OpeningSelection) => {
    const blinds = config.value?.blinds;
    const width = parseNumber(opening.widthText);
    const height = parseNumber(opening.heightText);
    return (
      !!blinds &&
      !!width &&
      !!height &&
      width >= blinds.widthRange.min &&
      width <= blinds.widthRange.max &&
      height >= blinds.heightRange.min &&
      height <= blinds.heightRange.max
    );
  };

  const missing = computed<Missing | null>(() => {
    const value = selection.value;

    if (value.scope === "blinds") {
      const blinds = config.value?.blinds;
      if (!blinds?.types.some((type) => type.name === value.blinds.type)) return { key: "chooseBlindType" };
      if (!blinds.colors.includes(value.blinds.color)) return { key: "chooseColor" };
      if (!value.blinds.openings.length || !value.blinds.openings.every(openingValid)) return { key: "enterOpening" };
      return null;
    }

    for (const [index, item] of value.fences.entries()) {
      const key = missingOf(item);
      if (key) return { key, fence: value.fences.length > 1 ? index + 1 : undefined };
    }
    return null;
  });

  const fenceRequest = (item: FenceSelection): EstimateFence => {
    const entry = modelOf(item)!;
    const height = heightOf(item)!;
    const variant = entry.variants.find((candidate) => candidate.height === height);

    return {
      name: variant ? variant.name : entry.id,
      steel: entry.steel ? item.steel : "premium",
      seeThrough: entry.seeThrough.length ? item.seeThrough : undefined,
      twoSided: entry.twoSided ? item.twoSided : undefined,
      color: item.color,
      height,
      length: hasFence.value ? lengthOf(item)! : undefined,
      parts: item.parts,
      gate:
        hasGates.value && item.gateType !== "none" && item.gateWidth
          ? { type: item.gateType, width: item.gateWidth, automatics: item.automatics, count: item.gateCount }
          : null,
      wickets: hasGates.value && wicketAvailable(item) ? item.wickets : 0,
      wicketType: item.wicketType,
    };
  };

  const request = computed<EstimateRequest | null>(() => {
    const value = selection.value;
    if (missing.value) return null;

    if (value.scope === "blinds") {
      return {
        scope: "blinds",
        blinds: {
          type: value.blinds.type,
          direction: value.blinds.direction,
          color: value.blinds.color,
          openings: value.blinds.openings.map((opening) => ({
            width: Math.round(parseNumber(opening.widthText)!),
            height: Math.round(parseNumber(opening.heightText)!),
            count: opening.count,
          })),
        },
        installation: value.installation,
      };
    }

    return { scope: value.scope, fences: value.fences.map(fenceRequest), installation: value.installation };
  });

  // ---------- veiksmai (redaguojamai tvorai)

  const selectModel = (id: string) => {
    const next = config.value?.models.find((item) => item.id === id);
    if (!next) return;

    const item = fence.value;
    item.modelId = id;

    if (!next.steel || (item.steel === "eco" && !next.eco)) item.steel = "premium";
    if (!next.seeThrough.includes(item.seeThrough)) {
      item.seeThrough = next.seeThrough.includes("nepramatoma") ? "nepramatoma" : (next.seeThrough[0] ?? "");
    }
    if (!next.twoSided) item.twoSided = false;

    const list = colorsFor(next, item.steel);
    if (!list.includes(item.color)) item.color = list.includes("7016") ? "7016" : (list[0] ?? "");

    // fiksuoti aukščiai (segmentai) – artimiausias anksčiau įvestam
    if (next.variants.length) {
      const heights = next.variants.map((variant) => variant.height);
      const current = heightOf(item);
      if (!current || !heights.includes(current)) item.heightText = String(closest(heights, current ?? 150));
    }

    fixGates(item);
  };

  const selectSteel = (steel: "premium" | "eco") => {
    const item = fence.value;
    item.steel = steel;
    const list = colorsOf(item);
    if (!list.includes(item.color)) item.color = list.includes("7016") ? "7016" : (list[0] ?? "");
  };

  const setHeight = (text: string) => {
    fence.value.heightText = text;
    fixGates(fence.value);
  };

  const firstGateType = (item: FenceSelection): "none" | GateType =>
    (["sliding", "swing", "segment"] as const).find((type) => gateWidthsOf(item, type).length) ?? "none";

  const selectGate = (type: "none" | GateType) => {
    const item = fence.value;
    item.gateType = type;
    fixGates(item);
  };

  const selectScope = (scope: CalculatorScope) => {
    const value = selection.value;
    value.scope = scope;
    if (scope === "blinds") {
      const blinds = config.value?.blinds;
      if (blinds && !value.blinds.type) value.blinds.type = blinds.types[0]?.name ?? "";
      if (blinds && !blinds.colors.includes(value.blinds.color)) {
        value.blinds.color = blinds.colors.includes("7016") ? "7016" : (blinds.colors[0] ?? "");
      }
      return;
    }
    // „Tik vartai“ be vartų neturi prasmės – iš karto parenkami pirmi galimi
    if (scope === "gates") {
      value.fences.forEach((item) => {
        if (item.gateType === "none" && item.wickets === 0) {
          item.gateType = firstGateType(item);
          fixGates(item);
        }
      });
    }
  };

  const addFence = () => {
    const value = selection.value;
    if (!config.value || value.fences.length >= config.value.maxFences) return;
    const item = newFence(value.nextId++);
    if (value.scope === "gates") item.gateType = firstGateType(item);
    value.fences.push(item);
    value.active = value.fences.length - 1;
  };

  const removeFence = (index: number) => {
    const value = selection.value;
    if (value.fences.length <= 1) return;
    value.fences.splice(index, 1);
    value.active = Math.min(value.active > index ? value.active - 1 : value.active, value.fences.length - 1);
  };

  const addOpening = () => {
    const value = selection.value;
    if (!config.value?.blinds || value.blinds.openings.length >= config.value.blinds.maxOpenings) return;
    value.blinds.openings.push({ id: value.nextId++, widthText: "", heightText: "", count: 1 });
  };

  const removeOpening = (index: number) => {
    if (selection.value.blinds.openings.length > 1) selection.value.blinds.openings.splice(index, 1);
  };

  return {
    config,
    selection,
    result,
    loading,
    fence,
    model,
    hasFence,
    hasGates,
    isBlinds,
    missing,
    request,
    modelOf,
    colorsOf,
    heightOf,
    heightValid,
    heightOptions,
    lengthOf,
    lengthValid,
    gateWidthsOf,
    segmentGateWidths,
    segmentWicket,
    hasAutomatics,
    wicketAvailable,
    openingValid,
    selectModel,
    selectSteel,
    setHeight,
    selectGate,
    selectScope,
    addFence,
    removeFence,
    addOpening,
    removeOpening,
  };
};
