import { defineComponent, h } from 'vue';

const headingAs = (tag) => defineComponent({
  name: `Heading${tag.toUpperCase()}`,
  setup(_, { attrs, slots }) {
    return () => h(tag, attrs, slots.default?.());
  }
});
const demotedHeadings = {
  h1: headingAs("h2"),
  h2: headingAs("h3"),
  h3: headingAs("h4")
};

export { demotedHeadings as d };
//# sourceMappingURL=demotedHeadings-Cm1cqYjJ.mjs.map
