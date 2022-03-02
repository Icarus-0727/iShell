import { h } from "vue";
import { NLayout, NLayoutHeader, NLayoutContent, NGrid, NGi, NDataTable, NButton, NIcon, NInputGroup, NInput, NSelect } from "naive-ui";
import { NewTab as NewConnIcon, Settings as SettingIcon, Delete as DeleteIcon } from "@vicons/carbon";
import { PlugDisconnected20Regular as ConnIcon } from "@vicons/fluent";
import { getMachines, deleteMachine } from "../../api/machine";

const { ipcRenderer } = require("electron");

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGrid,
    NGi,
    NDataTable,
    NButton,
    NIcon,
    NInputGroup,
    NInput,
    NSelect,
    NewConnIcon,
    ConnIcon,
  },
  data() {
    return {
      loading: true,
      machines: [],
      tableMaxHeigth: 0,
      searchOptSelect: "名字",
      searchOpts: [
        {
          label: "名字",
          value: "name",
        },
        {
          label: "地址",
          value: "ip",
        },
        {
          label: "端口",
          value: "port",
        },
      ],
      cols: [
        {
          title: "名称",
          key: "name",
          width: 150,
          // align: 'center',
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "地址",
          key: "host",
          width: 120,
          // align: 'center',
        },
        {
          title: "端口",
          key: "port",
          width: 55,
          align: "center",
        },
        {
          title: "用户",
          key: "user",
          width: 55,
          align: "center",
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "描述",
          key: "description",
          // align: 'center',
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          fixed: "right",
          render: (row) => [
            h(NButton, { quaternary: true, size: "small", onClick: () => openSshConn(row) }, { default: renderIcon(ConnIcon) }),
            h(NButton, { quaternary: true, size: "small", onClick: () => this.openConnEditor(row.ID) }, { default: renderIcon(SettingIcon) }),
            h(NButton, { quaternary: true, size: "small", onClick: () => this.deleteMachine(row.ID) }, { default: renderIcon(DeleteIcon) }),
          ],
        },
      ],
    };
  },
  setup() {
    ipcRenderer.send("registry", "connMgr");
  },
  methods: {
    openConnEditor(id) {
      window.open(`http://localhost:3000/pages/connEditor/index.html?id=${id}`, "connEditor", id);
    },
    getMachines() {
      getMachines()
        .then((res) => (this.machines = res.data))
        .finally(() => (this.loading = false));
    },
    deleteMachine(id) {
      deleteMachine(id).then(() => {
        this.getMachines();
      });
    },
  },
  mounted() {
    this.getMachines();
    this.tableMaxHeigth = window.innerHeight - 1;
    window.onresize = () => {
      this.tableMaxHeigth = window.innerHeight - 1;
    };
    let that = this;
    ipcRenderer.on("connEditor", () => {
      that.getMachines();
    });
  },
};

function openSshConn(machine) {
  ipcRenderer.send("transfer", {
    from: "connMgr",
    to: "home",
    data: JSON.stringify(machine),
  });
  window.close();
}
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
