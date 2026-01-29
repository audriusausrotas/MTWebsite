import { a as _t, _ as xt, b as wt } from "./Cards.js";
import {
  _ as Xe,
  a as q,
  o as C,
  k as x,
  K as S,
  L as ne,
  l as O,
  c as ve,
  w as ae,
  M as Pe,
  Y as kt,
  N as je,
  d as L,
  X as St,
  a7 as yt,
  a8 as ge,
  n as E,
  b as _,
  a9 as At,
  aa as jt,
  q as Ge,
  ab as Tt,
  z as T,
  ac as Se,
  ad as ue,
  ae as ke,
  x as Dt,
  af as me,
  ag as Et,
  ah as It,
  ai as qe,
  U as Nt,
  V as Ot,
  h as Ct,
  a4 as Mt,
  P as Rt,
  R as Lt,
} from "./entry.js";
import { _ as $t } from "./nuxt-link.js";
import { _ as Ke } from "./NuxtImg.js";
import { _ as Bt, a as Pt } from "./Map.js";
import "./Button.js";
const Vt = {},
  Ht = { class: "relative" },
  zt = { class: "relative max-w-default w-full m-auto" },
  Ut = { class: "absolute -top-96 left-4 text-4xl font-medium text-white tracking-wide max-w-120" };
