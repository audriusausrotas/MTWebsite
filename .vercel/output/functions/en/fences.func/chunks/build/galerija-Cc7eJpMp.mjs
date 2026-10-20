import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { c as useI18n, I as ImageComponent, b as useState } from './server.mjs';
import { _ as __nuxt_component_1$1 } from './GalleryFullscreen-Inr1DAUG.mjs';
import { defineComponent, withAsyncContext, withCtx, createVNode, ref, unref, useSSRContext } from 'vue';
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

const useGallery = () => {
  const images = useState("images", () => []);
  return {
    images
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Main",
  __ssrInlineRender: true,
  setup(__props) {
    const { images } = useGallery();
    const { locale } = useI18n();
    const modalOpen = ref(false);
    const currentImage = ref(0);
    const openModal = (index) => {
      currentImage.value = index;
      modalOpen.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      const _component_BaseGalleryFullscreen = __nuxt_component_1$1;
      _push(`<!--[--><div class="gallery-grid max-w-default w-full m-auto pb-28 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 grid-flow-dense"><!--[-->`);
      ssrRenderList(unref(images), (image, index) => {
        _push(ssrRenderComponent(_component_NuxtImg, {
          key: image.url,
          src: image.url,
          alt: (unref(locale) === "en" ? image.altEN : image.alt) || image.name,
          sizes: "sm:100vw md:50vw lg:600px",
          loading: "lazy",
          class: "gallery-item hover:scale-105 hover:cursor-pointer w-full h-50 object-cover rounded transition-transform duration-300 nth-[3n]:row-span-2 nth-[3n]:h-104 nth-[7n]:col-span-2 nth-[7n]:row-span-2 nth-[7n]:h-104",
          onClick: ($event) => openModal(index)
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (unref(modalOpen)) {
        _push(ssrRenderComponent(_component_BaseGalleryFullscreen, {
          images: unref(images),
          currentImage: unref(currentImage),
          onCloseModal: ($event) => modalOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Gallery/Main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "GalleryMain" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "galerija",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeo("galerija");
    [__temp, __restore] = withAsyncContext(() => loadSiteData("gallery")), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_GalleryMain = __nuxt_component_1;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_GalleryMain, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_GalleryMain)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/galerija.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=galerija-Cc7eJpMp.mjs.map
