import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtLinkLocale-C4V4J5dl.mjs';
import { defineComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeo } from './useSeo-DMuJFlsz.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo("tvoros");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_NuxtLinkLocale = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLinkLocale, {
              to: "/tvoros/skardines-tvoros",
              class: "bg-[url('/images/tvoros/daimond6090.jpg')] w-full aspect-4/3 bg-cover bg-center text-center m-auto text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("menu.skardines-tvoros"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("menu.skardines-tvoros")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLinkLocale, {
              to: "/tvoros/metalines-tvoros",
              class: "bg-[url('/images/tvoros/metalines-tvoros.jpg')] w-full aspect-4/3 bg-cover bg-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("menu.metalines-tvoros"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("menu.metalines-tvoros")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLinkLocale, {
              to: "/tvoros/tvoralentes",
              class: "bg-[url('/images/tvoros/dilė.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("menu.tvoralentes"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("menu.tvoralentes")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLinkLocale, {
              to: "/tvoros/segmentines-tvoros",
              class: "bg-[url('/images/tvoros/tvora22.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("menu.segmentines-tvoros"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("menu.segmentines-tvoros")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                createVNode(_component_NuxtLinkLocale, {
                  to: "/tvoros/skardines-tvoros",
                  class: "bg-[url('/images/tvoros/daimond6090.jpg')] w-full aspect-4/3 bg-cover bg-center text-center m-auto text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("menu.skardines-tvoros")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLinkLocale, {
                  to: "/tvoros/metalines-tvoros",
                  class: "bg-[url('/images/tvoros/metalines-tvoros.jpg')] w-full aspect-4/3 bg-cover bg-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg flex items-center justify-center"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("menu.metalines-tvoros")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLinkLocale, {
                  to: "/tvoros/tvoralentes",
                  class: "bg-[url('/images/tvoros/dilė.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("menu.tvoralentes")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLinkLocale, {
                  to: "/tvoros/segmentines-tvoros",
                  class: "bg-[url('/images/tvoros/tvora22.jpg')] w-full aspect-4/3 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold transition-transform duration-300 hover:scale-105 shadow-xl border border-gray-200 rounded-lg"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("menu.segmentines-tvoros")), 1)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tvoros/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-I2TZRIVy.mjs.map
