import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { u as useLocalePath, c as useI18n, e as useRoute, f as createError, g as useBreadcrumbTitle, h as articleSitePath, i as useArticleAlternates, j as useSeoMeta, a as useHead, I as ImageComponent, d as __nuxt_component_1 } from './server.mjs';
import { u as useFetch, _ as __nuxt_component_2 } from './ContentRenderer-zBhYmDr3.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { M as absoluteUrl } from '../_/nitro.mjs';
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
import '@vue/shared';
import 'property-information';
import 'minimark/hast';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const route = useRoute();
    const decodePath = (path) => {
      try {
        return decodeURI(path);
      } catch {
        return path;
      }
    };
    const contentPath = computed(() => decodePath(route.path).replace(/^\/en(?=\/)/, ""));
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/content", {
      key: `article-${locale.value}-${contentPath.value}`,
      query: { locale: locale.value, path: contentPath.value }
    }, "$OwmxN9a1XJ")), __temp = await __temp, __restore(), __temp);
    if (error.value || !data.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const page = computed(() => data.value.doc);
    useBreadcrumbTitle().value = page.value.title;
    const otherLocale = locale.value === "en" ? "lt" : "en";
    useArticleAlternates().value = {
      [locale.value]: articleSitePath(page.value.path),
      ...page.value.translation ? { [otherLocale]: articleSitePath(page.value.translation) } : {}
    };
    const title = computed(() => page.value.seoTitle || page.value.title);
    const description = computed(() => page.value.seoDescription || page.value.description);
    const image = computed(() => page.value.image ? absoluteUrl(page.value.image) : void 0);
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: "article",
      ...image.value ? { ogImage: image.value } : {}
    });
    useHead(() => ({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.value.title,
            description: description.value,
            image: image.value,
            datePublished: page.value.date,
            inLanguage: locale.value,
            mainEntityOfPage: absoluteUrl(route.path),
            publisher: { "@type": "Organization", name: "Moderni Tvora" }
          })
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_NuxtImg = ImageComponent;
      const _component_ContentRenderer = __nuxt_component_2;
      const _component_BaseButton = __nuxt_component_1;
      _push(ssrRenderComponent(_component_BaseWrapper, mergeProps({ "own-heading": "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(page)) {
              _push2(`<div class="flex flex-col gap-8 md:gap-16 max-w-default w-full p-4 md:p-24 m-auto bg-white rounded-lg shadow-2xl"${_scopeId}><article${_scopeId}>`);
              if (unref(page).image) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: unref(page).image,
                  alt: unref(page).title,
                  sizes: "sm:100vw md:100vw lg:1000px",
                  class: "rounded-md w-full max-h-168 object-cover object-center"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_ContentRenderer, {
                value: unref(page),
                class: "prose prose-lg px-4 max-w-default w-full m-auto mt-14"
              }, null, _parent2, _scopeId));
              _push2(`</article><div class="grid grid-cols-1 md:grid-cols-2 gap-8"${_scopeId}><div class="flex flex-col gap-4 justify-between flex-1 px-4"${_scopeId}><h2 class="font-semibold text-xl text-center md:text-left"${_scopeId}>${ssrInterpolate(_ctx.$t("articles.article.title"))}</h2><p class="text-justify leading-8"${_scopeId}>${ssrInterpolate(_ctx.$t("articles.article.text"))}</p>`);
              _push2(ssrRenderComponent(_component_BaseButton, {
                to: unref(localePath)("/kontaktai"),
                width: "w-full md:w-48"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("articles.article.button-text"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("articles.article.button-text")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: "/images/tvoros/tvora5.jpg",
                alt: "",
                sizes: "sm:100vw md:600px",
                loading: "lazy",
                class: "rounded w-full max-h-80 h-full object-cover"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(page) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-8 md:gap-16 max-w-default w-full p-4 md:p-24 m-auto bg-white rounded-lg shadow-2xl"
              }, [
                createVNode("article", null, [
                  unref(page).image ? (openBlock(), createBlock(_component_NuxtImg, {
                    key: 0,
                    src: unref(page).image,
                    alt: unref(page).title,
                    sizes: "sm:100vw md:100vw lg:1000px",
                    class: "rounded-md w-full max-h-168 object-cover object-center"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                  createVNode(_component_ContentRenderer, {
                    value: unref(page),
                    class: "prose prose-lg px-4 max-w-default w-full m-auto mt-14"
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8" }, [
                  createVNode("div", { class: "flex flex-col gap-4 justify-between flex-1 px-4" }, [
                    createVNode("h2", { class: "font-semibold text-xl text-center md:text-left" }, toDisplayString(_ctx.$t("articles.article.title")), 1),
                    createVNode("p", { class: "text-justify leading-8" }, toDisplayString(_ctx.$t("articles.article.text")), 1),
                    createVNode(_component_BaseButton, {
                      to: unref(localePath)("/kontaktai"),
                      width: "w-full md:w-48"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("articles.article.button-text")), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ]),
                  createVNode(_component_NuxtImg, {
                    src: "/images/tvoros/tvora5.jpg",
                    alt: "",
                    sizes: "sm:100vw md:600px",
                    loading: "lazy",
                    class: "rounded w-full max-h-80 h-full object-cover"
                  })
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/straipsniai/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CJzaSBXd.mjs.map
