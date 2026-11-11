import type { Image } from "~/data/interfaces";

// Vartų puslapio duomenys iš MTSoft (Tinklapio nustatymai → Vartų puslapis):
// gateImages – galerija puslapio apačioje, gateSlots – pakeisti fiksuoti puslapio vaizdai
export const useGates = () => {
  const gateImages = useState("gateImages", () => [] as Image[]);

  const gateSlots = useState("gateSlots", () => [] as Image[]);

  return {
    gateImages,
    gateSlots,
  };
};
