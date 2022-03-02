import { Terminal as RemoteTerminalIcon, Apps as PluginManagerIcon, Settings as SettingIcon } from "@vicons/tabler";
import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter, NIcon, NButton, NMenu, NTooltip } from "naive-ui";
import { renderIcon, renderRouter } from "./func";
import { KeepAlive } from "vue";

const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      contentHeight: window.innerHeight,
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
      // window.open("/pages/settings/index.html", "settings");
      // ipcRenderer.on("connMgr", (event, args) => {
      //   console.log(args)
      // })
    },
  },
  setup() {
    ipcRenderer.send("registry", "home")
  },
  mounted() {
    window.onresize = () => {
      this.contentHeight = window.innerHeight;
    };
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
    KeepAlive,
  },
};
