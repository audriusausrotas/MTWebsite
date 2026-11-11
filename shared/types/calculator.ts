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
  twoSided: boolean;
  colors: string[];
  ecoColors: string[];
  // fiksuoti aukščiai (segmentai), cm
  variants: { name: string; height: number }[];
}

export interface CalculatorConfig {
  models: CalculatorModel[];
  // cm
  heights: number[];
  heightRange: { min: number; max: number };
  // m
  lengthRange: { min: number; max: number };
  gates: {
    // galimi pločiai cm
    sliding: number[];
    swing: number[];
    wicket: boolean;
    maxGates: number;
    maxWickets: number;
  };
}

export type CalculatorScope = "fence" | "both" | "gates";

export interface EstimateRequest {
  scope: CalculatorScope;
  fence: {
    name: string;
    steel: "premium" | "eco";
    seeThrough?: string;
    twoSided?: boolean;
    color: string;
    // cm
    height: number;
    // m
    length?: number;
    parts?: "full" | "poles" | "none";
  };
  gate?: { type: "sliding" | "swing"; width: number; automatics: boolean; count: number } | null;
  wickets?: number;
  installation: boolean;
}

export type EstimateResponse =
  | {
      status: "ok";
      // eurais su PVM
      priceFrom: number;
      priceTo: number;
      parts: { materials: number; gates: number; works: number };
      area: number;
    }
  // kainą paskaičiuos vadybininkas (kainyne kažko nerasta)
  | { status: "manual" }
  | { status: "invalid"; message: string }
  | { status: "error" };
