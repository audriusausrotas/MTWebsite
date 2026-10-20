import { c as useI18n, I as ImageComponent } from './server.mjs';
import { defineComponent, ref, watch, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GalleryFullscreen",
  __ssrInlineRender: true,
  props: {
    images: {},
    currentImage: {}
  },
  emits: ["closeModal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { locale } = useI18n();
    const currentImageIndex = ref(props.currentImage);
    ref(null);
    const thumbRefs = ref([]);
    const altOf = (image) => (locale.value === "en" ? image?.altEN : image?.alt) || image?.name || "";
    watch(
      () => props.currentImage,
      (val) => currentImageIndex.value = val
    );
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
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div tabindex="0" role="dialog" aria-modal="true" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center select-none"><div class="flex flex-col overflow-hidden justify-between max-w-default w-full max-h-250 h-full bg-white rounded-md"><div class="flex justify-between gap-4 bg-stone-300 py-2 px-4"><div class="text-lg font-semibold">${ssrInterpolate(unref(currentImageIndex) + 1)} / ${ssrInterpolate(__props.images.length)}</div><div class="text-lg font-semibold">${ssrInterpolate(__props.images[unref(currentImageIndex)]?.name)}</div><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("gallery.close"))} class="hover:text-red-600 transition-all hover:cursor-pointer hover:scale-125"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-4 relative min-h-0 flex-1">`);
        _push2(ssrRenderComponent(_component_NuxtImg, {
          key: unref(currentImageIndex),
          src: __props.images[unref(currentImageIndex)]?.url,
          alt: altOf(__props.images[unref(currentImageIndex)]),
          sizes: "sm:100vw md:100vw lg:1200px",
          class: "max-h-196 w-full h-full object-contain rounded"
        }, null, _parent));
        _push2(`<button type="button"${ssrRenderAttr("aria-label", _ctx.$t("gallery.previous"))} class="text-black transition-all hover:scale-125 hover:cursor-pointer p-1 absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-white/60"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg></button><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("gallery.next"))} class="text-black transition-all hover:scale-125 hover:cursor-pointer p-1 absolute top-1/2 right-6 -translate-y-1/2 rounded-full bg-white/70"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg></button></div><div class="flex overflow-x-auto mx-4 mb-4 rounded-lg shrink-0"><div class="flex gap-2 scroll-smooth"><!--[-->`);
        ssrRenderList(__props.images, (image, index) => {
          _push2(`<button type="button" class="${ssrRenderClass([
            "shrink-0 rounded-md overflow-hidden transition-all duration-200 border-3 hover:cursor-pointer",
            index === unref(currentImageIndex) ? "border-black" : "hover:scale-105 border-transparent"
          ])}">`);
          if (image.url) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: image.url,
              alt: altOf(image),
              width: "112",
              height: "112",
              fit: "cover",
              class: "w-28 h-28 object-cover"
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</button>`);
        });
        _push2(`<!--]--></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/GalleryFullscreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "BaseGalleryFullscreen" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=GalleryFullscreen-Inr1DAUG.mjs.map
