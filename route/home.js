import { createRouter, createWebHashHistory } from "vue-router";
const RemoteTerminal = () => import("../pages/home/RemoteTerminal/RemoteTerminal.vue");

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
    component: `<h1>123</h1>`,
  },
];

export default createRouter({
  history: createWebHashHistory("./"),
  routes,
});
