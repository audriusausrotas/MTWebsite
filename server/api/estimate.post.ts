import type { EstimateResponse } from "#shared/types/calculator";

// Preliminari kaina: lankytojo pasirinkimai perduodami MTSoft skaičiuoklei (ji viską patikrina ir suskaičiuoja).
// Naršyklė į MTSoft tiesiogiai nesikreipia.
export default defineEventHandler(async (event): Promise<EstimateResponse> => {
  const body = await readBody(event);
  if (!body || typeof body !== "object" || JSON.stringify(body).length > 8000) {
    return { status: "invalid", message: "" };
  }

  try {
    const response = await requestEstimate(body, getRequestIP(event, { xForwardedFor: true }));
    if (!response?.success || !response.data) return { status: "invalid", message: response?.message || "" };

    const data = response.data as Record<string, any>;
    if (data.ok !== true) return { status: "manual" };

    return {
      status: "ok",
      price: Number(data.price) || 0,
      priceNet: Number(data.priceNet) || 0,
      parts: {
        materials: Number(data.parts?.materials) || 0,
        gates: Number(data.parts?.gates) || 0,
        works: Number(data.parts?.works) || 0,
      },
    };
  } catch (error) {
    console.error("Nepavyko paskaičiuoti kainos MTSoft'e:", error);
    return { status: "error" };
  }
});
