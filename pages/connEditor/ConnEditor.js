import { NLayout, NLayoutContent, NLayoutFooter, NDivider, NSpace, NForm, NFormItem, NButton, NInput, NInputNumber, NInputGroup, NSelect } from "naive-ui";
import { getQueryParam } from "../../utils/url";
import { getMachine, addMachine, updateMachine } from "../../api/machine";

const { ipcRenderer } = require("electron");

export default {
  components: {
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NDivider,
    NSpace,
    NForm,
    NFormItem,
    NButton,
    NInput,
    NInputNumber,
    NInputGroup,
    NSelect,
  },
  data() {
    return {
      id: getQueryParam("id"),
      machine: {
        auth_type: "password",
        port: 22,
        user: "root",
      },
      authTypes: [
        {
          label: "密码",
          value: "password",
        },
        {
          label: "公钥",
          value: "key",
        },
      ],
    };
  },
  methods: {
    confirmBtn() {
      if (this.id == 0) {
        addMachine(this.machine)
          .then((res) => {
            console.log(res);
          })
          .finally(() => {
            this.closeWindow();
          });
      } else {
        updateMachine(this.machine)
          .then((res) => {
            console.log(res);
          })
          .finally(() => {
            this.closeWindow();
          });
      }
    },
    cancelBtn() {
      this.closeWindow();
    },
    setTitle() {
      if (this.id == 0) {
        document.getElementsByTagName("title")[0].innerHTML = "新建连接 - iShell";
      } else {
        document.getElementsByTagName("title")[0].innerHTML = `编辑@${this.machine.name ?? ""} - iShell`;
      }
    },
    closeWindow() {
      ipcRenderer.send("transfer", {
        from: "connEditor",
        to: "connMgr",
        data: {
          errCode: 0,
          msg: "refresh",
        },
      });
      window.close();
    },
  },
  mounted() {
    if (this.id == 0) {
      this.setTitle(0);
    } else {
      getMachine(this.id)
        .then((res) => (this.machine = res.data))
        .finally(() => this.setTitle(this.id));
    }
  },
};
