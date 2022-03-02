const { app, BrowserWindow, Menu, Tray } = require("electron");
const ipcRegister = require("./ipc/main");
const Home = require("./windows/home");

let tray = null;

app.commandLine.appendSwitch("--disable-http-cache");

app.whenReady().then(() => {
  ipcRegister();

  const homeWin = new Home();

  const trayMenu = Menu.buildFromTemplate([
    { label: "显示", type: "normal" },
    { label: "退出", type: "normal" },
  ]);
  trayMenu.items[0].click = () => {
    homeWin.show();
  };
  trayMenu.items[1].click = () => {
    BrowserWindow.getAllWindows().forEach((item) => {
      item.destroy();
    });
    app.exit();
  };

  tray = new Tray("./public/favicon.ico");
  tray.setToolTip("iShell");
  tray.setContextMenu(trayMenu);
  tray.on("double-click", () => {
    homeWin.show();
  });
});
