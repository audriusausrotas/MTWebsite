import { b as useState, k as useNuxtApp, q as useRouter } from './server.mjs';

async function callOnce(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, fn, options] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [callOnce] key must be a string: " + _key);
  }
  if (fn !== void 0 && typeof fn !== "function") {
    throw new Error("[nuxt] [callOnce] fn must be a function: " + fn);
  }
  const nuxtApp = useNuxtApp();
  if (options?.mode === "navigation") {
    let callback = function() {
      nuxtApp.payload.once.delete(_key);
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
    const cleanups = [];
    cleanups.push(nuxtApp.hooks.hook("page:start", callback), useRouter().beforeResolve(callback));
  }
  if (nuxtApp.payload.once.has(_key)) {
    {
      return;
    }
  }
  nuxtApp._once ||= {};
  nuxtApp._once[_key] ||= fn() || true;
  await nuxtApp._once[_key];
  nuxtApp.payload.once.add(_key);
  delete nuxtApp._once[_key];
}
const STATE_KEY = { fences: "fences", gallery: "images", funded: "funded" };
const loadSiteData = (part) => {
  const state = useState(STATE_KEY[part], "$5zwslSi8hf");
  return callOnce(`site-data-${part}`, async () => {
    try {
      const data = await $fetch("/api/site-data", { query: { part } });
      state.value = data[part] ?? [];
    } catch (error) {
      console.error(`Nepavyko gauti svetainės duomenų (${part}):`, error);
    }
  }, "$3RKV8qf1xo");
};

export { loadSiteData as l };
//# sourceMappingURL=useSiteData-BDorclNM.mjs.map
