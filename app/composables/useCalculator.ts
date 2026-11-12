import type {
  CalculatorConfig,
  CalculatorModel,
  CalculatorScope,
  EstimateFence,
  EstimateGate,
  EstimateRequest,
  EstimateResponse,
  GateType,
  WicketLock,
} from "#shared/types/calculator";

// Tinklapio skaičiuoklės būsena: parinktys iš MTSoft, lankytojo pasirinkimai ir paskaičiuota kaina.
// Kaina skaičiuojama MTSoft'e (/api/estimate) – čia tik pasirinkimai ir jų tarpusavio taisyklės.
// Viename skaičiavime gali būti kelios tvoros (pvz. priekyje viena, gale – kita) arba lauko žaliuzės.

// Vieni vartai arba varteliai: kiekvieni kuriami atskirai (kaip tvoros), su savo tipu, pločiu, automatika ar spyna
export interface GateSelection {
  id: number;
  type: GateType;
  // cm – tik vartams
  width: number | null;
  automatics: boolean;
  // tik gaminamiems varteliams
  lock: WicketLock;
  // gatavam segmentiniam komplektui: aukštis cm ir (prie ne segmentinės tvoros) spalva
  kitHeight: number | null;
  color: string;
}

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
  parts: "full" | "poles" | "borders" | "none";
  // „Ko reikia“: tvoros nereikia – tik vartai su šiuo užpildu (ilgis nepildomas)
  noFence: boolean;
  // „Ko reikia“: vartų ar vartelių (be šio – vartų žingsnis nerodomas)
  needGates: boolean;
  // vartai ir varteliai su šios tvoros užpildu, aukščiu ir spalva
  gates: GateSelection[];
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
  noFence: false,
  needGates: false,
  gates: [],
});

