const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('Data', {
    info: (section) => ipcRenderer.invoke('info', section),
    extraData: () => ipcRenderer.invoke('extraData'),
    sendForm: (form) => ipcRenderer.invoke('sendedForm', form)
})