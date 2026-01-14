// export default defineNuxtRouteMiddleware(() => {
//   const { locale } = useI18n();

//   if (import.meta.client) {
//     onNuxtReady(() => {
//       if (window.gtag) {
//         window.gtag("set", {
//           language: locale.value,
//         });
//       }
//     });
//   }
// });
