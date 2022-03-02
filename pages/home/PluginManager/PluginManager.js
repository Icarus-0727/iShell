import { NSpace, NGrid, NGi, NMenu, NCard, NSwitch, NButton, NPageHeader, NUpload } from "naive-ui";

export default {
  components: {
    NSpace,
    NGrid,
    NGi,
    NMenu,
    NCard,
    NSwitch,
    NButton,
    NPageHeader,
    NUpload,
  },
  data() {
    return {
      plugins: [
        {
          name: "信息监控",
          description: "实时显示服务器基本资源信息。",
          enable: true,
        },
        {
          name: "资源管理器",
          description: "远程管理服务器文件资源的工具插件。",
          enable: false,
        },
        {
          name: "资源管理器",
          description: "远程管理服务器文件资源的工具插件。",
          enable: false,
        },
        {
          name: "资源管理器",
          description: "远程管理服务器文件资源的工具插件。",
          enable: false,
        },
      ],
    };
  },
  methods: {},
};