const initialSelection = (): CalculatorSelection => ({
  scope: "both",
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

export const isWicket = (type: GateType) => type === "wicket" || type === "segmentWicket";

const GATE_TYPES: GateType[] = ["sliding", "swing", "wicket", "segment", "segmentWicket"];

// Gatavų segmentinių komplektų aukštis parenkamas pagal tvoros aukštį (kaip MTSoft skaičiuoklėje)
const kitHeight = (height: number) => Math.floor(height / 10) * 10;

export const useCalculator = () => {
  const config = useState<CalculatorConfig | null>("calculatorConfig", () => null);
  const selection = useState<CalculatorSelection>("calculatorSelection", initialSelection);
  const result = useState<EstimateResponse | null>("calculatorResult", () => null);
  const loading = useState<boolean>("calculatorLoading", () => false);

  const isBlinds = computed(() => selection.value.scope === "blinds");

  // redaguojama tvora
  const fence = computed(() => selection.value.fences[selection.value.active] ?? selection.value.fences[0]!);

  const modelOf = (item: FenceSelection): CalculatorModel | null =>
    config.value?.models.find((entry) => entry.id === item.modelId) ?? null;

  const model = computed(() => modelOf(fence.value));

  // ar redaguojamai tvorai skaičiuojama pati tvora (ne tik vartai)
  const hasFence = computed(() => !fence.value.noFence);

  // Komplektacija be tvoros lemia tik vartų stulpus: su jais arba be jų
  const wantsPoles = (item: FenceSelection) => item.parts === "full" || item.parts === "poles";

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

  // Gatavi segmentiniai vartai ir varteliai (komplektai) siūlomi prie bet kurios tvoros. Segmentinei tvorai komplekto
  // aukštis ir spalva – pagal tvorą; prie kitos tvoros lankytojas juos pasirenka pats (iš to, kas yra kainyne).
  const isKit = (type: GateType) => type === "segment" || type === "segmentWicket";
  const isSegmentFence = (item: FenceSelection) => modelOf(item)?.category === "Segmentas";
  const segmentModel = computed(() => config.value?.models.find((entry) => entry.category === "Segmentas") ?? null);

  const kitHeightsOf = (item: FenceSelection, type: GateType): number[] => {
    if (!config.value || !isKit(type)) return [];
    const all =
      type === "segment"
        ? [...new Set(config.value.gates.segment.map((kit) => kit.height))].sort((a, b) => a - b)
        : config.value.gates.segmentWickets;
    if (isSegmentFence(item)) {
      const height = heightOf(item);
      return height && all.includes(kitHeight(height)) ? [kitHeight(height)] : [];
    }
    return segmentModel.value ? all : [];
  };

  // spalvos renkamos tik komplektui prie ne segmentinės tvoros
  const kitColorsOf = (item: FenceSelection) => (isSegmentFence(item) ? [] : (segmentModel.value?.colors ?? []));

  // vartų pločiai cm (varteliams pločio rinktis nereikia); komplektui – pagal jo aukštį
  const gateWidthsOf = (item: FenceSelection, type: GateType, height?: number | null) =>
    !config.value
      ? []
      : type === "segment"
        ? config.value.gates.segment
            .filter((kit) => kit.height === (height ?? kitHeightsOf(item, type)[0]))
            .map((kit) => kit.width)
        : type === "sliding" || type === "swing"
          ? config.value.gates[type]
          : [];

  // Kokius vartus ir vartelius galima rinktis šiai tvorai
  const gateTypesOf = (item: FenceSelection) =>
    GATE_TYPES.filter((type) =>
      type === "wicket"
        ? !!config.value?.gates.wicket
        : isKit(type)
          ? kitHeightsOf(item, type).length > 0
          : gateWidthsOf(item, type).length > 0,
    );

  // automatikos pasirinkimas: gaminamiems vartams – visada, komplektui – tik jei ji kainyne yra
  const hasAutomatics = (item: FenceSelection, gate: GateSelection) => {
    if (gate.type === "sliding" || gate.type === "swing") return true;
    return (
      gate.type === "segment" &&
      !!config.value?.gates.segment.some(
        (kit) => kit.width === gate.width && kit.height === gate.kitHeight && kit.automation,
      )
    );
  };

  const hasLock = (gate: GateSelection) => gate.type === "wicket" && !!config.value?.gates.electricLock;

  // Po modelio ar aukščio pakeitimo vartai gali nebetikti: gatavas komplektas keičiamas gaminamais, plotis – pirmu galimu
  const fixGates = (item: FenceSelection) => {
    const types = gateTypesOf(item);
    item.gates = item.gates.filter((gate) => {
      if (!types.includes(gate.type)) {
        const made: GateType = isWicket(gate.type) ? "wicket" : "swing";
        if (!types.includes(made)) return false;
        gate.type = made;
      }
      if (isKit(gate.type)) {
        const heights = kitHeightsOf(item, gate.type);
        if (!gate.kitHeight || !heights.includes(gate.kitHeight)) gate.kitHeight = closest(heights, kitHeight(heightOf(item) ?? 150));
        const colors = kitColorsOf(item);
        if (colors.length && !colors.includes(gate.color)) {
          gate.color = colors.includes(item.color) ? item.color : colors.includes("7016") ? "7016" : colors[0]!;
        }
      }
      const widths = gateWidthsOf(item, gate.type, gate.kitHeight);
      gate.width = !widths.length ? null : gate.width && widths.includes(gate.width) ? gate.width : widths[0]!;
      return true;
    });
  };

  const missingOf = (item: FenceSelection): string | null => {
    if (!modelOf(item)) return "chooseModel";
    if (!colorsOf(item).includes(item.color)) return "chooseColor";
    if (!heightValid(item)) return "enterHeight";
    if (!item.noFence && !lengthValid(item)) return "enterLength";
    if (item.needGates && !item.gates.length) return "chooseGates";
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
      length: item.noFence ? undefined : lengthOf(item)!,
      parts: item.noFence ? (wantsPoles(item) ? "full" : "none") : item.parts,
      gates: (item.needGates ? item.gates : []).map((gate): EstimateGate => ({
        type: gate.type,
        width: gate.width ?? undefined,
        automatics: hasAutomatics(item, gate) ? gate.automatics : undefined,
        lock: gate.type === "wicket" ? (hasLock(gate) ? gate.lock : "simple") : undefined,
        // komplektas prie ne segmentinės tvoros – su savo aukščiu ir spalva
        ...(isKit(gate.type) && !isSegmentFence(item) ? { height: gate.kitHeight ?? undefined, color: gate.color } : {}),
      })),
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

  const canAddGate = (item: FenceSelection) =>
    !!config.value && item.gates.length < (config.value.gates.maxItems ?? 6) && gateTypesOf(item).length > 0;

  const addGate = () => {
    const item = fence.value;
    if (!canAddGate(item)) return;
    const type = gateTypesOf(item)[0]!;
    item.gates.push({
      id: selection.value.nextId++,
      type,
      width: gateWidthsOf(item, type)[0] ?? null,
      automatics: true,
      lock: "simple",
      kitHeight: null,
      color: "",
    });
    fixGates(item);
  };

  const removeGate = (index: number) => {
    fence.value.gates.splice(index, 1);
  };

  const setGateType = (gate: GateSelection, type: GateType) => {
    gate.type = type;
    fixGates(fence.value);
  };

  const setKitHeight = (gate: GateSelection, height: number) => {
    gate.kitHeight = height;
    fixGates(fence.value);
  };

  // „Ko reikia“: tvoros, vartų arba abiejų – bent vienas visada pažymėtas
  const toggleNeed = (key: "fence" | "gates") => {
    const item = fence.value;
    if (key === "fence") {
      item.noFence = !item.noFence;
      if (item.noFence) item.needGates = true;
    } else {
      item.needGates = !item.needGates;
      if (!item.needGates) item.noFence = false;
    }
    // pažymėjus vartus – iš karto pirmi, kad nereikėtų spausti „Pridėti“
    if (item.needGates && !item.gates.length) addGate();
  };

  // tas pats vienu pasirinkimu (išskleidžiamam sąrašui): tvoros, tvoros ir vartų arba tik vartų
  const needOf = (item: FenceSelection) => (item.noFence ? "gates" : item.needGates ? "both" : "fence");

  const setNeed = (kind: string) => {
    const item = fence.value;
    item.noFence = kind === "gates";
    item.needGates = kind !== "fence";
    if (item.needGates && !item.gates.length) addGate();
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
    }
  };

  const addFence = () => {
    const value = selection.value;
    if (!config.value || value.fences.length >= config.value.maxFences) return;
    value.fences.push(newFence(value.nextId++));
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
    wantsPoles,
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
    gateTypesOf,
    hasAutomatics,
    hasLock,
    canAddGate,
    addGate,
    removeGate,
    setGateType,
    setKitHeight,
    isKit,
    kitHeightsOf,
    kitColorsOf,
    toggleNeed,
    needOf,
    setNeed,
    openingValid,
    selectModel,
    selectSteel,
    setHeight,
    selectScope,
    addFence,
    removeFence,
    addOpening,
    removeOpening,
  };
};
