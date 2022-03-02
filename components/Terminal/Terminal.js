import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";

let socket = null;
let xterm = null;
let attachAddon = null;
let fitAddon = null;
const xtermConfig = {
  rendererType: "canvas",
  convertEol: true,
  fontSize: 14,
  disableStdin: false,
  cursorBlink: true,
  cursorStyle: "underline",
  scrollback: 300,
  tabStopWidth: 4,
  theme: {
    foreground: "#FFFFFF", //字体
    background: "#060101", //背景色
    cursor: "help", //设置光标
  },
};

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      wsUri: "ws://127.0.0.1:32123/ssh/xterm/" + this.id,
    };
  },
  mounted() {
    socket = new WebSocket(this.wsUri);
    xterm = new Terminal(xtermConfig);
    attachAddon = new AttachAddon(socket, false);
    fitAddon = new FitAddon();
    initXterm();
    initSocket();
    window.onresize = () => {
      resizeXterm();
      // console.log(xterm.cols);
    };
  },
  unmounted() {
    socket.close();
  },
};

// 初始化 xterm
function initXterm() {
  xterm.loadAddon(attachAddon);
  xterm.loadAddon(fitAddon);
  xterm.open(document.getElementById("terminal"));
  fitAddon.fit();
  xterm.focus();
  xterm.writeln("");
}
// 使 web 终端的大小适应所属容器大小
function resizeXterm() {
  fitAddon.fit();
  xterm.scrollToBottom();
}
// 初始化操作 ssh 的 socket
function initSocket() {
  socket.onopen = () => {
    console.log("socket", "onopen");
  };
  socket.onerror = (err) => {
    // console.log(err)
  };
  socket.onclose = (err) => {
    xterm && xterm.dispose();
  };
}
