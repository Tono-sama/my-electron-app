const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('printLog', {
  print: () => ipcRenderer.invoke('print-log:print')
})

contextBridge.exposeInMainWorld('httpRequest', {
  get: () => ipcRenderer.invoke('http-request:get')
})

contextBridge.exposeInMainWorld('postgres', {
  get: () => ipcRenderer.invoke('postgres:get'),
  insert: () => ipcRenderer.invoke('postgres:insert')
})

// TODO: ファイル操作
// contextBridge.exposeInMainWorld('file', {
//   open: () => ipcRenderer.invoke('file:open'),
//   download: () => ipcRenderer.invoke('file:download')
// })
