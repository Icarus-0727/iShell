import { h } from "vue";
import { RouterLink } from "vue-router";
import { Terminal as RemoteTerminalIcon, Apps as PluginManagerIcon, Settings as SettingIcon } from "@vicons/tabler";
import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter, NIcon, NButton, NMenu, NTooltip } from "naive-ui";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function renderRouter(label, path) {
  return () => h(RouterLink, { to: { path: path } }, { default: () => label });
}

export default {
  data() {
    return {
      menuOptions: [
        {
          label: renderRouter("远程终端", "/remoteTerminal"),
          key: "terminal",
          icon: renderIcon(RemoteTerminalIcon),
        },
        {
          label: renderRouter("插件管理", "/pluginManager"),
          key: "plugin",
          icon: renderIcon(PluginManagerIcon),
        },
      ],
    };
  },
  methods: {
    openSettings() {
      const connMgr = window.open("/pages/settings/index.html", "settings");
    },
  },
  components: {
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NIcon,
    NButton,
    NMenu,
    NTooltip,
    SettingIcon,
  },
};
