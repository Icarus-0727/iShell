const { BrowserWindow } = require("electron");

module.exports = class extends BrowserWindow {
  constructor(parent, id) {
    super({
      parent,
      modal: true,
      width: 400,
      height: 650,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.loadURL(`http://localhost:3000/pages/connEditor/index.html?id=${id}`);
  }
};
