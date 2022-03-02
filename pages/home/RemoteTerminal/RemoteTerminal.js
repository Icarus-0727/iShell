import { h, KeepAlive } from "vue";
import { NLayout, NLayoutFooter, NTabs, NTabPane, NDataTable, NCard, NButton, NIcon } from "naive-ui";
import { PlugDisconnected20Regular as ConnIcon } from "@vicons/fluent";

import Terminal from "../../../components/Terminal/Terminal.vue";
const { ipcRenderer } = require("electron");

let connNum = 0;

export default {
  data() {
    return {
      recentlyUsed: [],
      cols: [
        {
          title: "名称",
          key: "name",
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "备注",
          key: "description",
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "最近使用时间",
          key: "CreatedAt",
          ellipsis: {
            tooltip: true,
          },
        },
        {
          title: "操作",
          align: "center",
          render: (row) => [
            h(
              NButton,
              {
                quaternary: true,
                size: "small",
                onClick: () => {
                  let conn = this.conns.find((e) => {
                    return e.id == this.currentTab;
                  });
                  conn.id = row.ID;
                  conn.isNew = false;
                  conn.name = row.name;
                  this.currentTab = row.ID;
                },
              },
              { default: renderIcon(ConnIcon) }
            ),
          ],
        },
      ],
      pluginBar: {
        bottom: {
          height: 400,
        },
      },
      currentTab: 0,
      conns: [
        {
          id: connNum--,
          isNew: true,
          name: "新建连接",
        },
        // {
        //   id: 1,
        //   isNew: false,
        //   name: "腾讯云",
        // },
      ],
    };
  },
  methods: {
    openConnMgr() {
      window.open("/pages/connMgr/index.html", "connMgr");
    },
    addTab() {
      let id = connNum--;
      this.conns.push({
        id: id,
        isNew: true,
        name: "新建连接",
      });
      this.currentTab = id;
    },
    closeTab(id) {
      let index = 0;
      let item = this.conns.find((item, _index) => {
        if (item.id == id) {
          index = _index;
          return true;
        }
        return false;
      });
      this.conns.splice(index, 1);
      if (this.conns.length == 0) {
        this.addTab();
        this.currentTab = this.conns[0].id;
      } else if (item.id == this.currentTab) {
        this.currentTab = this.conns[index-- > 0 ? index : 0].id;
      }
    },
  },
  mounted() {
    fetch("http://localhost:32123/machine/recently").then((resp) => {
      resp.json().then((json) => {
        console.log(json.data);
        this.recentlyUsed = json.data;
        this.recentlyUsed.forEach((item) => {
          item.CreatedAt = item.CreatedAt.substring(0, 19).replace("T", " ");
        });
      });
    });
    
    let that = this;
    ipcRenderer.on("connMgr", (_, args) => {
      console.log(args);
      const machine = JSON.parse(args);
      let item = that.conns.find((e) => {
        return e.isNew;
      });
      if (item != undefined) {
        item.id = machine.ID;
        item.isNew = false;
        item.name = machine.name;
      } else {
        that.conns.push({
          id: machine.ID,
          isNew: false,
          name: machine.name,
        });
      }
      this.currentTab = machine.ID;
    });
  },
  components: { NLayout, NLayoutFooter, NTabs, NTabPane, NDataTable, NCard, NButton, NIcon, Terminal, KeepAlive },
};

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
