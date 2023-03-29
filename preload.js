const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('Data', {
    info: (section) => ipcRenderer.invoke('info', section), // retrives the main info 
    formData: (section) => ipcRenderer.invoke('formData', section), //Depends on the section the user are, some forms need data from other table
    sendForm: (section, form) => ipcRenderer.invoke('sendedForm', section, form) //This property handles the information that comes from a form
})