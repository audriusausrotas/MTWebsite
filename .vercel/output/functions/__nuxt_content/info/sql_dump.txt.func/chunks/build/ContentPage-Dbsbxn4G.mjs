import { _ as __nuxt_component_0$1 } from './Wrapper-BAHSbD5B.mjs';
import { u as useFetch, _ as __nuxt_component_2 } from './ContentRenderer-zBhYmDr3.mjs';
import { d as demotedHeadings } from './demotedHeadings-Cm1cqYjJ.mjs';
import { defineComponent, withAsyncContext, computed, withCtx, unref, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { c as useI18n, j as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentPage",
  __ssrInlineRender: true,
  props: {
    path: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { locale } = useI18n();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/content", {
      key: `text-${locale.value}-${props.path}`,
      query: { locale: locale.value, path: props.path }
    }, "$LMR5R7CX39")), __temp = await __temp, __restore(), __temp);
    const page = computed(() => data.value?.doc);
    useSeoMeta({
      title: () => page.value?.seoTitle || page.value?.title,
      description: () => page.value?.seoDescription || page.value?.description,
      ogTitle: () => page.value?.seoTitle || page.value?.title,
      ogDescription: () => page.value?.seoDescription || page.value?.description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0$1;
      const _component_ContentRenderer = __nuxt_component_2;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(page)) {
              _push2(ssrRenderComponent(_component_ContentRenderer, {
                value: unref(page),
                components: "demotedHeadings" in _ctx ? _ctx.demotedHeadings : unref(demotedHeadings),
                class: "prose prose-lg max-w-default w-full"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(page) ? (openBlock(), createBlock(_component_ContentRenderer, {
                key: 0,
                value: unref(page),
                components: "demotedHeadings" in _ctx ? _ctx.demotedHeadings : unref(demotedHeadings),
                class: "prose prose-lg max-w-default w-full"
              }, null, 8, ["value", "components"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/ContentPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-e7238735"]]), { __name: "BaseContentPage" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ContentPage-Dbsbxn4G.mjs.map
