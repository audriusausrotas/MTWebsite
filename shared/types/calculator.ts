// Tinklapio skaičiuoklė: parinktys ir kaina iš MTSoft (MTSoftServer modules/webCalculator.ts)
import type { SiteImage } from "./website";

export type CalculatorCategory = "Tvora" | "Tvoralentė" | "Segmentas";

export interface CalculatorModel {
  // tvoros pavadinimas MTSoft'e; segmentinėms – bendras „segment“ (aukščiai – variants)
  id: string;
  name: string;
  category: CalculatorCategory;
  description: string;
  descriptionEn: string;
  images: SiteImage[];
  // galima rinktis skardą (Premium / Eco); eco – ar Eco skarda šiai tvorai yra
  steel: boolean;
  eco: boolean;
  seeThrough: string[];
  // lamelių žingsnis cm pagal pramatomumą (horizontalioms skardinėms tvoroms): aukštis = lamelių skaičius × žingsnis
  steps: Record<string, number>;
  twoSided: boolean;
  colors: string[];
  ecoColors: string[];
  // fiksuoti aukščiai (segmentai), cm
  variants: { name: string; height: number }[];
}

export interface CalculatorBlinds {
  types: { name: string; material: string }[];
  directions: string[];
  colors: string[];
  // cm
  widthRange: { min: number; max: number };
  heightRange: { min: number; max: number };
  maxOpenings: number;
  maxCount: number;
}

export interface CalculatorConfig {
  models: CalculatorModel[];
  // cm
  heightRange: { min: number; max: number };
  // m
  lengthRange: { min: number; max: number };
  maxFences: number;
  gates: {
    // gaminami pagal užsakymą: galimi pločiai cm
    sliding: number[];
    swing: number[];
    wicket: boolean;
    // ar varteliams galima rinktis elektromagnetinę spyną
    electricLock: boolean;
    // gatavi segmentiniai komplektai (tik varstomi, tik segmentinei tvorai): plotis × aukštis cm;
    // automation – ar komplektui galima automatika
    segment: { width: number; height: number; automation: boolean }[];
    segmentWickets: number[];
    // vartų ir vartelių vienai tvorai
    maxItems: number;
  };
  // null – lauko žaliuzės neskaičiuojamos
  blinds: CalculatorBlinds | null;
}

export type CalculatorScope = "fence" | "both" | "gates" | "blinds";
// Vartai ir varteliai: gaminami pagal užsakymą (sliding, swing, wicket) arba gatavi segmentiniai komplektai
export type GateType = "sliding" | "swing" | "segment" | "wicket" | "segmentWicket";
export type WicketLock = "simple" | "electric";

export interface EstimateGate {
  type: GateType;
  // cm – tik vartams (varteliai standartiniai)
  width?: number;
  automatics?: boolean;
  // tik gaminamiems varteliams
  lock?: WicketLock;
  // gatavam segmentiniam komplektui prie ne segmentinės tvoros: komplekto aukštis cm ir spalva
  height?: number;
  color?: string;
}

export interface EstimateFence {
  name: string;
  steel: "premium" | "eco";
  seeThrough?: string;
  twoSided?: boolean;
  color: string;
  // cm
  height: number;
  // m
  length?: number;
  parts?: "full" | "poles" | "borders" | "none";
  gates?: EstimateGate[];
}

export interface EstimateRequest {
  scope: CalculatorScope;
  fences?: EstimateFence[];
  blinds?: {
    type: string;
    direction: string;
    color: string;
    // cm
    openings: { width: number; height: number; count: number }[];
  };
  installation: boolean;
}

export type EstimateResponse =
  | {
      status: "ok";
      // eurais: sąmatos suma su PVM ir be PVM
      price: number;
      priceNet: number;
      // dalys su PVM
      parts: { materials: number; gates: number; works: number };
    }
  // kainą paskaičiuos vadybininkas (kainyne kažko nerasta)
  | { status: "manual" }
  | { status: "invalid"; message: string }
  | { status: "error" };
