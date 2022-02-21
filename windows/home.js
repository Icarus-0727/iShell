const { BrowserWindow } = require("electron");
// const ConnectionManager = require("./ConnectionManager");
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

    // // 自定义页面的 window.open 事件
    // this.webContents.setWindowOpenHandler((opts) => {
    //     switch (opts.frameName) {
    //         // 打开连接管理器
    //         case "connection-manager":
    //             let connMgr = new ConnectionManager(this);
    //             break;
    //         case "settings":
    //             let settings = new Settings(this);
    //             break;
    //     }
    //     // 阻止默认的 open 事件
    //     return { action: "deny" };
    // });

    this.loadURL("http://localhost:3000/pages/home/index.html");
  }
};
