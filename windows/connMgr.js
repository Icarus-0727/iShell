const { BrowserWindow } = require("electron");
const ConnEditor = require("./connEditor");

module.exports = class extends BrowserWindow {
  constructor(parent) {
    super({
      parent,
      modal: true,
      width: 600,
      height: 300,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    // 自定义页面的 window.open 事件
    this.webContents.setWindowOpenHandler((opts) => {
      switch (opts.frameName) {
        // 打开连接管理器
        case "connEditor":
          // 打开页面
          new ConnEditor(this, opts.features);
          break;
      }
      // 阻止默认的 open 事件
      return { action: "deny" };
    });

    this.loadURL("http://localhost:3000/pages/connMgr/index.html");
  }
};
