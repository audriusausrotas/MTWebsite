import { defineComponent, h } from "vue";

// ContentRenderer `components` priima tik komponentus (ne HTML tago pavadinimą tekstu),
// todėl antraštės nuleidžiamos per mažą komponentą, kuris atvaizduoja kitą tagą.
const headingAs = (tag: string) =>
  defineComponent({
    name: `Heading${tag.toUpperCase()}`,
    setup(_, { attrs, slots }) {
      return () => h(tag, attrs, slots.default?.());
    },
  });

// Puslapiams, kurių <h1> jau yra (hero): # -> h2, ## -> h3, ### -> h4
export const demotedHeadings = {
  h1: headingAs("h2"),
  h2: headingAs("h3"),
  h3: headingAs("h4"),
};
