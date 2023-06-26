const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('Data', {
  info: (section) => ipcRenderer.invoke('info', section), // retrives the main info
  formData: (section) => ipcRenderer.invoke('formData', section), // Depends on the section the user are, some forms need data from other table
  createEntrance: (section, form) => ipcRenderer.invoke('createEntrance', section, form), // This property handles the information that comes from a form
  individualData: (section, id) => ipcRenderer.invoke('individualData', section, id), // This property handles the individual (product, order,  provider) info, it is a "FinOne.."
  deleteEntrance: (section, id) => ipcRenderer.invoke('deleteEntrance', section, id), // Delete an entrance from the db
  updateEntrance: (section, id, data) => ipcRenderer.invoke('updateEntrance', section, id, data), // Update an entrance from the db
  getProduct: (form, shoppingCart) => ipcRenderer.invoke('getProduct', form, shoppingCart), // Search a product by its code bar
  productSelect: () => ipcRenderer.invoke('productSelect'), // Gets all the products to use them in sales section
  createSale: (items) => ipcRenderer.invoke('createSale', items), // Create sale
  getSales: (dates) => ipcRenderer.invoke('getSales', dates), // Create sale
  addProducts: (id) => ipcRenderer.invoke('addProducts', id)

})
