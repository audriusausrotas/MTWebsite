// Straipsnio puslapis čia įrašo savo adresus abiem kalbomis (jei yra vertimas).
// Naudoja app.vue (hreflang) ir kalbos pasirinkimas.
export const useArticleAlternates = () =>
  useState<Partial<Record<"lt" | "en", string>>>("articleAlternates", () => ({}));

// content kelias -> svetainės adresas: /straipsniai/x lieka, /articles/x -> /en/articles/x
export const articleSitePath = (contentPath: string) =>
  contentPath.startsWith("/articles/") ? "/en" + contentPath : contentPath;
