const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        fullscreenable: false,
        autoHideMenuBar: true,
        icon: "html/statics/favicon.ico",
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('html/index.html');
    //win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});