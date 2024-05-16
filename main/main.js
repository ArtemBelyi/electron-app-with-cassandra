const { app, BrowserWindow } = require('electron/main');

const isDev = process.argv.slice(1).some((val) => val === "--dev");
const path = require("path");
const url = require("url");

process.env.ASTRA_DB_APPLICATION_TOKEN_1 = "AstraCS:gwUPAQWUYwZqAXeKNpXgPkAQ:04645b5637c4ae509a1b7ba755ccb2f57bed70106924d3ef936e56e4c73cf7e0";
process.env.ASTRA_DB_SECURE_BUNDLE_PATH_1 = "src/app/services/cassandra/credentials/secure-connect-db-app-1.zip";

process.env.ASTRA_DB_APPLICATION_TOKEN_2 = "AstraCS:EGogjFdtGWxAteJOSFsKRibD:efd69450d1bd7e81a20f30ad33fcc29af5cea59cd4bb6996c1c734b830d4242c";
process.env.ASTRA_DB_SECURE_BUNDLE_PATH_2 = "src/app/services/cassandra/credentials/secure-connect-db-app-2.zip";

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
