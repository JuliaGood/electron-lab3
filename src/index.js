const { app, BrowserWindow } = require('electron');
const os  = require('os-utils');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 400,
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile('./src/index.html');
  // mainWindow.webContents.openDevTools();

  setInterval(() => {
    os.cpuUsage(function(v) {
      //console.log("CPU Usage (%): " + v * 100);
      mainWindow.webContents.send("cpu", (v * 100).toFixed(2));
      //console.log("Mem Usage (%): " + os.freememPercentage() * 100);
      mainWindow.webContents.send("mem", (os.freememPercentage() * 100).toFixed(2));
      //console.log("Total Mem (GB): " + os.totalmem() / 1024);
      mainWindow.webContents.send("total-mem", (os.totalmem() / 1024).toFixed(0));
      //console.log("Platform: " + os.platform());
      mainWindow.webContents.send("platform", os.platform());
    });
  }, 1000);
}

app.whenReady().then(() => {
  createWindow();
})
