const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main');
const { Menu, dialog } = require('electron');
const path = require('node:path');
const axios = require('axios');
const fs = require('fs');
const { Client } = require('pg');

let win = null;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

ipcMain.handle('print-log:print', () => {
  console.log('print log from main.js')
})

// HTTP request
ipcMain.handle('http-request:get', async () => {
  console.log('http-request:get')
  const url = "https://qiita.com/api/v2/items";
  result = null;
  await axios.get(url).then(res => {
    result = {
      status: res.status,
      statusText: res.statusText,
      body: JSON.stringify(res.data)
    };
  }).catch(error => {
    const {
      status,
      statusText
    } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    result = {
      status: status,
      statusText: statusText,
      body: ''
    }
  });
  console.log(result);
  return result;
})

// DB操作
// TODO: 接続設定
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 15432
})

ipcMain.handle('postgres:get', async () => {
  console.log('postgres:get')
  const query = {
    text: 'SELECT * FROM newtable n ;',
    values: [],
  };

  result = null;
  await client.query(query)
    .then(res => {
      result = JSON.stringify(res);
    })
    .catch(e => {
      console.error(e.stack)
      result = JSON.stringify(e);
    })
  console.log(result);
  return result;
})

ipcMain.handle('postgres:insert', async () => {
  console.log('postgres:insert')

  result = null;
  await client.query('INSERT INTO newtable (column1, column2, column3) VALUES($1, $2, $3);', ['test999', 999, true])
    .then(res => {
      result = JSON.stringify(res);
    })
    .catch(e => {
      console.error(e.stack)
      result = JSON.stringify(e);
    })
  console.log(result);
  return result;
})

// TODO: ファイル操作
ipcMain.handle('file:select', async () => {
  console.log('file:select');
  filePath = null;
  await dialog.showOpenDialog({ properties: ['openFile'] })
    .then((res) => {
      console.log(`res: ${res}`);
      if (res.canceled) return null;

      filePath = res.filePaths[0];
      console.log(`filePath: ${filePath}`)
    })
    .catch((err) => {
      console.log(`Error: ${err}`)
      return null;
    })
    
  const result = await fs.readFileSync(filePath, { encoding: 'utf8' });
  win.webContents.send("read-file", result);
  return result;
})

ipcMain.handle('file:save', async (event, data) => {
  console.log('file:save');
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [
      { name: 'Documents', extensions: ['txt'] }
    ]
  })

  if (canceled) return;
  console.log(`filePath: ${filePath}`);
  console.log(`fileContent: ${data}`);
  fs.writeFileSync(filePath, data);
})


app.whenReady().then( async () => {
  createWindow();
  await client.connect();
  console.log('client.connect()');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', async () => {
  await client.end();
  console.log('client.end()');

  if (process.platform !== 'darwin') {
    app.quit();
  }
})
