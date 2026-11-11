import type { CalculatorConfig } from "#shared/types/calculator";

// Skaičiuoklės parinktys; MTSoft nepasiekiamas – 503 (puslapis rodo kontaktus vietoj skaičiuoklės)
export default defineEventHandler(async (): Promise<CalculatorConfig> => {
  try {
    return await getCalculatorConfig();
  } catch (error) {
    console.error("Nepavyko gauti skaičiuoklės parinkčių iš MTSoft:", error);
    throw createError({ statusCode: 503, statusMessage: "Calculator unavailable" });
  }
});
