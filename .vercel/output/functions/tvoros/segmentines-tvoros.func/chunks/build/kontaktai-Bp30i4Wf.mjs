import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from './Map-CB1r8jGO.mjs';
import { defineComponent, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "kontaktai",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo("kontaktai");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_ContactsBlock = __nuxt_component_1;
      const _component_ContactsMap = __nuxt_component_2;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ContactsBlock, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ContactsMap, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ContactsBlock),
              createVNode(_component_ContactsMap)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kontaktai.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=kontaktai-Bp30i4Wf.mjs.map
