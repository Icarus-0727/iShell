const { ipcMain } = require("electron");

var container = new Map();

/**
 * args
 * - from : 那个页面发来的数据
 * - to   : 目标页面
 * - data : 转发内容
 */

module.exports = () => {
  ipcMain.on("registry", (e, args) => {
    container.set(args, e.sender);
  });

  ipcMain.on("transfer", (_, args) => {
    var sender = container.get(args.to);
    if (sender) {
      sender.send(args.from, args.data);
    }
  });
};
