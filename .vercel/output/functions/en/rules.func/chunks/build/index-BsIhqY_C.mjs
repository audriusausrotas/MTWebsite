import { _ as __nuxt_component_2$1, a as __nuxt_component_3$1, b as __nuxt_component_1$2 } from './Cards-NdQESvCc.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useLocalePath, a as useHead, I as ImageComponent, _ as __nuxt_component_0$2 } from './server.mjs';
import { S as SITE_URL, T as SITE_NAME, U as DEFAULT_OG_IMAGE, z as publicAssetsURL } from '../_/nitro.mjs';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { _ as __nuxt_component_1$1, a as __nuxt_component_2$2 } from './Map-CB1r8jGO.mjs';
import { u as useSeo } from './useSeo-DMuJFlsz.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'node:crypto';

const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BaseVideo = __nuxt_component_1$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_BaseVideo, { height: 900 }, null, _parent));
  _push(`<div class="absolute top-0 left-0 h-225 w-full bg-black/30"></div><div class="relative max-w-default w-full m-auto"><h1 class="absolute -top-96 left-4 text-4xl font-medium text-white tracking-wide max-w-120">${ssrInterpolate(_ctx.$t("home.title"))}</h1></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/HeroVideo.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]), { __name: "HomeHeroVideo" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ArrowButton",
  __ssrInlineRender: true,
  props: {
    name: { default: "" },
    variant: { default: "primary" },
    to: { default: "#" },
    customText: { default: "" }
  },
  setup(__props) {
    const variants = {
      primary: {
        box: `
      border-red-main
      text-red-main
      bg--white
      group-hover:bg-red-main
      group-hover:text-white
    `,
        text: "text-black"
      },
      secondary: {
        box: `
      border-white
      text-white
      bg-red-main
      group-hover:bg-white
      group-hover:text-red-main
      group-hover:border-red-main
    `,
        text: "text-white"
      },
      third: {
        box: `
      border-white
      text-white
      bg-transparent
      group-hover:bg-red-main
      group-hover:border-red-main
    `,
        text: `
    text-white
    text-[24px]
    `
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "group flex items-center gap-4 hover:cursor-pointer"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([variants[__props.variant].box, "w-14 h-14 flex items-center justify-center border-2 transition-colors duration-100"])}"${_scopeId}><svg class="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"${_scopeId}><path d="M12 6 l8 6 -8 6 M4 12 h14" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg></div><p class="${ssrRenderClass([[variants[__props.variant].text, __props.customText], "text-sm font-semibold"])}"${_scopeId}>${ssrInterpolate(__props.name)}</p>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-14 h-14 flex items-center justify-center border-2 transition-colors duration-100", variants[__props.variant].box]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 fill-none stroke-current stroke-2",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    d: "M12 6 l8 6 -8 6 M4 12 h14",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ]))
              ], 2),
              createVNode("p", {
                class: ["text-sm font-semibold", [variants[__props.variant].text, __props.customText]]
              }, toDisplayString(__props.name), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/ArrowButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$5, { __name: "BaseArrowButton" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    url: {},
    to: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      const _component_BaseArrowButton = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-center h-80 overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: __props.url,
        alt: "",
        sizes: "sm:100vw md:50vw lg:600px",
        loading: "lazy",
        class: "absolute inset-0 w-full h-full object-cover"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseArrowButton, {
        class: "relative",
        name: __props.title,
        variant: "third",
        to: __props.to
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/ProductCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$4, { __name: "HomeProductCard" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Products",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeProductCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-default px-4 m-auto flex flex-col gap-10" }, _attrs))}><h3 class="text-4xl font-medium text-center sm:text-left">${ssrInterpolate(_ctx.$t("home.products"))}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.skardines-tvoros"),
        url: "/images/tvoros/daimond6090.jpg",
        to: unref(localePath)("/tvoros/skardines-tvoros")
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.metalines-tvoros"),
        url: "/images/tvoros/metalines-tvoros.jpg",
        to: unref(localePath)("/tvoros/metalines-tvoros")
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.tvoralentes"),
        url: "/images/tvoros/dilė.jpg",
        to: unref(localePath)("/tvoros/tvoralentes")
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.segmentines-tvoros"),
        url: "/images/tvoros/tvora22.jpg",
        to: unref(localePath)("/tvoros/segmentines-tvoros")
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.kiemo-vartai"),
        url: "/images/tvoros/tvora14.jpg",
        to: unref(localePath)("/kiemo-vartai")
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductCard, {
        title: _ctx.$t("menu.lauko-zaliuzes"),
        url: "/images/zaliuzes/blinds.jpg",
        to: unref(localePath)("/lauko-zaliuzes")
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/Products.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$3, { __name: "HomeProducts" });
const _imports_0 = publicAssetsURL("/icons/calculator.svg");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Calculator",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      const _component_BaseArrowButton = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex lg:flex-row flex-col text-white w-full max-w-default px-4 m-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/tvoros/tvora5.jpg",
        alt: "",
        sizes: "sm:100vw md:100vw lg:800px",
        loading: "lazy",
        class: "w-full object-cover max-h-100"
      }, null, _parent));
      _push(`<div class="bg-red-main p-8 lg:max-w-100 w-full flex flex-col gap-8 justify-center max-w-[calc(100%-32px)] mx-auto -mt-40 lg:m-0"><div class="flex gap-4"><img${ssrRenderAttr("src", _imports_0)} alt=""><h3 class="text-4xl">${ssrInterpolate(_ctx.$t("skaiciuokle.title"))}</h3></div><p>${ssrInterpolate(_ctx.$t("skaiciuokle.text"))}</p>`);
      _push(ssrRenderComponent(_component_BaseArrowButton, {
        name: _ctx.$t("skaiciuokle.button"),
        variant: "secondary",
        to: unref(localePath)("/tvoru-skaiciuokle")
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/Calculator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "HomeCalculator" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Crousel",
  __ssrInlineRender: true,
  props: {
    arr: {},
    images: { type: Boolean, default: true },
    gap: { default: 18 },
    speed: { default: 2e3 }
  },
  setup(__props) {
    const carouselConfig = {
      itemsToShow: 1.2,
      wrapAround: true,
      breakpoints: {
        640: { itemsToShow: 2 },
        1024: { itemsToShow: 2.5 }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      _push(ssrRenderComponent(unref(Carousel), mergeProps(carouselConfig, {
        autoplay: __props.speed,
        gap: __props.gap,
        transition: 500,
        class: "rounded overflow-hidden"
      }, _attrs), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.arr, (slide, index) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: __props.images ? slide.url : slide.name + index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-fit w-full" data-v-8434ca52${_scopeId2}>`);
                    if (__props.images) {
                      _push3(ssrRenderComponent(_component_NuxtImg, {
                        src: slide.url,
                        alt: "",
                        sizes: "sm:100vw md:500px",
                        loading: "lazy",
                        class: "w-full h-full object-cover rounded"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex flex-col gap-4" data-v-8434ca52${_scopeId2}><h6 class="text-2xl font-medium" data-v-8434ca52${_scopeId2}>${ssrInterpolate(slide.name)}</h6><p class="text-justify" data-v-8434ca52${_scopeId2}>${ssrInterpolate(slide.text)}</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-fit w-full" }, [
                        __props.images ? (openBlock(), createBlock(_component_NuxtImg, {
                          key: 0,
                          src: slide.url,
                          alt: "",
                          sizes: "sm:100vw md:500px",
                          loading: "lazy",
                          class: "w-full h-full object-cover rounded"
                        }, null, 8, ["src"])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-col gap-4" }, [
                          createVNode("h6", { class: "text-2xl font-medium" }, toDisplayString(slide.name), 1),
                          createVNode("p", { class: "text-justify" }, toDisplayString(slide.text), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.arr, (slide, index) => {
                return openBlock(), createBlock(unref(Slide), {
                  key: __props.images ? slide.url : slide.name + index
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "h-fit w-full" }, [
                      __props.images ? (openBlock(), createBlock(_component_NuxtImg, {
                        key: 0,
                        src: slide.url,
                        alt: "",
                        sizes: "sm:100vw md:500px",
                        loading: "lazy",
                        class: "w-full h-full object-cover rounded"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("h6", { class: "text-2xl font-medium" }, toDisplayString(slide.name), 1),
                        createVNode("p", { class: "text-justify" }, toDisplayString(slide.text), 1)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Home/Crousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-8434ca52"]]), { __name: "HomeCrousel" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo("home");
    const localePath = useLocalePath();
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: SITE_NAME,
            legalName: "MB „Moderni tvora“",
            url: SITE_URL,
            logo: SITE_URL + "/images/logo.png",
            image: SITE_URL + DEFAULT_OG_IMAGE,
            telephone: "+37066347011",
            email: "info@modernitvora.lt",
            vatID: "LT100013165913",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Lauko g. 1",
              addressLocality: "Trakiškių k., Marijampolės sav.",
              addressCountry: "LT"
            },
            sameAs: ["https://www.facebook.com/ModerniTvora"]
          })
        }
      ]
    });
    const images = [
      { url: "/images/tvoros/daimond6090.jpg" },
      { url: "/images/tvoros/daimond40105.jpg" },
      { url: "/images/tvoros/daimond60140.jpg" },
      { url: "/images/tvoros/daimondvertical.jpg" },
      { url: "/images/tvoros/dilė.jpg" },
      { url: "/images/tvoros/eglė.jpg" },
      { url: "/images/tvoros/plank.jpg" },
      { url: "/images/tvoros/žaliuzi.jpg" },
      { url: "/images/zaliuzes/blinds.jpg" },
      { url: "/images/zaliuzes/blinds2.jpg" }
    ];
    const reviews = [
      {
        name: "Rita",
        text: "Džiaugiuosi, kad kreipiausi būtent į šią įmonę. Visi numatyti darbai buvo atlikti laiku, pagal sąmatą ir labai kokybiškai. Montuotojai puikiai išmano savo darbą. Šiaip esu labai smulkmeniška, bet šiuo atveju nebuvo prie ko prikibti :). Dabar kiekvieną dieną žiūriu į savo tvorą ir džiaugiuosi, kokia ji graži. Ypatingas ačiū vadybininkui Hariui už kantrybę, mandagų bendravimą ir profesionalumą. Puikus kolektyvas ir puikus darbas. Jeigu ateityje reikės - kreipsiuosi tik į šią įmonę. Labai atsakingai rekomenduoju.",
        url: ""
      },
      {
        name: "Arvydas",
        text: "Puiki įmonė. Viską atliko kaip pažadėta ir dar anksčiau. Labai kruopštūs ir tvarkingi montuotojai. Gražus darbas. Rekomenduoju.",
        url: ""
      },
      {
        name: "Paulius",
        text: "Visų pirma tai labai norime padėkoti visai MODERNI TVORA KOMANDAI ! Esame naujakūriai, matėme nemažai brigadų, bet kaip savo darba atliko MODERNI TVORA - likome sužavėti. Nuo pačio projekto sudarimo, stulpų įrengimų, iki apdailos, ir pačios tvoros apšvietimo - likome patenkinti 100 % ! Papildomas ačiū Audriui ! Ačiū įmonės vadovui Andriui ! ačiū vyrukams kurie montavo stulpus, ačiū vyrukams kurie įrengė apdaila, ačiū vyrukui kuris puikiai įstatė ir pajungė vartus, ir dar vienas specialus ačiū vyrukams kurie įrengė puikų apšvietimą ! Jūsų visa komanda pateisino įmonės pavadinima MODERNI TVORA",
        url: ""
      },
      {
        name: "Justinas",
        text: "90% rekomendacijos. Laiku ir greitai atliktas darbas, aukšta aptarnavimo kokybė, puikus personalas (tiek vadovai tiek montuotojai). Darbas atliktas nepriekaištingai, nuo užsakymo iki tvoros montavimo. Sėkmės darbuose",
        url: ""
      },
      {
        name: "Mantas",
        text: "Esame dėkingi, Moderni tvora už puikią tvorą. Paskaičiavimai buvo atlikti labai tiksliai, montuojant nieko netrūko. Dėkojame vadybininkui Hariui už sklandžią komunikaciją, taip pat montuotojams. Užsakymas nevėlavo- rezultatas kuo puikiausias, buvo verta kiekvieno išleisto Euro. Rekomenduojame šią įmonę ir linkime jai sėkmės",
        url: ""
      },
      { name: "Sigita", text: "Tvora superine, vyrukai šaunūs, aciu", url: "" },
      {
        name: "Saulius",
        text: "Puiki įmonė. Darbas atliktas puikiai, sulaukėme darbo pabaigos po 3savaičių, tai yra greičiau, nei per sutartą laikotarpį. Konkretumas ir pagalba iš vadybininkų, dėl kilusių klausimų. Ačiū, už atliktą darbą. Rekomenduoju!!!",
        url: ""
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeHeroVideo = __nuxt_component_0$1;
      const _component_HomeProducts = __nuxt_component_1;
      const _component_HomeCalculator = __nuxt_component_2;
      const _component_BaseArrowButton = __nuxt_component_3;
      const _component_HomeCrousel = __nuxt_component_4;
      const _component_AboutBlock = __nuxt_component_2$1;
      const _component_AboutCards = __nuxt_component_3$1;
      const _component_ContactsBlock = __nuxt_component_1$1;
      const _component_ContactsMap = __nuxt_component_2$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-24" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HomeHeroVideo, null, null, _parent));
      _push(`<section>`);
      _push(ssrRenderComponent(_component_HomeProducts, null, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_HomeCalculator, null, null, _parent));
      _push(`</section><section class="flex flex-col gap-10 max-w-default px-4 m-auto"><div class="flex sm:justify-between justify-center flex-wrap gap-8 items-center"><h3 class="text-4xl font-medium">${ssrInterpolate(_ctx.$t("home.projects"))}</h3>`);
      _push(ssrRenderComponent(_component_BaseArrowButton, {
        name: _ctx.$t("home.seeMore"),
        to: unref(localePath)("/galerija"),
        "custom-text": "hidden sm:block"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_HomeCrousel, { arr: images }, null, _parent));
      _push(`</section><section class="flex flex-col gap-20 w-full max-w-default px-4 m-auto">`);
      _push(ssrRenderComponent(_component_AboutBlock, {
        title: _ctx.$t("menu.apie-mus"),
        text: _ctx.$t("about.aprasymas.text"),
        url: _ctx.$t("about.box1.url")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseArrowButton, {
              name: _ctx.$t("home.more"),
              to: unref(localePath)("/apie-mus")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseArrowButton, {
                name: _ctx.$t("home.more"),
                to: unref(localePath)("/apie-mus")
              }, null, 8, ["name", "to"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="max-w-default w-full m-auto px-4">`);
      _push(ssrRenderComponent(_component_AboutCards, null, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_ContactsBlock, null, null, _parent));
      _push(`</section><section class="hidden md:flex flex-col gap-10 max-w-default w-full px-4 m-auto h-fit"><h3 class="text-4xl font-medium">${ssrInterpolate(_ctx.$t("home.reviews"))}</h3>`);
      _push(ssrRenderComponent(_component_HomeCrousel, {
        arr: reviews,
        images: false,
        speed: 5e3,
        gap: 50
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_ContactsMap, null, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BsIhqY_C.mjs.map