function Ft(e, t) {
  const a = _t;
  return (
    C(),
    q("div", Ht, [
      t[0] ||
        (t[0] = x("div", { class: "absolute top-0 left-0 h-225 w-full bg-black/30" }, null, -1)),
      S(a, { height: 900 }),
      x("div", zt, [x("h1", Ut, ne(e.$t("home.title")), 1)]),
    ])
  );
}
const Wt = Object.assign(Xe(Vt, [["render", Ft]]), { __name: "HomeHeroVideo" }),
  Yt = O({
    __name: "ArrowButton",
    props: { name: { default: "" }, variant: { default: "primary" }, to: { default: "#" } },
    setup(e) {
      const t = {
        primary: {
          box: `
      border-red-main
      text-red-main
      bg--white
      group-hover:bg-red-main
      group-hover:text-white
    `,
          text: "text-black",
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
          text: "text-white",
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
    `,
        },
      };
      return (a, n) => {
        const i = $t;
        return (
          C(),
          ve(
            i,
            { to: e.to, class: "group flex items-center gap-4 hover:cursor-pointer" },
            {
              default: ae(() => [
                x(
                  "div",
                  {
                    class: Pe([
                      "w-14 h-14 flex items-center justify-center border-2 transition-colors duration-100",
                      t[e.variant].box,
                    ]),
                  },
                  [
                    ...(n[0] ||
                      (n[0] = [
                        x(
                          "svg",
                          {
                            class: "w-6 h-6 fill-none stroke-current stroke-2",
                            viewBox: "0 0 24 24",
                          },
                          [
                            x("path", {
                              d: "M12 6 l8 6 -8 6 M4 12 h14",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                            }),
                          ],
                          -1,
                        ),
                      ])),
                  ],
                  2,
                ),
                x("p", { class: Pe(["text-sm font-semibold", t[e.variant].text]) }, ne(e.name), 3),
              ]),
              _: 1,
            },
            8,
            ["to"],
          )
        );
      };
    },
  }),
  Te = Object.assign(Yt, { __name: "BaseArrowButton" }),
  Xt = O({
    __name: "ProductCard",
    props: { title: {}, url: {}, to: {} },
    setup(e) {
      return (t, a) => {
        const n = Te;
        return (
          C(),
          q(
            "div",
            {
              class: "flex items-center justify-center bg-cover bg-center h-80",
              style: kt({ backgroundImage: `url(${e.url})` }),
            },
            [S(n, { name: e.title, variant: "third", to: e.to }, null, 8, ["name", "to"])],
            4,
          )
        );
      };
    },
  }),
  Gt = Object.assign(Xt, { __name: "HomeProductCard" }),
  qt = { class: "w-full max-w-default px-4 m-auto flex flex-col gap-10" },
  Kt = { class: "grid grid-cols-2 gap-4" },
  Jt = O({
    __name: "Products",
    setup(e) {
      const t = je();
      return (a, n) => {
        const i = Gt;
        return (
          C(),
          q("div", qt, [
            n[0] || (n[0] = x("h3", { class: "text-4xl font-medium" }, "Produktai", -1)),
            x("div", Kt, [
              S(
                i,
                { title: a.$t("menu.fences"), url: "/images/daimond6090.jpg", to: L(t)("/tvoros") },
                null,
                8,
                ["title", "to"],
              ),
              S(
                i,
                { title: a.$t("menu.gates"), url: "/images/gates.jpg", to: L(t)("/kiemo-vartai") },
                null,
                8,
                ["title", "to"],
              ),
              S(
                i,
                {
                  title: a.$t("menu.blinds"),
                  url: "/images/blinds.jpg",
                  to: L(t)("/lauko-zaliuzes"),
                },
                null,
                8,
                ["title", "to"],
              ),
            ]),
          ])
        );
      };
    },
  }),
  Qt = Object.assign(Jt, { __name: "HomeProducts" }),
  Zt = St("/icons/calculator.svg"),
  ea = { class: "flex h-100 text-white w-full max-w-default px-4 m-auto" },
  ta = { class: "bg-red-main p-8 max-w-100 w-full flex flex-col gap-8 justify-center" },
  aa = { class: "flex gap-4" },
  na = { class: "text-4xl" },
  ia = O({
    __name: "Calculator",
    setup(e) {
      const t = je();
      return (a, n) => {
        const i = Ke,
          r = Te;
        return (
          C(),
          q("div", ea, [
            S(i, { src: "/images/modernitvora_4909-2.jpg", alt: "", class: "w-full object-cover" }),
            x("div", ta, [
              x("div", aa, [
                n[0] || (n[0] = x("img", { src: Zt, alt: "" }, null, -1)),
                x("h3", na, ne(a.$t("menu.calculator")), 1),
              ]),
              n[1] || (n[1] = x("p", null, "Gaukite kainos pasiūlymą dabar!", -1)),
              S(
                r,
                { name: "SKAIČIUOTI", variant: "secondary", to: L(t)("/tvoru-skaiciuokle") },
                null,
                8,
                ["to"],
              ),
            ]),
          ])
        );
      };
    },
  }),
  oa = Object.assign(ia, { __name: "HomeCalculator" });
const Je = ["viewport", "carousel"],
  fe = {
    "bottom-to-top": "btt",
    "left-to-right": "ltr",
    "right-to-left": "rtl",
    "top-to-bottom": "ttb",
  },
  Qe = [
    "ltr",
    "left-to-right",
    "rtl",
    "right-to-left",
    "ttb",
    "top-to-bottom",
    "btt",
    "bottom-to-top",
  ],
  la = {
    ariaGallery: "Gallery",
    ariaNavigateToPage: "Navigate to page {slideNumber}",
    ariaNavigateToSlide: "Navigate to slide {slideNumber}",
    ariaNextSlide: "Navigate to next slide",
    ariaPreviousSlide: "Navigate to previous slide",
    iconArrowDown: "Arrow pointing downwards",
    iconArrowLeft: "Arrow pointing to the left",
    iconArrowRight: "Arrow pointing to the right",
    iconArrowUp: "Arrow pointing upwards",
    itemXofY: "Item {currentSlide} of {slidesCount}",
  },
  Ze = ["slide", "fade"],
  et = ["center", "start", "end", "center-even", "center-odd"],
  Ve = 10,
  ce = 0.3,
  k = {
    autoplay: 0,
    breakpointMode: Je[0],
    breakpoints: void 0,
    dir: Qe[0],
    enabled: !0,
    gap: 0,
    height: "auto",
    i18n: la,
    ignoreAnimations: !1,
    itemsToScroll: 1,
    itemsToShow: 1,
    modelValue: 0,
    mouseDrag: !0,
    mouseWheel: !1,
    pauseAutoplayOnHover: !1,
    preventExcessiveDragging: !1,
    slideEffect: Ze[0],
    snapAlign: et[0],
    touchDrag: !0,
    transition: 300,
    wrapAround: !1,
  },
  G = Symbol("carousel"),
  ra = (e) => {
    const t = Se([]),
      a = (n) => {
        n !== void 0
          ? t.slice(n).forEach((i, r) => {
              var c;
              (c = i.exposed) === null || c === void 0 || c.setIndex(n + r);
            })
          : t.forEach((i, r) => {
              var c;
              (c = i.exposed) === null || c === void 0 || c.setIndex(r);
            });
      };
    return {
      cleanup: () => {
        t.splice(0, t.length);
      },
      getSlides: () => t,
      registerSlide: (n, i) => {
        if (!n || n.props.isClone) return;
        const r = i ?? t.length;
        (t.splice(r, 0, n), a(r), e("slide-registered", { slide: n, index: r }));
      },
      unregisterSlide: (n) => {
        const i = t.indexOf(n);
        i !== -1 && (e("slide-unregistered", { slide: n, index: i }), t.splice(i, 1), a(i));
      },
    };
  };
function sa(e) {
  return e.length === 0 ? 0 : e.reduce((a, n) => a + n, 0) / e.length;
}
function He({ slides: e, position: t, toShow: a }) {
  const n = [],
    i = t === "before",
    r = i ? -a : 0,
    c = i ? 0 : a;
  if (e.length <= 0) return n;
  for (let u = r; u < c; u++) {
    const w = { index: i ? u : u + e.length, isClone: !0, id: void 0, key: `clone-${t}-${u}` },
      d = e[((u % e.length) + e.length) % e.length].vnode,
      h = It(d, w);
    ((h.el = null), n.push(h));
  }
  return n;
}
const ua = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
function ze(e) {
  if (!e.el || !(e.el instanceof Element)) return;
  const t = e.el.querySelectorAll(ua);
  for (const a of t)
    a instanceof HTMLElement &&
      !a.hasAttribute("disabled") &&
      a.getAttribute("aria-hidden") !== "true" &&
      a.setAttribute("tabindex", "-1");
}
function ca(e, t) {
  return Object.keys(e)
    .filter((a) => !t.includes(a))
    .reduce((a, n) => ((a[n] = e[n]), a), {});
}
function da(e) {
  const { isVertical: t, isReversed: a, dragged: n, effectiveSlideSize: i, threshold: r } = e,
    c = t ? n.y : n.x;
  if (c === 0) return 0;
  const u = c / i,
    p = Math.abs(u);
  if (p < r) return 0;
  const w = p < 1 ? Math.sign(u) : Math.round(u);
  return a ? w : -w;
}
function R({ val: e, max: t, min: a }) {
  return t < a ? e : Math.min(Math.max(e, isNaN(a) ? e : a), isNaN(t) ? e : t);
}
function va(e) {
  const { transform: t } = window.getComputedStyle(e);
  return t
    .split(/[(,)]/)
    .slice(1, -1)
    .map((a) => parseFloat(a));
}
function ma(e) {
  let t = 1,
    a = 1;
  return (
    e.forEach((n) => {
      const i = va(n);
      i.length === 6 && ((t /= i[0]), (a /= i[3]));
    }),
    { widthMultiplier: t, heightMultiplier: a }
  );
}
function fa(e, t) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (t - 1) / 2;
    case "center-even":
      return (t - 2) / 2;
    case "end":
      return t - 1;
    default:
      return 0;
  }
}
function ga(e, t, a) {
  switch (e) {
    case "start":
      return 0;
    case "center":
    case "center-odd":
      return (a - t) / 2;
    case "center-even":
      return a / 2 - t;
    case "end":
      return a - t;
    default:
      return 0;
  }
}
function Ue({ slideSize: e, viewportSize: t, align: a, itemsToShow: n }) {
  return n !== void 0 ? fa(a, n) : e !== void 0 && t !== void 0 ? ga(a, e, t) : 0;
}
function pa(e = "", t = {}) {
  return Object.entries(t).reduce((a, [n, i]) => a.replace(`{${n}}`, String(i)), e);
}
function ha({ val: e, max: t, min: a = 0 }) {
  const n = t - a + 1;
  return ((((e - a) % n) + n) % n) + a;
}
function ye(e, t = 0) {
  let a = !1,
    n = 0,
    i = null;
  function r(...c) {
    if (a) return;
    a = !0;
    const u = () => {
      i = requestAnimationFrame((p) => {
        p - n > t ? ((n = p), e(...c), (a = !1)) : u();
      });
    };
    u();
  }
  return (
    (r.cancel = () => {
      i && (cancelAnimationFrame(i), (i = null), (a = !1));
    }),
    r
  );
}
function de(e, t = "px") {
  if (!(e == null || e === ""))
    return typeof e == "number" || parseFloat(e).toString() === e ? `${e}${t}` : e;
}
const ba = O({
  name: "CarouselAria",
  setup() {
    const e = ge(G);
    return e
      ? () =>
          T(
            "div",
            {
              class: ["carousel__liveregion", "carousel__sr-only"],
              "aria-live": "polite",
              "aria-atomic": "true",
            },
            pa(e.config.i18n.itemXofY, {
              currentSlide: e.currentSlide + 1,
              slidesCount: e.slidesCount,
            }),
          )
      : () => "";
  },
});
function _a(e) {
  let t = !1;
  const a = { x: 0, y: 0 },
    n = me({ x: 0, y: 0 }),
    i = E(!1),
    { isSliding: r } = e,
    c = _(() => (typeof r == "boolean" ? r : r.value)),
    u = (d) => {
      var h;
      const o = d.target.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(o) ||
        c.value ||
        ((t = d.type === "touchstart"), t && d.touches.length > 1)
      )
        return;
      if (!t && (d.preventDefault(), d.button !== 0)) return;
      ((a.x = t ? d.touches[0].clientX : d.clientX), (a.y = t ? d.touches[0].clientY : d.clientY));
      const m = t ? "touchmove" : "mousemove",
        b = t ? "touchend" : "mouseup";
      (document.addEventListener(m, p, { passive: !1 }),
        document.addEventListener(b, w, { passive: !0 }),
        (h = e.onDragStart) === null || h === void 0 || h.call(e));
    },
    p = ye((d) => {
      var h;
      if (t && d.touches.length > 1) return;
      i.value = !0;
      const o = t ? d.touches[0].clientX : d.clientX,
        m = t ? d.touches[0].clientY : d.clientY;
      ((n.x = o - a.x),
        (n.y = m - a.y),
        (h = e.onDrag) === null ||
          h === void 0 ||
          h.call(e, { deltaX: n.x, deltaY: n.y, isTouch: t }));
    }),
    w = () => {
      var d;
      p.cancel();
      const h = Math.abs(n.x) + Math.abs(n.y);
      (!t &&
        h > 10 &&
        window.addEventListener(
          "click",
          (b) => {
            (b.preventDefault(), b.stopPropagation());
          },
          { once: !0, capture: !0 },
        ),
        (d = e.onDragEnd) === null || d === void 0 || d.call(e),
        (n.x = 0),
        (n.y = 0),
        (i.value = !1));
      const o = t ? "touchmove" : "mousemove",
        m = t ? "touchend" : "mouseup";
      (document.removeEventListener(o, p), document.removeEventListener(m, w));
    };
  return { dragged: n, isDragging: i, handleDragStart: u };
}
function xa() {
  const e = E(!1);
  return {
    isHover: e,
    handleMouseEnter: () => {
      e.value = !0;
    },
    handleMouseLeave: () => {
      e.value = !1;
    },
  };
}
function wa(e) {
  const { isVertical: t, isSliding: a, config: n } = e,
    i = _(() => (typeof t == "boolean" ? t : t.value)),
    r = _(() => (typeof a == "boolean" ? a : a.value));
  return {
    handleScroll: (u) => {
      var p, w;
      if ((u.preventDefault(), !n.mouseWheel || r.value)) return;
      const d =
          typeof n.mouseWheel == "object" && (p = n.mouseWheel.threshold) !== null && p !== void 0
            ? p
            : Ve,
        h = Math.abs(u.deltaY) > d ? u.deltaY : 0,
        o = Math.abs(u.deltaX) > d ? u.deltaX : 0;
      if (h === 0 && o === 0) return;
      const m = i.value ? h : o,
        I = (m !== 0 ? m : i.value ? o : h) > 0;
      (w = e.onWheel) === null ||
        w === void 0 ||
        w.call(e, { deltaX: o, deltaY: h, isScrollingForward: I });
    },
  };
}
const ka = {
    autoplay: { default: k.autoplay, type: Number },
    breakpoints: { default: k.breakpoints, type: Object },
    breakpointMode: {
      default: k.breakpointMode,
      validator(e) {
        return Je.includes(e);
      },
    },
    clamp: { type: Boolean },
    dir: {
      type: String,
      default: k.dir,
      validator(e, t) {
        if (!Qe.includes(e)) return !1;
        const a = e in fe ? fe[e] : e;
        return (
          ["ttb", "btt"].includes(a) &&
            (!t.height || t.height === "auto") &&
            console.warn(`[vue3-carousel]: The dir "${e}" is not supported with height "auto".`),
          !0
        );
      },
    },
    enabled: { default: k.enabled, type: Boolean },
    gap: { default: k.gap, type: Number },
    height: { default: k.height, type: [Number, String] },
    i18n: { default: k.i18n, type: Object },
    ignoreAnimations: { default: !1, type: [Array, Boolean, String] },
    itemsToScroll: { default: k.itemsToScroll, type: Number },
    itemsToShow: { default: k.itemsToShow, type: [Number, String] },
    modelValue: { default: void 0, type: Number },
    mouseDrag: { default: k.mouseDrag, type: [Boolean, Object] },
    mouseWheel: { default: k.mouseWheel, type: [Boolean, Object] },
    mouseScrollThreshold: { default: k.mouseScrollThreshold, type: Number },
    pauseAutoplayOnHover: { default: k.pauseAutoplayOnHover, type: Boolean },
    preventExcessiveDragging: {
      default: !1,
      type: Boolean,
      validator(e, t) {
        return (
          e &&
            t.wrapAround &&
            console.warn(
              '[vue3-carousel]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.',
            ),
          !0
        );
      },
    },
    slideEffect: {
      type: String,
      default: k.slideEffect,
      validator(e) {
        return Ze.includes(e);
      },
    },
    snapAlign: {
      default: k.snapAlign,
      validator(e) {
        return et.includes(e);
      },
    },
    touchDrag: { default: k.touchDrag, type: [Boolean, Object] },
    transition: { default: k.transition, type: Number },
    wrapAround: { default: k.wrapAround, type: Boolean },
  },
  Sa = O({
    name: "VueCarousel",
    props: ka,
    emits: [
      "before-init",
      "drag",
      "init",
      "loop",
      "slide-end",
      "slide-registered",
      "slide-start",
      "slide-unregistered",
      "update:modelValue",
      "wheel",
    ],
    setup(e, { slots: t, emit: a, expose: n }) {
      var i;
      const r = ra(a),
        c = r.getSlides(),
        u = _(() => c.length),
        p = E(null),
        w = E(null),
        d = E(0),
        h = _(() =>
          Object.assign(Object.assign(Object.assign({}, k), ca(e, ["breakpoints", "modelValue"])), {
            i18n: Object.assign(Object.assign({}, k.i18n), e.i18n),
          }),
        ),
        o = Se(Object.assign({}, h.value)),
        m = E((i = e.modelValue) !== null && i !== void 0 ? i : 0),
        b = E(m.value);
      ue(m, (l) => (b.value = l));
      const I = E(0),
        tt = _(() => Math.ceil((u.value - 1) / 2)),
        z = _(() => u.value - 1),
        U = _(() => 0);
      let F = null,
        pe = null,
        K = null;
      const ie = _(() => d.value + o.gap),
        J = _(() => {
          const l = o.dir || "ltr";
          return l in fe ? fe[l] : l;
        }),
        $ = _(() => ["rtl", "btt"].includes(J.value)),
        M = _(() => ["ttb", "btt"].includes(J.value)),
        B = _(() => o.itemsToShow === "auto"),
        A = _(() => (M.value ? "height" : "width"));
      function Q() {
        var l;
        if (!re.value) return;
        const s =
            (h.value.breakpointMode === "carousel"
              ? (l = p.value) === null || l === void 0
                ? void 0
                : l.getBoundingClientRect().width
              : typeof window < "u"
                ? window.innerWidth
                : 0) || 0,
          v = Object.keys(e.breakpoints || {})
            .map((g) => Number(g))
            .sort((g, y) => +y - +g),
          f = {};
        (v.some((g) =>
          s >= g
            ? (Object.assign(f, e.breakpoints[g]),
              f.i18n && Object.assign(f.i18n, h.value.i18n, e.breakpoints[g].i18n),
              !0)
            : !1,
        ),
          Object.assign(o, h.value, f),
          B.value ||
            (o.itemsToShow = R({
              val: Number(o.itemsToShow),
              max: e.clamp ? u.value : 1 / 0,
              min: 1,
            })));
      }
      const at = ye(() => {
          (Q(), le(), P());
        }),
        oe = Se(new Set()),
        N = E([]);
      function nt({ widthMultiplier: l, heightMultiplier: s }) {
        N.value = c.map((v) => {
          var f;
          const g = (f = v.exposed) === null || f === void 0 ? void 0 : f.getBoundingRect();
          return { width: g.width * l, height: g.height * s };
        });
      }
      const Z = E({ width: 0, height: 0 });
      function it({ widthMultiplier: l, heightMultiplier: s }) {
        var v;
        const f = ((v = w.value) === null || v === void 0 ? void 0 : v.getBoundingClientRect()) || {
          width: 0,
          height: 0,
        };
        Z.value = { width: f.width * l, height: f.height * s };
      }
      function P() {
        if (!w.value) return;
        const l = ma(oe);
        if ((it(l), nt(l), B.value)) d.value = sa(N.value.map((s) => s[A.value]));
        else {
          const s = Number(o.itemsToShow),
            v = (s - 1) * o.gap;
          d.value = (Z.value[A.value] - v) / s;
        }
      }
      function le() {
        !o.wrapAround && u.value > 0 && (m.value = R({ val: m.value, max: z.value, min: U.value }));
      }
      const he = _(() =>
        typeof e.ignoreAnimations == "string"
          ? e.ignoreAnimations.split(",")
          : Array.isArray(e.ignoreAnimations)
            ? e.ignoreAnimations
            : e.ignoreAnimations
              ? !1
              : [],
      );
      (ke(() => le()),
        ke(() => {
          P();
        }));
      let W;
      const De = (l) => {
          const s = l.target;
          if (
            !(
              !s?.contains(p.value) ||
              (Array.isArray(he.value) && he.value.includes(l.animationName))
            ) &&
            (oe.add(s), !W)
          ) {
            const v = () => {
              W = requestAnimationFrame(() => {
                (P(), v());
              });
            };
            v();
          }
        },
        Ee = (l) => {
          const s = l.target;
          (s && oe.delete(s), W && oe.size === 0 && (cancelAnimationFrame(W), P()));
        },
        re = E(!1);
      (typeof document < "u" &&
        ke(() => {
          re.value && he.value !== !1
            ? (document.addEventListener("animationstart", De),
              document.addEventListener("animationend", Ee))
            : (document.removeEventListener("animationstart", De),
              document.removeEventListener("animationend", Ee));
        }),
        Ge(() => {
          ((re.value = !0),
            Q(),
            Ce(),
            p.value && ((K = new ResizeObserver(at)), K.observe(p.value)),
            a("init"));
        }),
        Dt(() => {
          ((re.value = !1),
            r.cleanup(),
            pe && clearTimeout(pe),
            W && cancelAnimationFrame(W),
            F && clearInterval(F),
            K && (K.disconnect(), (K = null)),
            typeof document < "u" && Oe(),
            p.value &&
              (p.value.removeEventListener("transitionend", P),
              p.value.removeEventListener("animationiteration", P)));
        }));
      const { isHover: Ie, handleMouseEnter: ot, handleMouseLeave: lt } = xa(),
        Ne = ye((l) => {
          if (!l.ctrlKey)
            switch (l.key) {
              case "ArrowLeft":
              case "ArrowUp":
                M.value === l.key.endsWith("Up") && ($.value ? H(!0) : Y(!0));
                break;
              case "ArrowRight":
              case "ArrowDown":
                M.value === l.key.endsWith("Down") && ($.value ? Y(!0) : H(!0));
                break;
            }
        }, 200),
        Oe = () => {
          document.removeEventListener("keydown", Ne);
        },
        rt = () => {
          document.addEventListener("keydown", Ne);
        };
      function Ce() {
        !o.autoplay ||
          o.autoplay <= 0 ||
          (F = setInterval(() => {
            (o.pauseAutoplayOnHover && Ie.value) || H();
          }, o.autoplay));
      }
      function be() {
        (Me(), Ce());
      }
      function Me() {
        F && (clearInterval(F), (F = null));
      }
      const V = E(!1),
        st = ({ deltaX: l, deltaY: s, isTouch: v }) => {
          var f, g, y, j;
          a("drag", { deltaX: l, deltaY: s });
          const D = v
              ? typeof o.touchDrag == "object" &&
                (g = (f = o.touchDrag) === null || f === void 0 ? void 0 : f.threshold) !== null &&
                g !== void 0
                ? g
                : ce
              : typeof o.mouseDrag == "object" &&
                  (j = (y = o.mouseDrag) === null || y === void 0 ? void 0 : y.threshold) !==
                    null &&
                  j !== void 0
                ? j
                : ce,
            te = da({
              isVertical: M.value,
              isReversed: $.value,
              dragged: { x: l, y: s },
              effectiveSlideSize: ie.value,
              threshold: D,
            });
          te !== 0 &&
            (b.value = o.wrapAround
              ? m.value + te
              : R({ val: m.value + te, max: z.value, min: U.value }));
        },
        ut = () => X(b.value),
        {
          dragged: Re,
          isDragging: ct,
          handleDragStart: Le,
        } = _a({ isSliding: V, onDrag: st, onDragEnd: ut }),
        dt = ({ deltaX: l, deltaY: s, isScrollingForward: v }) => {
          (a("wheel", { deltaX: l, deltaY: s }), v ? ($.value ? Y() : H()) : $.value ? H() : Y());
        },
        { handleScroll: vt } = wa({ isVertical: M, isSliding: V, config: o, onWheel: dt });
      function H(l = !1) {
        X(m.value + o.itemsToScroll, l);
      }
      function Y(l = !1) {
        X(m.value - o.itemsToScroll, l);
      }
      function X(l, s = !1) {
        if (!s && V.value) return;
        let v = l,
          f = l;
        ((I.value = m.value),
          o.wrapAround
            ? (f = ha({ val: v, max: z.value, min: U.value }))
            : (v = R({ val: v, max: z.value, min: U.value })),
          a("slide-start", {
            slidingToIndex: l,
            currentSlideIndex: m.value,
            prevSlideIndex: I.value,
            slidesCount: u.value,
          }),
          Me(),
          (V.value = !0),
          (m.value = v),
          f !== v && $e.pause(),
          a("update:modelValue", f),
          (pe = setTimeout(() => {
            (o.wrapAround &&
              f !== v &&
              ($e.resume(),
              (m.value = f),
              a("loop", { currentSlideIndex: m.value, slidingToIndex: l })),
              a("slide-end", {
                currentSlideIndex: m.value,
                prevSlideIndex: I.value,
                slidesCount: u.value,
              }),
              (V.value = !1),
              be());
          }, o.transition)));
      }
      function mt() {
        (Q(), le(), P(), be());
      }
      (ue(
        () => [h.value, e.breakpoints],
        () => Q(),
        { deep: !0 },
      ),
        ue(
          () => e.autoplay,
          () => be(),
        ));
      const $e = ue(
        () => e.modelValue,
        (l) => {
          l !== m.value && X(Number(l), !0);
        },
      );
      a("before-init");
      const ee = _(() => {
          if (!o.wrapAround) return { before: 0, after: 0 };
          if (B.value) return { before: c.length, after: c.length };
          const l = Number(o.itemsToShow),
            s = Math.ceil(l + (o.itemsToScroll - 1)),
            v = s - b.value,
            f = s - (u.value - (b.value + 1));
          return { before: Math.max(0, v), after: Math.max(0, f) };
        }),
        _e = _(() =>
          ee.value.before
            ? B.value
              ? N.value.slice(-1 * ee.value.before).reduce((l, s) => l + s[A.value] + o.gap, 0) * -1
              : ee.value.before * ie.value * -1
            : 0,
        ),
        xe = _(() => {
          var l;
          if (B.value) {
            const s = ((m.value % c.length) + c.length) % c.length;
            return Ue({
              slideSize: (l = N.value[s]) === null || l === void 0 ? void 0 : l[A.value],
              viewportSize: Z.value[A.value],
              align: o.snapAlign,
            });
          }
          return Ue({ align: o.snapAlign, itemsToShow: +o.itemsToShow });
        }),
        se = _(() => {
          let l = 0;
          if (B.value) {
            if (
              (m.value < 0
                ? (l = N.value.slice(m.value).reduce((s, v) => s + v[A.value] + o.gap, 0) * -1)
                : (l = N.value.slice(0, m.value).reduce((s, v) => s + v[A.value] + o.gap, 0)),
              (l -= xe.value),
              !o.wrapAround)
            ) {
              const s =
                N.value.reduce((v, f) => v + f[A.value] + o.gap, 0) - Z.value[A.value] - o.gap;
              l = R({ val: l, max: s, min: 0 });
            }
          } else {
            let s = m.value - xe.value;
            (o.wrapAround || (s = R({ val: s, max: u.value - +o.itemsToShow, min: 0 })),
              (l = s * ie.value));
          }
          return l * ($.value ? 1 : -1);
        }),
        ft = _(() => {
          var l, s;
          if (!B.value) {
            const g = m.value - xe.value;
            return o.wrapAround
              ? { min: Math.floor(g), max: Math.ceil(g + Number(o.itemsToShow) - 1) }
              : {
                  min: Math.floor(R({ val: g, max: u.value - Number(o.itemsToShow), min: 0 })),
                  max: Math.ceil(
                    R({ val: g + Number(o.itemsToShow) - 1, max: u.value - 1, min: 0 }),
                  ),
                };
          }
          let v = 0;
          {
            let g = 0,
              y = 0 - ee.value.before;
            const j = Math.abs(se.value + _e.value);
            for (; g <= j; ) {
              const D = ((y % c.length) + c.length) % c.length;
              ((g += ((l = N.value[D]) === null || l === void 0 ? void 0 : l[A.value]) + o.gap),
                y++);
            }
            v = y - 1;
          }
          let f = 0;
          {
            let g = v,
              y = 0;
            for (
              g < 0
                ? (y =
                    N.value.slice(0, g).reduce((j, D) => j + D[A.value] + o.gap, 0) -
                    Math.abs(se.value + _e.value))
                : (y =
                    N.value.slice(0, g).reduce((j, D) => j + D[A.value] + o.gap, 0) -
                    Math.abs(se.value));
              y < Z.value[A.value];
            ) {
              const j = ((g % c.length) + c.length) % c.length;
              ((y += ((s = N.value[j]) === null || s === void 0 ? void 0 : s[A.value]) + o.gap),
                g++);
            }
            f = g - 1;
          }
          return { min: Math.floor(v), max: Math.ceil(f) };
        }),
        gt = _(() => {
          if (o.slideEffect === "fade") return;
          const l = M.value ? "Y" : "X",
            s = M.value ? Re.y : Re.x;
          let v = se.value + s;
          if (!o.wrapAround && o.preventExcessiveDragging) {
            let f = 0;
            B.value
              ? (f = N.value.reduce((j, D) => j + D[A.value], 0))
              : (f = (u.value - Number(o.itemsToShow)) * ie.value);
            const g = $.value ? 0 : -1 * f,
              y = $.value ? f : 0;
            v = R({ val: v, min: g, max: y });
          }
          return `translate${l}(${v}px)`;
        }),
        pt = _(() => ({
          "--vc-carousel-height": de(o.height),
          "--vc-cloned-offset": de(_e.value),
          "--vc-slide-gap": de(o.gap),
          "--vc-transition-duration": V.value ? de(o.transition, "ms") : void 0,
        })),
        Be = me({
          activeSlide: b,
          config: o,
          currentSlide: m,
          isSliding: V,
          isVertical: M,
          maxSlide: z,
          minSlide: U,
          nav: { slideTo: X, next: H, prev: Y },
          normalizedDir: J,
          slideRegistry: r,
          slideSize: d,
          slides: c,
          slidesCount: u,
          viewport: w,
          visibleRange: ft,
        });
      qe(G, Be);
      const we = me({
        config: o,
        currentSlide: m,
        maxSlide: z,
        middleSlide: tt,
        minSlide: U,
        slideSize: d,
        slidesCount: u,
      });
      return (
        n(
          me(
            Object.assign(
              {
                data: we,
                next: H,
                prev: Y,
                restartCarousel: mt,
                slideTo: X,
                updateBreakpointsConfig: Q,
                updateSlideSize: P,
                updateSlidesData: le,
              },
              Et(Be),
            ),
          ),
        ),
        () => {
          var l;
          const s = t.default || t.slides,
            v = s?.(we) || [],
            { before: f, after: g } = ee.value,
            y = He({ slides: c, position: "before", toShow: f }),
            j = He({ slides: c, position: "after", toShow: g }),
            D = [...y, ...v, ...j];
          if (!o.enabled || !D.length)
            return T("section", { ref: p, class: ["carousel", "is-disabled"] }, D);
          const te = ((l = t.addons) === null || l === void 0 ? void 0 : l.call(t, we)) || [],
            ht = T(
              "ol",
              {
                class: "carousel__track",
                onMousedownCapture: o.mouseDrag ? Le : null,
                onTouchstartPassiveCapture: o.touchDrag ? Le : null,
                onWheel: o.mouseWheel ? vt : null,
                style: { transform: gt.value },
              },
              D,
            ),
            bt = T("div", { class: "carousel__viewport", ref: w }, ht);
          return T(
            "section",
            {
              ref: p,
              class: [
                "carousel",
                `is-${J.value}`,
                `is-effect-${o.slideEffect}`,
                {
                  "is-dragging": ct.value,
                  "is-hover": Ie.value,
                  "is-sliding": V.value,
                  "is-vertical": M.value,
                },
              ],
              dir: J.value,
              style: pt.value,
              "aria-label": o.i18n.ariaGallery,
              tabindex: "0",
              onBlur: Oe,
              onFocus: rt,
              onMouseenter: ot,
              onMouseleave: lt,
            },
            [bt, te, T(ba)],
          );
        }
      );
    },
  });
var Ae;
(function (e) {
  ((e.arrowDown = "arrowDown"),
    (e.arrowLeft = "arrowLeft"),
    (e.arrowRight = "arrowRight"),
    (e.arrowUp = "arrowUp"));
})(Ae || (Ae = {}));
const Fe = (e) => `icon${e.charAt(0).toUpperCase() + e.slice(1)}`,
  ya = {
    arrowDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
    arrowLeft: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",
    arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
    arrowUp: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
  };
function Aa(e) {
  return e in Ae;
}
const We = (e) => e && Aa(e),
  Ye = O({
    props: {
      name: { type: String, required: !0, validator: We },
      title: { type: String, default: (e) => (e.name ? k.i18n[Fe(e.name)] : "") },
    },
    setup(e) {
      const t = ge(G, null);
      return () => {
        const a = e.name;
        if (!a || !We(a)) return;
        const n = ya[a],
          i = T("path", { d: n }),
          r = t?.config.i18n[Fe(a)] || e.title,
          c = T("title", r);
        return T(
          "svg",
          { class: "carousel__icon", viewBox: "0 0 24 24", role: "img", "aria-label": r },
          [c, i],
        );
      };
    },
  }),
  ja = O({
    name: "CarouselNavigation",
    inheritAttrs: !1,
    props: { carousel: { type: Object } },
    setup(e, { slots: t, attrs: a }) {
      let n = ge(G, null);
      const { next: i, prev: r } = t,
        c = () =>
          ({ btt: "arrowDown", ltr: "arrowLeft", rtl: "arrowRight", ttb: "arrowUp" })[
            n.normalizedDir
          ],
        u = () =>
          ({ btt: "arrowUp", ltr: "arrowRight", rtl: "arrowLeft", ttb: "arrowDown" })[
            n.normalizedDir
          ],
        p = _(() => !n.config.wrapAround && n.currentSlide <= n.minSlide),
        w = _(() => !n.config.wrapAround && n.currentSlide >= n.maxSlide);
      return () => {
        if ((e.carousel && (n = e.carousel), !n))
          return (
            console.warn(
              "[vue3-carousel]: A carousel component must be provided for the navigation component to display",
            ),
            ""
          );
        const { i18n: d } = n.config,
          h = T(
            "button",
            Object.assign(
              Object.assign(
                {
                  type: "button",
                  disabled: p.value,
                  "aria-label": d.ariaPreviousSlide,
                  title: d.ariaPreviousSlide,
                  onClick: n.nav.prev,
                },
                a,
              ),
              { class: ["carousel__prev", { "carousel__prev--disabled": p.value }, a.class] },
            ),
            r?.() || T(Ye, { name: c() }),
          ),
          o = T(
            "button",
            Object.assign(
              Object.assign(
                {
                  type: "button",
                  disabled: w.value,
                  "aria-label": d.ariaNextSlide,
                  title: d.ariaNextSlide,
                  onClick: n.nav.next,
                },
                a,
              ),
              { class: ["carousel__next", { "carousel__next--disabled": w.value }, a.class] },
            ),
            i?.() || T(Ye, { name: u() }),
          );
        return [h, o];
      };
    },
  }),
  Ta = O({
    name: "CarouselSlide",
    props: {
      id: { type: String, default: (e) => (e.isClone ? void 0 : yt()) },
      index: { type: Number, default: void 0 },
      isClone: { type: Boolean, default: !1 },
    },
    setup(e, { attrs: t, slots: a, expose: n }) {
      const i = ge(G);
      if ((qe(G, void 0), !i)) return () => "";
      const r = E(e.index),
        c = (b) => {
          r.value = b;
        },
        u = At(),
        p = () => {
          const b = u.vnode.el;
          return b ? b.getBoundingClientRect() : { width: 0, height: 0 };
        };
      n({ id: e.id, setIndex: c, getBoundingRect: p });
      const w = _(() => r.value === i.activeSlide),
        d = _(() => r.value === i.activeSlide - 1),
        h = _(() => r.value === i.activeSlide + 1),
        o = _(() => r.value >= i.visibleRange.min && r.value <= i.visibleRange.max),
        m = _(() => {
          if (i.config.itemsToShow === "auto") return;
          const b = i.config.itemsToShow,
            I =
              i.config.gap > 0 && b > 1
                ? `calc(${100 / b}% - ${(i.config.gap * (b - 1)) / b}px)`
                : `${100 / b}%`;
          return i.isVertical ? { height: I } : { width: I };
        });
      return (
        i.slideRegistry.registerSlide(u, e.index),
        jt(() => {
          i.slideRegistry.unregisterSlide(u);
        }),
        e.isClone &&
          (Ge(() => {
            ze(u.vnode);
          }),
          Tt(() => {
            ze(u.vnode);
          })),
        () => {
          var b, I;
          return i.config.enabled
            ? T(
                "li",
                {
                  style: [t.style, Object.assign({}, m.value)],
                  class: {
                    carousel__slide: !0,
                    "carousel__slide--clone": e.isClone,
                    "carousel__slide--visible": o.value,
                    "carousel__slide--active": w.value,
                    "carousel__slide--prev": d.value,
                    "carousel__slide--next": h.value,
                    "carousel__slide--sliding": i.isSliding,
                  },
                  onFocusin: () => {
                    (i.viewport && (i.viewport.scrollLeft = 0), i.nav.slideTo(r.value));
                  },
                  id: e.isClone ? void 0 : e.id,
                  "aria-hidden": e.isClone || void 0,
                },
                (I = a.default) === null || I === void 0
                  ? void 0
                  : I.call(a, {
                      currentIndex: r.value,
                      isActive: w.value,
                      isClone: e.isClone,
                      isPrev: d.value,
                      isNext: h.value,
                      isSliding: i.isSliding,
                      isVisible: o.value,
                    }),
              )
            : (b = a.default) === null || b === void 0
              ? void 0
              : b.call(a);
        }
      );
    },
  }),
  Da = { class: "min-h-80 h-fit w-full" },
  Ea = { class: "flex flex-col gap-4" },
  Ia = { class: "text-2xl font-medium" },
  Na = { class: "text-justify" },
  Oa = O({
    __name: "Crousel",
    props: {
      arr: {},
      images: { type: Boolean, default: !0 },
      gap: { default: 18 },
      speed: { default: 2e3 },
    },
    setup(e) {
      const t = { itemsToShow: 2.5, wrapAround: !0 };
      return (a, n) => {
        const i = Ke;
        return (
          C(),
          ve(
            L(Sa),
            Mt(t, {
              autoplay: e.speed,
              gap: e.gap,
              transition: 500,
              class: "rounded overflow-hidden",
            }),
            {
              addons: ae(() => [S(L(ja))]),
              default: ae(() => [
                (C(!0),
                q(
                  Nt,
                  null,
                  Ot(
                    e.arr,
                    (r, c) => (
                      C(),
                      ve(
                        L(Ta),
                        { key: e.images ? r.url : r.name + c },
                        {
                          default: ae(() => [
                            x("div", Da, [
                              e.images
                                ? (C(),
                                  ve(
                                    i,
                                    {
                                      key: 0,
                                      src: r.url,
                                      class: "w-full h-full object-cover rounded",
                                    },
                                    null,
                                    8,
                                    ["src"],
                                  ))
                                : Ct("", !0),
                              x("div", Ea, [x("h6", Ia, ne(r.name), 1), x("p", Na, ne(r.text), 1)]),
                            ]),
                          ]),
                          _: 2,
                        },
                        1024,
                      )
                    ),
                  ),
                  128,
                )),
              ]),
              _: 1,
            },
            16,
            ["autoplay", "gap"],
          )
        );
      };
    },
  }),
  Ca = Object.assign(Xe(Oa, [["__scopeId", "data-v-2005480d"]]), { __name: "HomeCrousel" });
function Ma(e, t, a) {
  const { t: n } = Rt();
  Lt({ title: n(e), description: n(t), ogTitle: n(e), ogDescription: n(t), ogType: "website" });
}
const Ra = { class: "flex flex-col gap-24" },
  La = { class: "flex flex-col gap-10 max-w-default px-4 m-auto" },
  $a = { class: "flex justify-between" },
  Ba = { class: "flex flex-col gap-20 w-full max-w-default px-4 m-auto" },
  Pa = { class: "flex flex-col gap-10 max-w-default w-full px-4 m-auto" },
  Xa = O({
    __name: "index",
    setup(e) {
      Ma("home.seo.title", "home.seo.description");
      const t = je(),
        a = [
          { url: "/images/daimond6090.jpg" },
          { url: "/images/daimond40105.jpg" },
          { url: "/images/daimond60140.jpg" },
          { url: "/images/daimondVertical.jpg" },
          { url: "/images/dilė.jpg" },
          { url: "/images/dilė.jpg" },
          { url: "/images/eglė.jpg" },
          { url: "/images/plank.jpg" },
          { url: "/images/žaliuzi.jpg" },
          { url: "/images/blinds.jpg" },
          { url: "/images/blinds2.jpg" },
        ],
        n = [
          {
            name: "Rita",
            text: "Džiaugiuosi, kad kreipiausi būtent į šią įmonę. Visi numatyti darbai buvo atlikti laiku, pagal sąmatą ir labai kokybiškai. Montuotojai puikiai išmano savo darbą. Šiaip esu labai smulkmeniška, bet šiuo atveju nebuvo prie ko prikibti :). Dabar kiekvieną dieną žiūriu į savo tvorą ir džiaugiuosi, kokia ji graži. Ypatingas ačiū vadybininkui Hariui už kantrybę, mandagų bendravimą ir profesionalumą. Puikus kolektyvas ir puikus darbas. Jeigu ateityje reikės - kreipsiuosi tik į šią įmonę. Labai atsakingai rekomenduoju.",
            url: "",
          },
          {
            name: "Arvydas",
            text: "Puiki įmonė. Viską atliko kaip pažadėta ir dar anksčiau. Labai kruopštūs ir tvarkingi montuotojai. Gražus darbas. Rekomenduoju.",
            url: "",
          },
          {
            name: "Paulius",
            text: "Visų pirma tai labai norime padėkoti visai MODERNI TVORA KOMANDAI ! Esame naujakūriai, matėme nemažai brigadų, bet kaip savo darba atliko MODERNI TVORA - likome sužavėti. Nuo pačio projekto sudarimo, stulpų įrengimų, iki apdailos, ir pačios tvoros apšvietimo - likome patenkinti 100 % ! Papildomas ačiū Audriui ! Ačiū įmonės vadovui Andriui ! ačiū vyrukams kurie montavo stulpus, ačiū vyrukams kurie įrengė apdaila, ačiū vyrukui kuris puikiai įstatė ir pajungė vartus, ir dar vienas specialus ačiū vyrukams kurie įrengė puikų apšvietimą ! Jūsų visa komanda pateisino įmonės pavadinima MODERNI TVORA",
            url: "",
          },
          {
            name: "Justinas",
            text: "90% rekomendacijos. Laiku ir greitai atliktas darbas, aukšta aptarnavimo kokybė, puikus personalas (tiek vadovai tiek montuotojai). Darbas atliktas nepriekaištingai, nuo užsakymo iki tvoros montavimo. Sėkmės darbuose",
            url: "",
          },
          {
            name: "Mantas",
            text: "Esame dėkingi, Moderni tvora už puikią tvorą. Paskaičiavimai buvo atlikti labai tiksliai, montuojant nieko netrūko. Dėkojame vadybininkui Hariui už sklandžią komunikaciją, taip pat montuotojams. Užsakymas nevėlavo- rezultatas kuo puikiausias, buvo verta kiekvieno išleisto Euro. Rekomenduojame šią įmonę ir linkime jai sėkmės",
            url: "",
          },
          { name: "Sigita", text: "Tvora superine, vyrukai šaunūs, aciu", url: "" },
          {
            name: "Saulius",
            text: "Puiki įmonė. Darbas atliktas puikiai, sulaukėme darbo pabaigos po 3savaičių, tai yra greičiau, nei per sutartą laikotarpį. Konkretumas ir pagalba iš vadybininkų, dėl kilusių klausimų. Ačiū, už atliktą darbą. Rekomenduoju!!!",
            url: "",
          },
        ];
      return (i, r) => {
        const c = Wt,
          u = Qt,
          p = oa,
          w = Te,
          d = Ca,
          h = xt,
          o = wt,
          m = Bt,
          b = Pt;
        return (
          C(),
          q("div", Ra, [
            S(c),
            x("section", null, [S(u)]),
            x("section", null, [S(p)]),
            x("section", La, [
              x("div", $a, [
                r[0] || (r[0] = x("h3", { class: "text-4xl font-medium" }, "Projektai", -1)),
                S(w, { name: "PAMATYTI DAUGIAU", to: L(t)("/galerija") }, null, 8, ["to"]),
              ]),
              S(d, { arr: a }),
            ]),
            x("section", Ba, [
              S(
                h,
                {
                  title: "Apie mus",
                  text: i.$t("about.aprasymas.text"),
                  url: i.$t("about.box1.url"),
                },
                {
                  default: ae(() => [
                    S(w, { name: "PLAČIAU", to: L(t)("/apie-mus") }, null, 8, ["to"]),
                  ]),
                  _: 1,
                },
                8,
                ["text", "url"],
              ),
              S(o),
            ]),
            x("section", null, [S(m)]),
            x("section", Pa, [
              r[1] || (r[1] = x("h3", { class: "text-4xl font-medium" }, "Atsiliepimai", -1)),
              S(d, { arr: n, images: !1, speed: 5e3, gap: 50 }),
            ]),
            x("section", null, [S(b)]),
          ])
        );
      };
    },
  });
export { Xa as default };
