// Module to control application life.
const { app, BrowserWindow, Tray } = require ("electron");
const path = require('path');
const glob = require('glob');
const server = require("./server");
const ipcMain = require('electron').ipcMain;
const ipcRenderer = require('electron').ipcRenderer;
const Config = require('electron-config');
var child_process = require('child_process');

app.setPath('userData', app.getAppPath());

const config = new Config('conf');
const iconPath = path.join(__dirname, config.get('icon_path'));
const admin = "'admin'";


var mainWindow = null;
let tray = null;

global.directory = { path: __dirname };
global.db_path = config.get('db_path');

console.log('start db');
  //start up db if down
  child_process.exec('mongod -dbpath "' + global.db_path + '"', function (err, stdout, stderr) {
     if(err) {
         return;
     } 
  });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  
  tray = new Tray(iconPath);
    tray.setTitle('Netvocat DataSec');
    // Create the browser window.
    mainWindow = new BrowserWindow({ 
        'node-integration': true, 
        webPreferences: {'zoomFactor': config.get('window_zoom')},
        width: config.get('window_width'), 
        height: config.get('window_height'),
        title: 'Netvocat DataSec',
        icon: iconPath,
        show: false});

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost');

    // Open the devtools.
    mainWindow.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        console.log('shutdown database');
        child_process.exec('mongo --eval "db.getSiblingDB(' + admin + ').shutdownServer()"', function (err, stdout, stderr) {
          if(err) {
              console.log(err);
              return;
          }           
        });
        console.log('database shutdown successfully!');
        
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });  
});

