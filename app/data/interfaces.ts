import { Types } from "mongoose";

export interface Fence {
  _id: Types.ObjectId;
  name: string;
  category: string;
  defaultDirection: string;
  details: FenceDetails;
  steps: SeeThroughSteps;
  prices: PriceTier;
  profit: profitPercents;
  aditional: AditionalFenceInformation;
}

export interface FenceDetails {
  width: number;
  height: number;
  bends: number;
  holes: number;
}

export interface AditionalFenceInformation {
  show: boolean;
  description: string;
  descriptionEn: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDescription: string;
  seoDescriptionEn: string;
  images: Image[];
}

export interface Image {
  url: string;
  alt: string;
  altEN?: string;
}

export interface SeeThroughSteps {
  aklina: number;
  nepramatoma: number;
  vidutiniska: number;
  pramatoma: number;
  pramatoma25: number;
  pramatoma50: number;
}

export interface PriceTier {
  premium: QualityPricing;
  eco: QualityPricing;
  cost: number;
  priceRetail: number;
  priceWholesale: number;
}

export interface profitPercents {
  premiumRetail: number;
  premiumWholesale: number;
  ecoRetail: number;
  ecoWholesale: number;
}

export interface QualityPricing {
  meter: SeeThroughPrice;
  aklina: SeeThroughPrice;
  nepramatoma: SeeThroughPrice;
  vidutiniska: SeeThroughPrice;
  pramatoma: SeeThroughPrice;
  pramatoma25: SeeThroughPrice;
  pramatoma50: SeeThroughPrice;
}

export interface SeeThroughPrice {
  cost: number;
  priceRetail: number;
  priceWholesale: number;
}
