import { _ as __nuxt_component_0$1 } from './NuxtLinkLocale-C4V4J5dl.mjs';
import { c as useI18n, e as useRoute, v as useSwitchLocalePath, u as useLocalePath, i as useArticleAlternates, _ as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, useSSRContext, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { z as publicAssetsURL, ad as FENCE_CATEGORY_PAGES } from '../_/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'node:crypto';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LangSelector",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale, locales } = useI18n();
    const route = useRoute();
    const switchLocalePath = useSwitchLocalePath();
    const localePath = useLocalePath();
    const isOpen = ref(false);
    const flags = {
      lt: "/icons/lt.svg",
      en: "/icons/us.svg"
    };
    const articleAlternates = useArticleAlternates();
    const targetFor = (code) => route.meta.article ? articleAlternates.value[code] || localePath("/straipsniai", code) : switchLocalePath(code) || localePath("/", code);
    watch(
      () => route.fullPath,
      () => isOpen.value = false
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><button type="button"${ssrRenderAttr("aria-label", unref(t)("nav.language"))}${ssrRenderAttr("aria-expanded", unref(isOpen))} class="flex items-center rounded-md bg-white/10 hover:bg-white/20 transition hover:cursor-pointer"><img${ssrRenderAttr("src", flags[unref(locale)])}${ssrRenderAttr("alt", unref(locale).toUpperCase())} class="w-6 h-4 rounded-xs"></button>`);
      if (unref(isOpen)) {
        _push(`<div class="fixed inset-0 z-40"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isOpen)) {
        _push(`<div class="absolute right-0 mt-2 w-24 bg-black/70 backdrop-blur-md rounded-md overflow-hidden shadow-lg z-50"><!--[-->`);
        ssrRenderList(unref(locales), (l) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: l.code,
            to: targetFor(l.code),
            hreflang: l.code,
            class: "flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-white/30 transition",
            onClick: ($event) => isOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", flags[l.code])} alt="" class="w-6 h-4 object-cover rounded-xs"${_scopeId}><span class="uppercase"${_scopeId}>${ssrInterpolate(l.code)}</span>`);
              } else {
                return [
                  createVNode("img", {
                    src: flags[l.code],
                    alt: "",
                    class: "w-6 h-4 object-cover rounded-xs"
                  }, null, 8, ["src"]),
                  createVNode("span", { class: "uppercase" }, toDisplayString(l.code), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation/LangSelector.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$5, { __name: "NavigationLangSelector" });
const _imports_0 = publicAssetsURL("/icons/logo.svg");
const navigation = [
  { name: "menu.tvoros", to: "/tvoros" },
  { name: "menu.kiemo-vartai", to: "/kiemo-vartai" },
  { name: "menu.lauko-zaliuzes", to: "/lauko-zaliuzes" },
  { name: "menu.tvoru-skaiciuokle", to: "/tvoru-skaiciuokle" },
  { name: "menu.galerija", to: "/galerija" },
  { name: "menu.straipsniai", to: "/straipsniai" },
  { name: "menu.apie-mus", to: "/apie-mus" },
  { name: "menu.kontaktai", to: "/kontaktai" }
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const localePath = useLocalePath();
    const scrolled = ref(false);
    const isActive = (to) => {
      const path = localePath(to);
      return route.path === path || route.path.startsWith(path + "/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0$1;
      const _component_NavigationLangSelector = __nuxt_component_1$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["hidden lg:flex fixed top-0 left-0 z-50 w-full h-20 px-6 items-center justify-between gap-6 text-white transition-colors duration-300", unref(scrolled) ? "bg-stone-950/95 shadow-lg backdrop-blur-md" : "bg-black/40 backdrop-blur-xs"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/",
        "aria-label": unref(t)("nav.home"),
        class: "shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", unref(t)("nav.home"))} width="100" height="50"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: unref(t)("nav.home"),
                width: "100",
                height: "50"
              }, null, 8, ["alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex gap-4 xl:gap-8 text-sm font-medium items-center"><!--[-->`);
      ssrRenderList(unref(navigation), (item) => {
        _push(ssrRenderComponent(_component_NuxtLinkLocale, {
          key: item.to,
          to: item.to,
          class: ["transition-colors whitespace-nowrap", isActive(item.to) ? "text-red-500" : "hover:text-red-300"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)(item.name))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)(item.name)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav>`);
      _push(ssrRenderComponent(_component_NavigationLangSelector, { class: "shrink-0" }, null, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$4, { __name: "NavigationHeader" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    dark: { type: Boolean, default: false }
  },
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const input = ref("");
    const results = ref([]);
    const searched = ref(false);
    ref(null);
    let timer;
    let lastRequest = 0;
    watch(input, (value) => {
      clearTimeout(timer);
      const term = value.trim();
      if (term.length < 2) {
        results.value = [];
        searched.value = false;
        return;
      }
      timer = setTimeout(async () => {
        const request = ++lastRequest;
        try {
          const data = await $fetch("/api/search", {
            query: { q: term, locale: locale.value }
          });
          if (request !== lastRequest) return;
          results.value = data;
        } catch {
          if (request === lastRequest) results.value = [];
        }
        searched.value = true;
      }, 250);
    });
    const fences = computed(() => results.value.filter((r) => r.type === "fence"));
    const articles = computed(() => results.value.filter((r) => r.type === "article"));
    const linkTo = (result) => result.type === "fence" ? localePath(FENCE_CATEGORY_PAGES[result.category ?? ""] ?? "/tvoros") : localePath({
      name: "straipsniai-slug",
      params: { slug: result.path?.split("/").pop() ?? "" }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full gap-3 font-medium" }, _attrs))}><input${ssrRenderAttr("value", unref(input))} type="search"${ssrRenderAttr("placeholder", _ctx.$t("search.placeholder"))}${ssrRenderAttr("aria-label", _ctx.$t("search.open"))} class="${ssrRenderClass([
        __props.dark ? "bg-stone-800 border-stone-700 text-white placeholder:text-stone-400" : "bg-white border-gray-300 text-black",
        "w-full p-2 rounded border focus:outline-none"
      ])}">`);
      if (unref(searched)) {
        _push(`<div class="flex flex-col gap-4 max-h-[60dvh] overflow-y-auto">`);
        if (!unref(results).length) {
          _push(`<p class="text-sm opacity-70">${ssrInterpolate(_ctx.$t("search.noResults"))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(fences).length) {
          _push(`<div class="flex flex-col gap-1"><p class="text-xs uppercase opacity-60">${ssrInterpolate(_ctx.$t("search.fences"))}</p><!--[-->`);
          ssrRenderList(unref(fences), (result) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: "f" + result.title,
              to: linkTo(result),
              class: "hover:text-red-500",
              onClick: ($event) => emit("navigate")
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(result.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(result.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(articles).length) {
          _push(`<div class="flex flex-col gap-1"><p class="text-xs uppercase opacity-60">${ssrInterpolate(_ctx.$t("search.articles"))}</p><!--[-->`);
          ssrRenderList(unref(articles), (result) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: "a" + result.path,
              to: linkTo(result),
              class: "hover:text-red-500",
              onClick: ($event) => emit("navigate")
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(result.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(result.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Search.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2$1 = Object.assign(_sfc_main$3, { __name: "BaseSearch" });
const _imports_1$1 = publicAssetsURL("/icons/search.svg");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const localePath = useLocalePath();
    const menuOpen = ref(false);
    const searchOpen = ref(false);
    const closeHandler = () => {
      menuOpen.value = false;
      searchOpen.value = false;
    };
    const isActive = (to) => {
      const path = localePath(to);
      return route.path === path || route.path.startsWith(path + "/");
    };
    watch(() => route.fullPath, closeHandler);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0$1;
      const _component_NavigationLangSelector = __nuxt_component_1$1;
      const _component_BaseSearch = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><div class="flex items-center fixed w-full z-50 bg-stone-900 p-4 gap-4 lg:hidden justify-between"><button type="button"${ssrRenderAttr("aria-label", unref(menuOpen) ? unref(t)("nav.closeMenu") : unref(t)("nav.openMenu"))}${ssrRenderAttr("aria-expanded", unref(menuOpen))}><img${ssrRenderAttr("src", unref(menuOpen) ? "/icons/close.svg" : "/icons/hamburger.svg")} alt="" width="40" height="40"></button>`);
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/",
        "aria-label": unref(t)("nav.home"),
        onClick: closeHandler
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", unref(t)("nav.home"))} width="100" height="50"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: unref(t)("nav.home"),
                width: "100",
                height: "50"
              }, null, 8, ["alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NavigationLangSelector, { class: "text-white" }, null, _parent));
      _push(`</div>`);
      if (unref(menuOpen)) {
        _push(`<nav class="lg:hidden flex flex-col gap-4 items-center w-full h-full text-white bg-stone-900 py-8 px-4 top-19 z-40 fixed"><button type="button" class="flex items-center gap-2"${ssrRenderAttr("aria-expanded", unref(searchOpen))}><img${ssrRenderAttr("src", _imports_1$1)} alt="" width="20" height="20"> ${ssrInterpolate(unref(t)("search.open"))}</button>`);
        if (unref(searchOpen)) {
          _push(ssrRenderComponent(_component_BaseSearch, {
            dark: "",
            onNavigate: closeHandler
          }, null, _parent));
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(navigation), (item) => {
            _push(ssrRenderComponent(_component_NuxtLinkLocale, {
              key: item.to,
              to: item.to,
              class: ["transition", isActive(item.to) ? "text-red-500 hover:text-red-500" : "hover:text-red-300"]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(t)(item.name))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)(item.name)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation/Mobile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "NavigationMobile" });
const _imports_1 = publicAssetsURL("/icons/business.svg");
const _imports_2 = publicAssetsURL("/icons/tag.svg");
const _imports_3 = publicAssetsURL("/icons/bank.svg");
const _imports_4 = publicAssetsURL("/icons/call.svg");
const _imports_5 = publicAssetsURL("/icons/mailFooter.svg");
const _imports_6 = publicAssetsURL("/icons/locationFooter.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const mapLink = (address) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "flex justify-center text-white bg-black py-8 print:hidden w-full" }, _attrs))}><div class="max-w-default w-full"><div class="flex flex-col items-center gap-8"><div class="flex flex-col gap-2 items-center"><img${ssrRenderAttr("src", _imports_0)} alt="Moderni Tvora" width="100" height="60"><p>©${ssrInterpolate(unref(year))}. ${ssrInterpolate(_ctx.$t("footer.rights"))}</p></div><div class="border border-red-600 w-full"></div><div class="flex sm:flex-row flex-col lg:justify-between justify-center flex-wrap w-fit sm:w-full gap-6 py-2 px-4"><div class="flex flex-col gap-2"><div class="flex gap-2"><img${ssrRenderAttr("src", _imports_1)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("footer.companyCode"))}: 305174431</p></div><div class="flex gap-2"><img${ssrRenderAttr("src", _imports_2)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("footer.vatCode"))}: LT100013165913</p></div><div class="flex gap-2"><img${ssrRenderAttr("src", _imports_3)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("footer.bank"))}: Swedbank AB</p></div><div class="flex gap-2"><img${ssrRenderAttr("src", _imports_3)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("footer.account"))}: LT247300010158952845</p></div></div><div class="flex flex-col gap-2"><a${ssrRenderAttr("href", `tel:${unref(t)("contacts.ofisoTelNr").replaceAll(" ", "")}`)} class="flex gap-2 hover:text-red-600"><img${ssrRenderAttr("src", _imports_4)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("contacts.ofisoTelNr"))}</p></a><a href="mailto:info@modernitvora.lt" class="flex gap-2 hover:text-red-600"><img${ssrRenderAttr("src", _imports_5)} alt="" width="20" height="20"><p>info@modernitvora.lt</p></a><a${ssrRenderAttr("href", mapLink(unref(t)("contacts.registracijosAdresas")))} target="_blank" rel="noopener noreferrer" class="flex gap-2 hover:text-red-600"><img${ssrRenderAttr("src", _imports_6)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("contacts.registracijosAdresas"))}</p></a><a${ssrRenderAttr("href", mapLink(unref(t)("contacts.ofiso2Adresas")))} target="_blank" rel="noopener noreferrer" class="flex gap-2 hover:text-red-600"><img${ssrRenderAttr("src", _imports_6)} alt="" width="20" height="20"><p>${ssrInterpolate(_ctx.$t("contacts.ofiso2Adresas"))}</p></a><a href="https://www.facebook.com/ModerniTvora" target="_blank" rel="noopener noreferrer" class="flex gap-2 items-center hover:text-red-600"><span class="w-5 text-center font-bold">f</span><p>Facebook</p></a></div><div class="flex flex-col gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/taisykles",
        class: "hover:text-red-600 flex gap-2 items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-2 h-2 rounded-full border-2 border-red-600"${_scopeId}></span> ${ssrInterpolate(_ctx.$t("menu.taisykles"))}`);
          } else {
            return [
              createVNode("span", { class: "w-2 h-2 rounded-full border-2 border-red-600" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("menu.taisykles")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/pristatymas-ir-grazinimas",
        class: "hover:text-red-600 flex gap-2 items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-2 h-2 rounded-full border-2 border-red-600"${_scopeId}></span>${ssrInterpolate(_ctx.$t("menu.pristatymas-ir-grazinimas"))}`);
          } else {
            return [
              createVNode("span", { class: "w-2 h-2 rounded-full border-2 border-red-600" }),
              createTextVNode(toDisplayString(_ctx.$t("menu.pristatymas-ir-grazinimas")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/privatumo-politika",
        class: "hover:text-red-600 flex gap-2 items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-2 h-2 rounded-full border-2 border-red-600"${_scopeId}></span>${ssrInterpolate(_ctx.$t("menu.privatumo-politika"))}`);
          } else {
            return [
              createVNode("span", { class: "w-2 h-2 rounded-full border-2 border-red-600" }),
              createTextVNode(toDisplayString(_ctx.$t("menu.privatumo-politika")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLinkLocale, {
        to: "/finansuojamas-projektas",
        class: "hover:text-red-600 flex gap-2 items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-2 h-2 rounded-full border-2 border-red-600"${_scopeId}></span>${ssrInterpolate(_ctx.$t("menu.finansuojamas-projektas"))}`);
          } else {
            return [
              createVNode("span", { class: "w-2 h-2 rounded-full border-2 border-red-600" }),
              createTextVNode(toDisplayString(_ctx.$t("menu.finansuojamas-projektas")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "NavigationFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NavigationHeader = __nuxt_component_0;
  const _component_NavigationMobile = __nuxt_component_1;
  const _component_NavigationFooter = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full min-h-dvh flex flex-col" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NavigationHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_NavigationMobile, null, null, _parent));
  _push(`<main class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_NavigationFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-H9O8UTyL.mjs.map
