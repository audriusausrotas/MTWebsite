import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { b as __nuxt_component_1, _ as __nuxt_component_2, a as __nuxt_component_3 } from './Cards-NdQESvCc.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "apie-mus",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo("apie-mus");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_BaseVideo = __nuxt_component_1;
      const _component_AboutBlock = __nuxt_component_2;
      const _component_AboutCards = __nuxt_component_3;
      _push(ssrRenderComponent(_component_BaseWrapper, mergeProps({ customStyles: "gap-20" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-12 max-w-100 w-full"${_scopeId}><h2 class="text-4xl font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("about.aprasymas.title"))}</h2><p${_scopeId}>${ssrInterpolate(_ctx.$t("about.aprasymas.text"))}</p></div>`);
            _push2(ssrRenderComponent(_component_BaseVideo, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AboutBlock, {
              title: _ctx.$t("about.box1.title"),
              text: _ctx.$t("about.box1.text"),
              url: _ctx.$t("about.box1.url")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AboutCards, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AboutBlock, {
              reverse: "",
              title: _ctx.$t("about.box2.title"),
              text: _ctx.$t("about.box2.text"),
              url: _ctx.$t("about.box2.url")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AboutBlock, {
              title: _ctx.$t("about.box3.title"),
              text: _ctx.$t("about.box3.text"),
              url: _ctx.$t("about.box3.url")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-12 max-w-100 w-full" }, [
                createVNode("h2", { class: "text-4xl font-medium" }, toDisplayString(_ctx.$t("about.aprasymas.title")), 1),
                createVNode("p", null, toDisplayString(_ctx.$t("about.aprasymas.text")), 1)
              ]),
              createVNode(_component_BaseVideo),
              createVNode(_component_AboutBlock, {
                title: _ctx.$t("about.box1.title"),
                text: _ctx.$t("about.box1.text"),
                url: _ctx.$t("about.box1.url")
              }, null, 8, ["title", "text", "url"]),
              createVNode(_component_AboutCards),
              createVNode(_component_AboutBlock, {
                reverse: "",
                title: _ctx.$t("about.box2.title"),
                text: _ctx.$t("about.box2.text"),
                url: _ctx.$t("about.box2.url")
              }, null, 8, ["title", "text", "url"]),
              createVNode(_component_AboutBlock, {
                title: _ctx.$t("about.box3.title"),
                text: _ctx.$t("about.box3.text"),
                url: _ctx.$t("about.box3.url")
              }, null, 8, ["title", "text", "url"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/apie-mus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=apie-mus-C1IG0rym.mjs.map
