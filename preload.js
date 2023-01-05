const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('Data', {
    info: (section) => ipcRenderer.invoke('data', section).then(result => result)
})