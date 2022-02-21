import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
const RemoteTerminal = () => import("../components/RemoteTerminal/RemoteTerminal.vue");
const PluginManager = () => import("../components/PluginManager/PluginManager.vue");

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
