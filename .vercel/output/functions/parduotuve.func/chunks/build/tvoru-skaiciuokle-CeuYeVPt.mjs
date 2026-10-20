import { _ as __nuxt_component_0$2 } from './Wrapper-BAHSbD5B.mjs';
import { defineComponent, withAsyncContext, withCtx, createVNode, mergeProps, unref, reactive, computed, watch, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFences } from './useFences-B8wmbRIS.mjs';
import { b as useState, I as ImageComponent } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    placeholder: { default: "" },
    label: { default: "" },
    type: { default: "text" },
    name: { default: "" },
    width: { default: "w-60" },
    active: { type: Boolean, default: false },
    variant: { default: "" },
    disable: { type: Boolean, default: false }
  },
  emits: ["onChange", "EnterPressed"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col", [__props.width, __props.label ? "h-16" : "h-10"]]
      }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.label)} class="pl-2 pb-1 capitalize text-sm bg-inherit">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([__props.disable ? "bg-gray-300" : __props.variant === "dark" ? "bg-gray-300" : "bg-white", "flex items-center justify-center h-10 gap-3 px-4 border rounded-lg shadow-md border-stone-300"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (!__props.disable) {
        _push(`<input${ssrRenderAttr("value", __props.name)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("id", __props.label)}${ssrRenderAttr("type", __props.type)}${ssrIncludeBooleanAttr(__props.disable) ? " disabled" : ""} class="w-full h-full bg-inherit active:outline-none focus:outline-none">`);
      } else if (__props.disable && __props.name) {
        _push(`<p>${ssrInterpolate(__props.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Input.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_1$2 = Object.assign(_sfc_main$a, { __name: "BaseInput" });
const useCalculations = () => {
  const { fences } = useFences();
  const client = reactive({ name: "", address: "", phone: "", email: "" });
  const selectedFence = useState("selectedFence", () => "");
  const selectedColor = useState("selectedColor", () => "");
  const selectedSeeThrough = useState("selectedSeeThrough", () => "");
  const selectedTwoSided = useState("selectedTwoSided", () => false);
  const selectedSpace = useState("selectedSpace", () => 2);
  const selectedFenceType = computed(
    () => fences.value.find((f) => f.name.includes(selectedFence.value))?.category || null
  );
  watch(selectedTwoSided, (val) => {
    selectedSpace.value = val ? 6 : 2;
  });
  return {
    client,
    selectedFence,
    selectedColor,
    selectedSeeThrough,
    selectedTwoSided,
    selectedSpace,
    selectedFenceType
  };
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Client",
  __ssrInlineRender: true,
  setup(__props) {
    const { client } = useCalculations();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseInput = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><h3 class="text-xl font-bold">Įveskite kliento informaciją</h3><div class="grid grid-cols-4 gap-4">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        onOnChange: (value) => unref(client).name = value,
        id: "name",
        width: "w-full",
        label: "Vardas",
        name: unref(client).name
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        onOnChange: (value) => unref(client).address = value,
        id: "address",
        width: "w-full",
        label: "Adresas",
        name: unref(client).address
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        onOnChange: (value) => unref(client).phone = value,
        type: "tel",
        id: "phone",
        width: "w-full",
        label: "Telefonas",
        name: unref(client).phone
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        onOnChange: (value) => unref(client).email = value,
        type: "email",
        id: "email",
        width: "w-full",
        label: "Elektroninis paštas",
        name: unref(client).email
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Client.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$9, { __name: "CalculatorClient" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ButtonWithPicture",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      required: false,
      default: ""
    },
    name: {
      type: String,
      required: true
    },
    selected: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: Boolean,
      required: false,
      default: true
    },
    color: {
      type: String,
      required: false,
      default: ""
    }
  },
  emits: ["onSelect"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col border-2 rounded-lg text-center hover:cursor-pointer p-2", [props.selected === __props.name ? "border-red-600" : "border-transparent"]]
      }, _attrs))}>`);
      if (__props.image) {
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: props.src,
          class: "object-center object-cover rounded-md w-40 h-32"
        }, null, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([__props.color, "w-40 h-32 rounded-md"])}"></div>`);
      }
      _push(`<div>${ssrInterpolate(props.name)}</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/ButtonWithPicture.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$8, { __name: "CalculatorButtonWithPicture" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Fences",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedFence } = useCalculations();
    const selectHandler = (value) => {
      selectedFence.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CalculatorButtonWithPicture = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><h2 class="text-xl font-bold">Pasirinkite tvoros profilį</h2><div class="flex gap-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/daimond6090.jpg",
        name: "Daimond 60/90",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/daimond40105.jpg",
        name: "Daimond 40/105",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/daimond60140.jpg",
        name: "Daimond 60/140",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/daimondvertical.jpg",
        name: "Daimond Vertical",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/plank.jpg",
        name: "Plank",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/eglė.jpg",
        name: "Eglė",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/eglėplus.jpg",
        name: "Eglė Plus",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/žaliuzi.jpg",
        name: "Žaliuzi",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/dilė.jpg",
        name: "Dilė",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/kaip-issirinkti-tvora.jpg",
        name: "Tvoralentė Alba",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/tvora22.jpg",
        name: "Segmentas",
        selected: unref(selectedFence),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Fences.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$7, { __name: "CalculatorFences" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SeeThrough",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedSeeThrough } = useCalculations();
    const selectHandler = (value) => {
      selectedSeeThrough.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CalculatorButtonWithPicture = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><h2 class="text-xl font-bold">Pasirinkite tvoros pramatomumą</h2><div class="flex gap-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/eglėplus.jpg",
        name: "Aklina",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/daimond6090.jpg",
        name: "Nepramatoma",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/tvora8.jpg",
        name: "Vidutiniška",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/plank.jpg",
        name: "pramatoma",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/tvora7.jpg",
        name: "25% pramatomumas",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/tvora17.jpg",
        name: "50% pramatomumas",
        selected: unref(selectedSeeThrough),
        onOnSelect: selectHandler
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/SeeThrough.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$6, { __name: "CalculatorSeeThrough" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FenceboardData",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedTwoSided, selectedSpace } = useCalculations();
    const selectHandler = (value) => {
      selectedTwoSided.value = value === "Vienpusės" ? false : true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CalculatorButtonWithPicture = __nuxt_component_0;
      const _component_BaseInput = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><h2 class="text-xl font-bold">Pasirinkite tvoralenčių montavimo būdą</h2><div class="flex flex-col gap-4"><div class="flex gap-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/dilė.jpg",
        name: "Vienpusės",
        selected: unref(selectedTwoSided) ? "Dvipusės" : "Vienpusės",
        onOnSelect: selectHandler
      }, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        src: "/images/tvoros/tvora20.jpg",
        name: "Dvipusės",
        selected: unref(selectedTwoSided) ? "Dvipusės" : "Vienpusės",
        onOnSelect: selectHandler
      }, null, _parent));
      _push(`</div><div class="flex flex-col gap-1 w-92">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        name: unref(selectedSpace),
        type: "number",
        label: "Pasirinkite norimą tarpą tarp tvoralenčių *",
        onOnChange: (value) => selectedSpace.value = +value,
        width: "w-full"
      }, null, _parent));
      _push(`<p class="text-xs text-gray-500 pl-2"> * standartiniai tarpai parenkami automatiškai pakeitus tvoralenčių montavimo būdą </p></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/FenceboardData.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$5, { __name: "CalculatorFenceboardData" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Colors",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedColor, selectedFenceType } = useCalculations();
    const selectHandler = (value) => {
      selectedColor.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CalculatorButtonWithPicture = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><h2 class="text-xl font-bold">Pasirinkite tvoros spalvą pagal RAL spalvų paletę</h2><div class="flex gap-2 flex-wrap">`);
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          name: "9005",
          color: "bg-black",
          image: false,
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        name: "7016",
        color: "bg-gray-800",
        image: false,
        selected: unref(selectedColor),
        onOnSelect: selectHandler
      }, null, _parent));
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-gray-600",
          image: false,
          name: "7024",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) !== "Segmentas") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-yellow-950",
          image: false,
          name: "8019",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
        color: "bg-orange-900",
        image: false,
        name: "8017",
        selected: unref(selectedColor),
        onOnSelect: selectHandler
      }, null, _parent));
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-green-900",
          image: false,
          name: "6020",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) === "Segmentas") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-green-800",
          image: false,
          name: "6005",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) === "Segmentas") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-gray-200",
          image: false,
          name: "Zn",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-red-900",
          image: false,
          name: "3009",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorButtonWithPicture, {
          color: "bg-amber-800",
          image: false,
          name: "8004",
          selected: unref(selectedColor),
          onOnSelect: selectHandler
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Colors.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$4, { __name: "CalculatorColors" });
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}>kitos medžiagos</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Parts.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]), { __name: "CalculatorParts" });
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}>vartu duomeys</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Gates.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "CalculatorGates" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Main",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedFenceType } = useCalculations();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CalculatorClient = __nuxt_component_0$1;
      const _component_CalculatorFences = __nuxt_component_1$1;
      const _component_CalculatorSeeThrough = __nuxt_component_2;
      const _component_CalculatorFenceboardData = __nuxt_component_3;
      const _component_CalculatorColors = __nuxt_component_4;
      const _component_CalculatorParts = __nuxt_component_5;
      const _component_CalculatorGates = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-20" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CalculatorClient, null, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorFences, null, null, _parent));
      if (unref(selectedFenceType) === "Tvora") {
        _push(ssrRenderComponent(_component_CalculatorSeeThrough, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(selectedFenceType) === "Tvoralentė") {
        _push(ssrRenderComponent(_component_CalculatorFenceboardData, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_CalculatorColors, null, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorParts, null, null, _parent));
      _push(ssrRenderComponent(_component_CalculatorGates, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Calculator/Main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "CalculatorMain" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tvoru-skaiciuokle",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeo("tvoru-skaiciuokle");
    [__temp, __restore] = withAsyncContext(() => loadSiteData("fences")), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0$2;
      const _component_CalculatorMain = __nuxt_component_1;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CalculatorMain, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CalculatorMain)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tvoru-skaiciuokle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tvoru-skaiciuokle-CeuYeVPt.mjs.map
