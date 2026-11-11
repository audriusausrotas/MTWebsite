import type { CalculatorConfig } from "#shared/types/calculator";

interface MTSoftResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

// Skaičiuoklės parinktys (tvorų modeliai, spalvos, vartų pločiai) iš MTSoft. Kešuojama 10 min.;
// nepavykęs kreipimasis nekešuojamas (klaida) – puslapis tada rodo „skaičiuoklė nepasiekiama“.
export const getCalculatorConfig = defineCachedFunction(
  async (): Promise<CalculatorConfig> => {
    const { apiBase } = useRuntimeConfig();
    const response = await $fetch<MTSoftResponse<CalculatorConfig>>(`${apiBase}/api/webCalculator`, { timeout: 5000 });
    if (!response?.success || !response.data || !Array.isArray(response.data.models)) {
      throw new Error(`webCalculator: ${response?.message || "neteisingas atsakymas"}`);
    }
    return response.data;
  },
  { name: "calculator-config", maxAge: 60 * 10, swr: true },
);

export const requestEstimate = (body: unknown, clientIp: string | undefined) => {
  const { apiBase } = useRuntimeConfig();
  return $fetch<MTSoftResponse<Record<string, unknown>>>(`${apiBase}/api/webEstimate`, {
    method: "POST",
    body: body as Record<string, unknown>,
    timeout: 8000,
    // MTSoft užklausų ribojimui: tikras lankytojo adresas (priimamas tik iš to paties serverio)
    headers: clientIp ? { "x-mtsoft-client-ip": clientIp } : undefined,
  });
};
