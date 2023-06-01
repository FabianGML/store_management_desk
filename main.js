const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const ProductService = require('./services/product.service')
const OrderService = require('./services/order.service')
const ProviderService = require('./services/provider.service')
const LabService = require('./services/lab.service')
const SaleService = require('./services/sale.service')

const services = {
  Productos: {
    mainInfo: { service: new ProductService(), method: 'getAllProducts' },
    formInfo: { service: new LabService(), method: 'getAllLabs' },
    createProduct: { service: new ProductService(), method: 'createProduct' },
    getOneProduct: { service: new ProductService(), method: 'getOneProduct' },
    deleteProduct: { service: new ProductService(), method: 'deleteProduct' },
    updateProduct: { service: new ProductService(), method: 'updateProduct' },
    getProductByCode: { service: new ProductService(), method: 'getProductForSale' }
  },
  Pedidos: {
    mainInfo: { service: new OrderService(), method: 'getOrders' },
    formInfo: { service: new ProviderService(), method: 'getProviders' },
    createOrder: { service: new OrderService(), method: 'createOrder' },
    getOneOrder: { service: new OrderService(), method: 'getOneOrder' },
    deleteOrder: { service: new OrderService(), method: 'deleteOrder' },
    updateOrder: { service: new OrderService(), method: 'updateOrder' }
  },
  Proveedores: {
    mainInfo: { service: new ProviderService(), method: 'getProviders' },
    formInfo: { service: new LabService(), method: 'getAllLabs' },
    createProvider: { service: new ProviderService(), method: 'createProvider' },
    getOneProvider: { service: new ProviderService(), method: 'getOneProvider' },
    deleteProvider: { service: new ProviderService(), method: 'deleteProvider' },
    updateProvider: { service: new ProviderService(), method: 'updateProvider' }
  },
  Laboratorios: {
    mainInfo: { service: new LabService(), method: 'getAllLabs' },
    formInfo: { service: new ProductService(), method: 'getAllProducts' },
    createLab: { service: new LabService(), method: 'createLab' },
    getOneLab: { service: new LabService(), method: 'getOneLab' },
    deleteLab: { service: new LabService(), method: 'deleteLab' },
    updateLab: { service: new LabService(), method: 'updateLab' }
  }
}

async function getInfo (event, section) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[0]]
      return await service[method]()
    } else {
      return null
    }
  } catch (error) {
    console.error(`Se produjo un error: ${error}`)
    return null
  }
}

async function sendFormInfo (event, section) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[1]]
      return await service[method]()
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
  }
}

async function createNewEntrance (event, section, data) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[2]]
      return await service[method](data)
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
  }
}

async function getOneDataById (event, section, id) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[3]]
      return await service[method](id)
    }
  } catch (error) {
    console.error(error)
  }
}

async function deleteEntrance (event, section, id) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[4]]
      return await service[method](id)
    }
  } catch (error) {
    console.error(error)
  }
}

async function updateEntrance (event, section, id, data) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[5]]
      return await service[method](id, data)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getProductByCode (event, form, shoppingCart) {
  try {
    const productService = new ProductService()
    if (productService) {
      const res = await productService.getProductForSale(form, shoppingCart)
      return res
    }
  } catch (error) {
    console.error(error)
  }
}

async function getProductSelect (event) {
  try {
    const productService = new ProductService()
    if (productService) {
      return await productService.getProductSelect()
    }
  } catch (error) {
    console.error(error)
  }
}

async function createSale (event, items) {
  try {
    const saleService = new SaleService()
    if (saleService) {
      return await saleService.createSale(items)
    }
  } catch (error) {
    console.error(error)
  }
}

function mainWindow () {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWin.loadFile('./public/index.html')
  mainWin.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  ipcMain.handle('info', getInfo)
  ipcMain.handle('formData', sendFormInfo)
  ipcMain.handle('sendedForm', createNewEntrance)
  ipcMain.handle('individualData', getOneDataById)
  ipcMain.handle('deleteEntrance', deleteEntrance)
  ipcMain.handle('updateEntrance', updateEntrance)
  ipcMain.handle('getProduct', getProductByCode)
  ipcMain.handle('productSelect', getProductSelect)
  ipcMain.handle('createSale', createSale)
  mainWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
  })
})
