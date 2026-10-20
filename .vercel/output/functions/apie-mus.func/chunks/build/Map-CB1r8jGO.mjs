import { c as useI18n, d as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { z as publicAssetsURL } from '../_/nitro.mjs';

const _imports_0 = publicAssetsURL("/icons/phone.svg");
const _imports_1 = publicAssetsURL("/icons/location.svg");
const _imports_2 = publicAssetsURL("/icons/email.svg");
const email = "info@modernitvora.lt";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Block",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const mapLink = (address) => `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    const inquiryLink = computed(
      () => `mailto:${email}?subject=${encodeURIComponent(t("contacts.emailSubject"))}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseButton = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-default m-auto" }, _attrs))}><div class="flex flex-col gap-8"><h2 class="text-4xl font-medium text-center md:text-left">${ssrInterpolate(_ctx.$t("contacts.title"))}</h2><p class="text-justify w-full md:max-w-100">${ssrInterpolate(_ctx.$t("contacts.text"))}</p>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        href: unref(inquiryLink),
        width: "w-full md:w-48"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("contacts.button"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("contacts.button")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col gap-8 text-xl w-fit md:w-full md:m-0 m-auto"><a${ssrRenderAttr("href", `tel:${_ctx.$t("contacts.ofisoTelNr").replaceAll(" ", "")}`)} class="flex gap-4 items-center group"><img${ssrRenderAttr("src", _imports_0)} alt=""><span class="group-hover:border-black border-b-2 border-transparent transition-colors">${ssrInterpolate(_ctx.$t("contacts.ofisoTelNr"))}</span></a><a${ssrRenderAttr("href", mapLink(_ctx.$t("contacts.registracijosAdresas")))} target="_blank" rel="noopener noreferrer" class="flex gap-4 items-center group"><img${ssrRenderAttr("src", _imports_1)} alt=""><span class="group-hover:border-black border-b-2 border-transparent transition-colors">${ssrInterpolate(_ctx.$t("contacts.registracijosAdresas"))}</span></a><a${ssrRenderAttr("href", mapLink(_ctx.$t("contacts.ofiso2Adresas")))} target="_blank" rel="noopener noreferrer" class="flex gap-4 items-center group"><img${ssrRenderAttr("src", _imports_1)} alt=""><span class="group-hover:border-black border-b-2 border-transparent transition-colors">${ssrInterpolate(_ctx.$t("contacts.ofiso2Adresas"))}</span></a><a${ssrRenderAttr("href", `mailto:${email}`)} class="flex gap-4 items-center group"><img${ssrRenderAttr("src", _imports_2)} alt=""><span class="group-hover:border-black border-b-2 border-transparent transition-colors">${ssrInterpolate(email)}</span></a></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contacts/Block.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "ContactsBlock" });
const LAT = 54.562596;
const LNG = 23.350908;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Map",
  __ssrInlineRender: true,
  setup(__props) {
    const googleLink = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
    const wazeLink = `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><iframe title="Moderni Tvora – Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2313.3492495316086!2d23.35090847672694!3d54.56259618303032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1333c44313cc1%3A0x696d941962a243c!2sModerni%20tvora!5e0!3m2!1sen!2slt!4v1698226287802!5m2!1sen!2slt" width="100%" height="400" style="${ssrRenderStyle({ "border": "0" })}"${ssrIncludeBooleanAttr(true) ? " allowfullscreen" : ""} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><div class="absolute bottom-6 right-4 flex flex-wrap justify-end gap-2"><a${ssrRenderAttr("href", googleLink)} target="_blank" rel="noopener noreferrer" class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors">${ssrInterpolate(_ctx.$t("map.google"))}</a><a${ssrRenderAttr("href", wazeLink)} target="_blank" rel="noopener noreferrer" class="h-10 px-4 flex items-center rounded-md bg-white text-sm font-semibold shadow-lg hover:text-red-main transition-colors">${ssrInterpolate(_ctx.$t("map.waze"))}</a></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contacts/Map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "ContactsMap" });

export { __nuxt_component_1 as _, __nuxt_component_2 as a };
//# sourceMappingURL=Map-CB1r8jGO.mjs.map
