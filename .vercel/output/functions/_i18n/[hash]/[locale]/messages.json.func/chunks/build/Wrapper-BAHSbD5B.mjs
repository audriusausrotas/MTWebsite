import { e as useRoute, c as useI18n, r as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Wrapper",
  __ssrInlineRender: true,
  props: {
    customStyles: {},
    ownHeading: { type: Boolean }
  },
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const title = computed(() => t(`menu.${route.meta.breadcrumb}`));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseHeroImage = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_BaseHeroImage, {
        name: unref(title),
        heading: !__props.ownHeading
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([__props.customStyles, "flex flex-col gap-8 max-w-default w-full m-auto pt-8 pb-20 px-4"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Wrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "BaseWrapper" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Wrapper-BAHSbD5B.mjs.map
