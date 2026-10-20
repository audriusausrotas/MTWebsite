import { _ as __nuxt_component_0$2, s as useLocaleRoute, t as isObject } from './server.mjs';
import { defineComponent, computed, h } from 'vue';
import { F as hasProtocol } from '../_/nitro.mjs';

const __nuxt_component_0 = defineComponent({
  name: "NuxtLinkLocale",
  props: {
    ...__nuxt_component_0$2.props,
    locale: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props, { slots }) {
    const localeRoute = useLocaleRoute();
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const resolvedPath = computed(() => {
      const destination = props.to ?? props.href;
      const resolved = destination != null ? localeRoute(destination, props.locale) : destination;
      if (resolved && isObject(props.to)) {
        resolved.state = props.to?.state;
      }
      return destination != null ? resolved : destination;
    });
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (isObject(path)) {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const getNuxtLinkProps = () => {
      const _props = {
        ...props
      };
      if (!isExternal.value) {
        _props.to = resolvedPath.value;
      }
      delete _props.href;
      delete _props.locale;
      return _props;
    };
    return () => h(__nuxt_component_0$2, getNuxtLinkProps(), slots.default);
  }
});

export { __nuxt_component_0 as _ };
//# sourceMappingURL=NuxtLinkLocale-C4V4J5dl.mjs.map
