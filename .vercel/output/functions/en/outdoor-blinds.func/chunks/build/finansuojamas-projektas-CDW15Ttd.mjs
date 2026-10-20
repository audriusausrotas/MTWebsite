import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { c as useI18n, I as ImageComponent, b as useState } from './server.mjs';
import { defineComponent, withAsyncContext, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useSeo } from './useSeo-DMuJFlsz.mjs';
import { l as loadSiteData } from './useSiteData-BDorclNM.mjs';
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

const useFunded = () => {
  const funded = useState("funded", () => []);
  return {
    funded
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "finansuojamas-projektas",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeo("finansuojamas-projektas");
    [__temp, __restore] = withAsyncContext(() => loadSiteData("funded")), await __temp, __restore();
    const { funded } = useFunded();
    const { locale } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_NuxtImg = ImageComponent;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-200 w-full m-auto flex flex-col gap-20"${_scopeId}><!--[-->`);
            ssrRenderList(unref(funded), (item) => {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                key: item.url,
                src: item.url.trim(),
                alt: (unref(locale) === "en" ? item.altEN : item.alt) || item.name,
                sizes: "sm:100vw md:800px",
                class: "w-full shadow-2xl rounded-lg"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-200 w-full m-auto flex flex-col gap-20" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(funded), (item) => {
                  return openBlock(), createBlock(_component_NuxtImg, {
                    key: item.url,
                    src: item.url.trim(),
                    alt: (unref(locale) === "en" ? item.altEN : item.alt) || item.name,
                    sizes: "sm:100vw md:800px",
                    class: "w-full shadow-2xl rounded-lg"
                  }, null, 8, ["src", "alt"]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/finansuojamas-projektas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=finansuojamas-projektas-CDW15Ttd.mjs.map
