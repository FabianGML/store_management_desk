const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('Products', {
    products: () => ipcRenderer.invoke('products').then(result => result)
})