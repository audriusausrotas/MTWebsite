import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { _ as __nuxt_component_1 } from './SheetFenceCard-Bmd5Fjzx.mjs';
import { defineComponent, withAsyncContext, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useSeo } from './useSeo-DMuJFlsz.mjs';
import { l as loadSiteData } from './useSiteData-BDorclNM.mjs';
import { u as useFences } from './useFences-B8wmbRIS.mjs';
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
import './GalleryFullscreen-Inr1DAUG.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "segmentines-tvoros",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeo("segmentines-tvoros");
    [__temp, __restore] = withAsyncContext(() => loadSiteData("fences")), await __temp, __restore();
    const { segmentFences } = useFences();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_FencesSheetFenceCard = __nuxt_component_1;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-default w-full m-auto flex flex-col gap-10 py-10"${_scopeId}><!--[-->`);
            ssrRenderList(unref(segmentFences), (fence) => {
              _push2(ssrRenderComponent(_component_FencesSheetFenceCard, {
                key: fence._id,
                fence
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-default w-full m-auto flex flex-col gap-10 py-10" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(segmentFences), (fence) => {
                  return openBlock(), createBlock(_component_FencesSheetFenceCard, {
                    key: fence._id,
                    fence
                  }, null, 8, ["fence"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tvoros/segmentines-tvoros.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=segmentines-tvoros-DZuPTk7N.mjs.map
