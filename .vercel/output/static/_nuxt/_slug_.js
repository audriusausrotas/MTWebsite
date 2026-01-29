import { _ as k } from "./HeroImage.js";
import { _ as w } from "./NuxtImg.js";
import { _ as y, u as h, q as b } from "./client.js";
import { _ as T } from "./Button.js";
import {
  l as j,
  N as B,
  O as C,
  P as N,
  b as m,
  Q as V,
  R as D,
  S as I,
  a as P,
  K as i,
  k as a,
  d as s,
  c as S,
  h as $,
  w as A,
  o as d,
  i as R,
  F as q,
  _ as z,
} from "./entry.js";
import "./NuxtLinkLocale.js";
import "./nuxt-link.js";
const H = {
    class: "flex flex-col gap-16 max-w-default w-full p-24 m-auto bg-white rounded-lg shadow-2xl",
  },
  M = { class: "flex gap-8" },
  E = { class: "flex flex-col gap-4 justify-between flex-1 px-4" },
  F = j({
    __name: "[slug]",
    async setup(K) {
      let n, l;
      const _ = B(),
        r = C(),
        { locale: u } = N(),
        c = m(() => r.path.replace(/^\/[a-z]{2}(?=\/)/, "")),
        { data: e } =
          (([n, l] = V(async () =>
            h(
              "page-" + c.value,
              async () => {
                const o = "content_" + u.value;
                return await b(o).path(c.value).first();
              },
              { watch: [u] },
            ),
          )),
          (n = await n),
          l(),
          n),
        v = m(() => `https://modernitvora.lt${r.path}`);
      return (
        D({
          title: () => e.value?.seoTitle || e.value?.title,
          description: () => e.value?.seoDescription || e.value?.description,
        }),
        I(() => ({
          meta: [
            { property: "og:title", content: e.value?.seoTitle || e.value?.title },
            {
              property: "og:description",
              content: e.value?.seoDescription || e.value?.description,
            },
            { property: "og:image", content: e.value?.image },
            { name: "twitter:title", content: e.value?.seoTitle || e.value?.title },
            {
              name: "twitter:description",
              content: e.value?.seoDescription || e.value?.description,
            },
            { name: "twitter:image", content: e.value?.image },
            { name: "twitter:card", content: "summary_large_image" },
          ],
          link: [{ rel: "canonical", href: v.value }],
        })),
        (o, t) => {
          const f = k,
            p = w,
            g = y,
            x = T;
          return (
            d(),
            P("div", null, [
              i(f, { name: o.$t("breadcrumbs.straipsniai") }, null, 8, ["name"]),
              a("div", H, [
                i(p, { src: s(e)?.image, class: "rounded-md" }, null, 8, ["src"]),
                a("article", null, [
                  s(e)
                    ? (d(),
                      S(
                        g,
                        {
                          key: 0,
                          value: s(e),
                          class: "prose prose-lg px-4 max-w-default w-full m-auto mt-14",
                        },
                        null,
                        8,
                        ["value"],
                      ))
                    : $("", !0),
                ]),
                a("div", M, [
                  a("div", E, [
                    t[2] ||
                      (t[2] = a(
                        "h4",
                        { class: "font-semibold text-xl" },
                        "Planuojate tvoros statybą?",
                        -1,
                      )),
                    t[3] ||
                      (t[3] = a(
                        "p",
                        { class: "text-justify leading-8" },
                        " Nežinote, kokią tvorą pasirinkti? Turite kitų klausimų? Susisiekite su Moderni Tvora tvorų specialistais, kurie išklausę jūsų poreikius pasiūlys individualizuotą sprendimą bei atliks visus darbus. Viskas vienoje vietoje nuo A iki Z. ",
                        -1,
                      )),
                    i(
                      x,
                      {
                        onClick:
                          t[0] ||
                          (t[0] = (L) =>
                            ("navigateTo" in o ? o.navigateTo : s(q))(s(_)("/kontaktai"))),
                      },
                      { default: A(() => [...(t[1] || (t[1] = [R("Susisiekti", -1)]))]), _: 1 },
                    ),
                  ]),
                  i(p, {
                    src: "/images/modernitvora_4909-2.jpg",
                    class: "rounded- max-h-80 h-full flex-1 object-cover",
                  }),
                ]),
              ]),
            ])
          );
        }
      );
    },
  }),
  X = z(F, [["__scopeId", "data-v-1f2ad3ea"]]);
export { X as default };
