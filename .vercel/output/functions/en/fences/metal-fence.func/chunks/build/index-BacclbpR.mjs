import { _ as __nuxt_component_0 } from './Wrapper-BAHSbD5B.mjs';
import { u as useLocalePath, c as useI18n, e as useRoute, I as ImageComponent, _ as __nuxt_component_0$2, d as __nuxt_component_1$1, n as navigateTo } from './server.mjs';
import { u as useFetch, _ as __nuxt_component_2 } from './ContentRenderer-zBhYmDr3.mjs';
import { d as demotedHeadings } from './demotedHeadings-Cm1cqYjJ.mjs';
import { defineComponent, withCtx, createVNode, withAsyncContext, computed, mergeProps, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useSeo } from './useSeo-DMuJFlsz.mjs';
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
import '@vue/shared';
import 'property-information';
import 'minimark/hast';

const perPage = 5;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Main",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const route = useRoute();
    const getSlug = (path) => path.split("/").pop() ?? "";
    const { data: articles } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/articles", {
      key: `articles-${locale.value}`,
      query: { locale },
      default: () => []
    }, "$UeFUdWq9ru")), __temp = await __temp, __restore(), __temp);
    const totalPages = computed(() => Math.max(1, Math.ceil(articles.value.length / perPage)));
    const currentPage = computed(() => {
      const page = Number.parseInt(String(route.query.page ?? "1"), 10);
      return Number.isFinite(page) ? Math.min(Math.max(page, 1), totalPages.value) : 1;
    });
    const pagedArticles = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      return articles.value.slice(start, start + perPage);
    });
    const goToPage = async (page) => {
      await navigateTo({ query: { ...route.query, page: page > 1 ? page : void 0 } });
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    };
    const nextPage = () => currentPage.value < totalPages.value && goToPage(currentPage.value + 1);
    const prevPage = () => currentPage.value > 1 && goToPage(currentPage.value - 1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = ImageComponent;
      const _component_ContentRenderer = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_BaseButton = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-3 gap-8" }, _attrs))} data-v-515f8f21><div class="flex flex-col gap-8 col-span-2" data-v-515f8f21><!--[-->`);
      ssrRenderList(unref(pagedArticles), (item) => {
        _push(`<div class="flex flex-col gap-4 p-8 rounded-lg shadow-xl bg-white" data-v-515f8f21>`);
        if (item.image) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: item.image,
            alt: item.title,
            sizes: "sm:100vw md:100vw lg:800px",
            class: "w-full rounded max-h-134 object-cover object-center"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (item.excerpt) {
          _push(ssrRenderComponent(_component_ContentRenderer, {
            value: item.excerpt,
            excerpt: true,
            components: "demotedHeadings" in _ctx ? _ctx.demotedHeadings : unref(demotedHeadings),
            class: "prose text-justify"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)({ name: "straipsniai-slug", params: { slug: getSlug(item.path) } }),
          class: "font-bold text-red-600 mt-2 inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("articles.pagination.read-more"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("articles.pagination.read-more")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(articles).length > perPage) {
        _push(`<div class="flex justify-center gap-4 mt-6" data-v-515f8f21>`);
        _push(ssrRenderComponent(_component_BaseButton, {
          onClick: prevPage,
          disabled: unref(currentPage) === 1,
          class: "bg-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("articles.pagination.previous"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("articles.pagination.previous")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="px-4 py-2" data-v-515f8f21>${ssrInterpolate(_ctx.$t("articles.pagination.page"))} ${ssrInterpolate(unref(currentPage))} ${ssrInterpolate(_ctx.$t("articles.pagination.of"))} ${ssrInterpolate(unref(totalPages))}</span>`);
        _push(ssrRenderComponent(_component_BaseButton, {
          onClick: nextPage,
          disabled: unref(currentPage) === unref(totalPages),
          class: "bg-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("articles.pagination.next"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("articles.pagination.next")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden lg:flex flex-col w-full max-w-96 min-w-80 gap-6 bg-white rounded-lg shadow-xl p-6 max-h-fit" data-v-515f8f21><h2 class="font-semibold text-4xl text-center" data-v-515f8f21>${ssrInterpolate(_ctx.$t("articles.pagination.articles"))}</h2><!--[-->`);
      ssrRenderList(unref(articles), (item) => {
        _push(`<div data-v-515f8f21>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)({ name: "straipsniai-slug", params: { slug: getSlug(item.path) } }),
          class: "hover:text-red-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="font-medium" data-v-515f8f21${_scopeId}>${ssrInterpolate(item.title)}</span>`);
            } else {
              return [
                createVNode("span", { class: "font-medium" }, toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Articles/Main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-515f8f21"]]), { __name: "ArticlesMain" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo("straipsniai");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseWrapper = __nuxt_component_0;
      const _component_ArticlesMain = __nuxt_component_1;
      _push(ssrRenderComponent(_component_BaseWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ArticlesMain, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ArticlesMain)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/straipsniai/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BacclbpR.mjs.map
