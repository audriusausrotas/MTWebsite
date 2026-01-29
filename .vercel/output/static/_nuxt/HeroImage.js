import { _ as p } from "./NuxtImg.js";
import { _ as b } from "./NuxtLinkLocale.js";
import {
  W as f,
  P as x,
  b as g,
  l as d,
  a as r,
  o as c,
  K as l,
  w as _,
  i,
  L as u,
  U as h,
  V as B,
  k as a,
  d as w,
} from "./entry.js";
const v = () => {
    const t = f(),
      { t: n } = x();
    return {
      breadcrumbs: g(() =>
        t.matched
          .filter((e) => e.meta?.breadcrumb)
          .map((e) => ({ label: n(`breadcrumbs.${e.meta.breadcrumb}`), to: e.path })),
      ),
    };
  },
  k = { class: "max-w-default m-auto h-20 flex gap-2 items-center capitalize px-4 text-sm" },
  $ = d({
    __name: "Breadcrumbs",
    setup(t) {
      const { breadcrumbs: n } = v();
      return (s, e) => {
        const o = b;
        return (
          c(),
          r("div", k, [
            l(
              o,
              { to: "/" },
              { default: _(() => [i(u(s.$t("breadcrumbs.pagrindinis")), 1)]), _: 1 },
            ),
            (c(!0),
            r(
              h,
              null,
              B(
                w(n),
                (m) => (
                  c(),
                  r("p", { key: m.to, class: "last:text-red-main last:font-semibold" }, [
                    e[0] || (e[0] = a("span", { class: "text-red-main" }, "> ", -1)),
                    l(o, { to: m.to }, { default: _(() => [i(u(m.label), 1)]), _: 2 }, 1032, [
                      "to",
                    ]),
                  ])
                ),
              ),
              128,
            )),
          ])
        );
      };
    },
  }),
  N = Object.assign($, { __name: "BaseBreadcrumbs" }),
  j = { class: "relative w-full h-80" },
  I = { class: "relative max-w-default w-full m-auto" },
  L = { class: "absolute -top-24 left-4 text-4xl font-medium text-white tracking-wide" },
  V = d({
    __name: "HeroImage",
    props: { url: { default: "/images/hero1.jpg" }, name: { default: "" } },
    setup(t) {
      return (n, s) => {
        const e = p,
          o = N;
        return (
          c(),
          r("div", null, [
            a("div", j, [
              l(e, { src: t.url, class: "w-full h-full object-cover" }, null, 8, ["src"]),
              s[0] || (s[0] = a("div", { class: "absolute inset-0 bg-black/50" }, null, -1)),
              a("div", I, [a("h1", L, u(t.name), 1)]),
            ]),
            l(o),
          ])
        );
      };
    },
  }),
  O = Object.assign(V, { __name: "BaseHeroImage" });
export { O as _ };
