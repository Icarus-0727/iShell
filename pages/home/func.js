import { h } from "vue";
import { RouterLink } from "vue-router";
import { NIcon } from "naive-ui";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function renderRouter(label, path) {
  return () => h(RouterLink, { to: { path: path } }, { default: () => label });
}

export { renderIcon, renderRouter };
