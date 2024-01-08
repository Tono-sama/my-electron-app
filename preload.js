const { contextBridge, ipcRenderer, IpcRendererEvent } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('printLog', {
  print: () => ipcRenderer.invoke('print-log:print')
})

// HTTP request
contextBridge.exposeInMainWorld('httpRequest', {
  get: () => ipcRenderer.invoke('http-request:get')
})

// DB操作
contextBridge.exposeInMainWorld('postgres', {
  get: () => ipcRenderer.invoke('postgres:get'),
  insert: () => ipcRenderer.invoke('postgres:insert')
})

// ファイル操作
contextBridge.exposeInMainWorld('file', {
  select: () => ipcRenderer.invoke('file:select'),
  save: (data) => ipcRenderer.invoke('file:save', data)
});

contextBridge.exposeInMainWorld('fileIO', {
  readFile: (listener) => ipcRenderer.on('read-file', listener),
});