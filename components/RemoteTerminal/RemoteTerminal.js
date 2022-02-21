import {} from "vue";
import { ManagedSolutions as connIcon } from "@vicons/carbon";
import Terminal from "./Terminal.vue";
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NLayoutFooter, NTabs, NTabPane, NDataTable, NCard, NButton, NIcon, NTooltip } from "naive-ui";

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
      ],
      pluginBar: {
        bottom: {
          height: 300,
        },
      },
      currentTab: 0,
      conns: [
        {
          id: connNum--,
          isNew: true,
          name: "新建连接",
        },
      ],
    };
  },
  setup(props) {
    fetch("http://localhost:32123/machine/recently").then((resp) => {
      resp.json().then((json) => {
        recentlyUsed.value = json.data;
        recentlyUsed.value.forEach((item) => {
          item.CreatedAt = item.CreatedAt.substring(0, 19).replace("T", " ");
        });
      });
    });
  },
  methods: {
    openConnMgr() {
      window.openConnMgr()
      // const connMgr = window.open("http://localhost:4000/pages/connection-manager/index.html", "connection-manager");

      // const onMessage = (msg) => {
      //   let machine = JSON.parse(msg.data);
      //   this.conns.push({
      //     id: machine.ID,
      //     isNew: false,
      //     name: machine.name,
      //   });
      //   connMgr.close();
      // };

      // window.addEventListener("message", onMessage);

      // let connMgrOnClose = setInterval(() => {
      //   if (connMgr.closed) {
      //     window.removeEventListener("message", onMessage);
      //     clearInterval(connMgrOnClose);
      //   }
      // }, 5000);
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
  components: { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NLayoutFooter, NTabs, NTabPane, NDataTable, NCard, NButton, NIcon, NTooltip, connIcon, Terminal },
};
