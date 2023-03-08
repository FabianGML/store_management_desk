const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('Data', {
    info: (section) => ipcRenderer.invoke('info', section),
    formData: () => ipcRenderer.invoke('formData'),
    extraData: () => ipcRenderer.invoke('extraData'),
    sendForm: (form) => ipcRenderer.invoke('sendedForm', form)
})