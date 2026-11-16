import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "#shared/site";

// Įmonės duomenys paieškos sistemoms (schema.org JSON-LD): pradžios ir kontaktų puslapiuose.
// Koordinatės – Marijampolės biuro (tos pačios kaip žemėlapyje, Contacts/Map.vue).
export function useBusinessSchema() {
  const { t } = useI18n();

  useHead({
    script: [
      {
        key: "business-schema",
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": SITE_URL + "/#business",
          name: SITE_NAME,
          legalName: "MB „Moderni tvora“",
          url: SITE_URL,
          logo: SITE_URL + "/images/logo.png",
          image: SITE_URL + DEFAULT_OG_IMAGE,
          telephone: "+37066347011",
          email: "info@modernitvora.lt",
          vatID: "LT100013165913",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Lauko g. 1",
            addressLocality: "Trakiškių k., Marijampolės sav.",
            addressCountry: "LT",
          },
          geo: { "@type": "GeoCoordinates", latitude: 54.562596, longitude: 23.350908 },
          // antras biuras
          location: [
            {
              "@type": "Place",
              name: `${SITE_NAME} – ${t("contacts.offices.kaunas")}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Chemijos g. 4D",
                addressLocality: "Kaunas",
                addressCountry: "LT",
              },
            },
          ],
          areaServed: { "@type": "Country", name: "Lietuva" },
          sameAs: ["https://www.facebook.com/ModerniTvora"],
        }),
      },
    ],
  });
}
