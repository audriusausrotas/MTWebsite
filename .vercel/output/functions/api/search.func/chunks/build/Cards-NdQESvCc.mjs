import { I as ImageComponent } from './server.mjs';
import { defineComponent, mergeProps, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const VIDEO = "/video/MTLOOP3.mp4";
const POSTER = "/video/MTLOOP3-poster.jpg";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Video",
  __ssrInlineRender: true,
  props: {
    height: { default: 440 }
  },
  setup(__props) {
    const showVideo = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative w-full overflow-hidden",
        style: { height: __props.height + "px" }
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: POSTER,
        alt: "",
        sizes: "sm:100vw md:100vw lg:100vw xl:100vw",
        class: "absolute inset-0 w-full h-full object-cover"
      }, null, _parent));
      if (unref(showVideo)) {
        _push(`<video${ssrRenderAttr("src", VIDEO)}${ssrRenderAttr("poster", POSTER)} autoplay muted loop playsinline disablepictureinpicture aria-hidden="true" class="absolute inset-0 w-full h-full object-cover"></video>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Video.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$3, { __name: "BaseVideo" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Block",
  __ssrInlineRender: true,
  props: {
    reverse: { type: Boolean, default: false },
    title: { default: "" },
    text: { default: "" },
    url: { default: "" },
    alt: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 gap-8" }, _attrs))}><div class="${ssrRenderClass([__props.reverse ? "sm:order-2" : "sm:order-1", "flex flex-col gap-12 w-full sm:max-w-100"])}"><h2 class="font-medium text-4xl text-center sm:text-left">${ssrInterpolate(__props.title)}</h2><p class="text-justify">${ssrInterpolate(__props.text)}</p>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: __props.url,
        alt: __props.alt || __props.title,
        sizes: "sm:100vw md:50vw lg:600px",
        loading: "lazy",
        class: ["max-w-150 w-full h-auto object-cover", __props.reverse ? "order-1" : "order-2"]
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Block.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "AboutBlock" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    title: { default: "" },
    text: { default: "" },
    url: { default: "" },
    alt: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col flex-1 min-w-48 h-full" }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: __props.url,
        alt: __props.alt || __props.title,
        sizes: "sm:100vw md:50vw lg:300px",
        loading: "lazy",
        class: "object-cover w-full"
      }, null, _parent));
      _push(`<div class="flex items-center justify-center text-center -translate-y-1/2 bg-red-main text-white font-medium px-4 min-h-16 max-w-[85%]">${ssrInterpolate(__props.title)}</div></div><p class="text-justify">${ssrInterpolate(__props.text)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AboutCard" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AboutCard = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AboutCard, {
    title: _ctx.$t("about.cards.card1.title"),
    text: _ctx.$t("about.cards.card1.text"),
    url: _ctx.$t("about.cards.card1.url")
  }, null, _parent));
  _push(ssrRenderComponent(_component_AboutCard, {
    title: _ctx.$t("about.cards.card2.title"),
    text: _ctx.$t("about.cards.card2.text"),
    url: _ctx.$t("about.cards.card2.url")
  }, null, _parent));
  _push(ssrRenderComponent(_component_AboutCard, {
    title: _ctx.$t("about.cards.card3.title"),
    text: _ctx.$t("about.cards.card3.text"),
    url: _ctx.$t("about.cards.card3.url")
  }, null, _parent));
  _push(ssrRenderComponent(_component_AboutCard, {
    title: _ctx.$t("about.cards.card4.title"),
    text: _ctx.$t("about.cards.card4.text"),
    url: _ctx.$t("about.cards.card4.url")
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Cards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "AboutCards" });

export { __nuxt_component_2 as _, __nuxt_component_3 as a, __nuxt_component_1 as b };
//# sourceMappingURL=Cards-NdQESvCc.mjs.map
