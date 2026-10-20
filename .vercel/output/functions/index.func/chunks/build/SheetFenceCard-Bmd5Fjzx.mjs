import { u as useLocalePath, c as useI18n, d as __nuxt_component_1$1, I as ImageComponent } from './server.mjs';
import { _ as __nuxt_component_1$2 } from './GalleryFullscreen-Inr1DAUG.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GallerySmall",
  __ssrInlineRender: true,
  props: {
    images: {},
    fallbackAlt: {}
  },
  setup(__props) {
    const props = __props;
    const { locale } = useI18n();
    const currentImageIndex = ref(0);
    const thumbRefs = ref([]);
    const modalOpen = ref(false);
    const altOf = (image) => (locale.value === "en" ? image?.altEN : image?.alt) || props.fallbackAlt || image?.name || "";
    watch(currentImageIndex, (i) => {
      const el = thumbRefs.value[i];
      el?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      const _component_BaseGalleryFullscreen = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 justify-between w-full select-none" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        onClick: ($event) => modalOpen.value = true,
        key: unref(currentImageIndex),
        src: __props.images[unref(currentImageIndex)]?.url,
        alt: altOf(__props.images[unref(currentImageIndex)]),
        sizes: "sm:100vw md:600px",
        class: "w-full h-full max-h-108 object-contain hover:cursor-pointer"
      }, null, _parent));
      if (__props.images.length > 1) {
        _push(`<div class="flex overflow-x-auto max-w-full rounded-lg"><div class="flex gap-2 scroll-smooth"><!--[-->`);
        ssrRenderList(__props.images, (image, index) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "shrink-0 rounded-md overflow-hidden transition-all duration-200 border-2 hover:cursor-pointer",
            index === unref(currentImageIndex) ? "border-red-600" : "hover:scale-105 border-transparent"
          ])}">`);
          if (image.url) {
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: image.url,
              alt: altOf(image),
              width: "112",
              height: "112",
              fit: "cover",
              class: "w-28 h-28 object-cover"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(modalOpen)) {
        _push(ssrRenderComponent(_component_BaseGalleryFullscreen, {
          images: __props.images,
          currentImage: unref(currentImageIndex),
          onCloseModal: ($event) => modalOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/GallerySmall.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "BaseGallerySmall" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SheetFenceCard",
  __ssrInlineRender: true,
  props: {
    fence: {}
  },
  setup(__props) {
    const props = __props;
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const text = computed(
      () => (locale.value === "en" ? props.fence.descriptionEn : props.fence.description).split("<br>").map((line) => line.trim()).filter(Boolean)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseGallerySmall = __nuxt_component_0;
      const _component_BaseButton = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row gap-8 shadow-lg p-4 md:p-8 rounded-lg border border-gray-100" }, _attrs))}>`);
      if (__props.fence.images.length) {
        _push(`<div class="flex flex-1 min-w-0">`);
        _push(ssrRenderComponent(_component_BaseGallerySmall, {
          images: __props.fence.images,
          "fallback-alt": __props.fence.name
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col gap-8 flex-1"><h2 class="font-bold text-4xl text-center">${ssrInterpolate(__props.fence.name)}</h2><div class="flex flex-col gap-4 text-justify font-medium"><!--[-->`);
      ssrRenderList(unref(text), (item, index) => {
        _push(`<p>${ssrInterpolate(item)}</p>`);
      });
      _push(`<!--]--></div><div class="flex flex-col sm:flex-row gap-4 items-center justify-evenly">`);
      _push(ssrRenderComponent(_component_BaseButton, {
        to: unref(localePath)("/tvoru-skaiciuokle")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("fences.getPrice"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("fences.getPrice")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseButton, {
        to: unref(localePath)("/kontaktai")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("fences.constact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("fences.constact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Fences/SheetFenceCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "FencesSheetFenceCard" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=SheetFenceCard-Bmd5Fjzx.mjs.map
