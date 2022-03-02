import { createRouter, createWebHashHistory } from "vue-router";
const RemoteTerminal = () => import("../pages/home/RemoteTerminal/RemoteTerminal.vue");
const PluginManager = () => import("../pages/home/PluginManager/PluginManager.vue");

const routes = [
  {
    path: "/",
    redirect: "/remoteTerminal",
  },
  {
    path: "/remoteTerminal",
    component: RemoteTerminal,
  },
  {
    path: "/pluginManager",
    component: PluginManager,
  },
];

export default createRouter({
  history: createWebHashHistory("./"),
  routes,
});
