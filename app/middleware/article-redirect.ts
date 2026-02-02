export default defineNuxtRouteMiddleware((to, from) => {
  if (!from) return;

  const localePath = useLocalePath();
  const fromLocale = from.path.split("/")[1];
  const toLocale = to.path.split("/")[1];

  if (fromLocale !== toLocale) {
    return navigateTo(localePath("/straipsniai"));
  }
});
