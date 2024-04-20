const { app, BrowserWindow } = require('electron/main');

const isDev = process.argv.slice(1).some((val) => val === "--dev");
const path = require("path");
const url = require("url");

process.env.ASTRA_DB_APPLICATION_TOKEN = "AstraCS:GZAjWxoATAELyJAogaqXwMnQ:57be945a8b0b11e1bcc82cba5e44a7f625175fc0cd1244ed87068414fe2c31d9";
process.env.ASTRA_DB_SECURE_BUNDLE_PATH = "src/app/services/cassandra/credentials/secure-connect-db-app-1.zip";

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  if (isDev) {
    void win.loadURL(
      url.format({
        pathname: "localhost:4200",
        protocol: "http:",
        slashes: true,
      })
    );

    win.webContents.openDevTools();
  } else {
    void win.loadURL(
      url.format({
        pathname: path.join(__dirname, "../dist/subd/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
