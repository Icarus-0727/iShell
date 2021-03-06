const { BrowserWindow } = require("electron");
const ConnMgr = require("./connMgr");
const path = require("path");
// const Settings = require("./Settings")

module.exports = class extends BrowserWindow {
  constructor() {
    super({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    // 页面不可被关闭，只能隐藏
    this.on("close", (event) => {
      event.preventDefault();
      this.hide();
    });

    // 自定义页面的 window.open 事件
    this.webContents.setWindowOpenHandler((opts) => {
      switch (opts.frameName) {
        // 打开连接管理器
        case "connMgr":
          // 打开页面
          new ConnMgr(this);
          break;
        case "settings":
          // let settings = new Settings(this);
          break;
      }
      // 阻止默认的 open 事件
      return { action: "deny" };
    });

    this.loadURL("http://localhost:3000/pages/home/index.html");
  }
};
