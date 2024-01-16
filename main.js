const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const ProductService = require('./services/product.service')
const OrderService = require('./services/order.service')
const ProviderService = require('./services/provider.service')
const LabService = require('./services/lab.service')
const SaleService = require('./services/sale.service')
const { labSchema } = require('./schemas/lab.schema')
const { createProductSchema } = require('./schemas/product.schema')
const { createOrderSchema } = require('./schemas/order.schema')
const { createProviderSchema } = require('./schemas/provider.schema')

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
    updateOrder: { service: new OrderService(), method: 'updateOrder' },
    thirdSelectData: { service: new LabService(), method: 'getAllLabs' }
  },
  Proveedores: {
    mainInfo: { service: new ProviderService(), method: 'getProviders' },
    formInfo: { service: new LabService(), method: 'getAllLabs' },
    createProvider: { service: new ProviderService(), method: 'createProvider' },
    getOneProvider: { service: new ProviderService(), method: 'getOneProvider' },
    deleteProvider: { service: new ProviderService(), method: 'deleteProvider' },
    updateProvider: { service: new ProviderService(), method: 'updateProvider' },
    thirdSelectData: { service: new LabService(), method: 'getAllLabs' }
  },
  Laboratorios: {
    mainInfo: { service: new LabService(), method: 'getAllLabs' },
    formInfo: { service: new ProductService(), method: 'getAllProducts' },
    createLab: { service: new LabService(), method: 'createLab' },
    getOneLab: { service: new LabService(), method: 'getOneLab' },
    deleteLab: { service: new LabService(), method: 'deleteLab' },
    updateLab: { service: new LabService(), method: 'updateLab' }
  },
  Ventas: {
    mainInfo: { service: new SaleService(), method: 'getSalesBetweenDates' }
  }
}
const schemas = {
  Productos: createProductSchema,
  Laboratorios: labSchema,
  Pedidos: createOrderSchema,
  Proveedores: createProviderSchema
}

async function getInfo (event, section, inputValue) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[0]]
      return await service[method]({ inputValue })
    } else {
      return null
    }
  } catch (error) {
    console.error(`Se produjo un error: ${error}`)
    return null
  }
}

async function sendPrimarySelectData (event, section) {
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
    console.log('data ------------------->', data)
    const serviceData = services[section]
    if (!serviceData) return null
    const { error } = schemas[section].validate(data, { abortEarly: false })
    if (error) {
      console.log(error)
      const errors = error.details.map(obj => {
        if (obj.path[0] !== 'items') return obj.path[0]
        const matchResult = obj.message.match(/\.([^."'\s]+)/)
        let wordInsideQuotes
        console.log('matchResult---------', matchResult)
        if (matchResult && matchResult.length >= 2) {
          wordInsideQuotes = matchResult[1]
        }
        return wordInsideQuotes
      })
      return {
        validationErrors: errors
      }
    }
    const { service, method } = serviceData[Object.keys(serviceData)[2]]
    return await service[method](data)
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
      const { error } = schemas[section].validate(data, { abortEarly: false })
      if (error) {
        console.log(error)
        const errors = error.details.map(obj => {
          if (obj.path[0] === 'items') {
            const matchResult = obj.message.match(/\.([^."'\s]+)/)
            let wordInsideQuotes
            if (matchResult && matchResult.length >= 2) {
              wordInsideQuotes = matchResult[1]
            }
            return wordInsideQuotes
          } else {
            return obj.path[0]
          }
        })
        return {
          validationErrors: errors
        }
      } else {
        const { service, method } = serviceData[Object.keys(serviceData)[5]]
        return await service[method](id, data)
      }
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
  }
}

async function sendSecondarySelectData (event, section) {
  try {
    if (section === 'Proveedores' || section === 'Pedidos') {
      const products = getProductSelect()
      return products
    } else {
      getLabsSelect()
    }
  } catch (error) {
    console.error(error)
  }
}

async function sendThirdSelectData (event, section, id, data) {
  try {
    const serviceData = services[section]
    if (serviceData) {
      const { service, method } = serviceData[Object.keys(serviceData)[6]]
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

async function getLabsSelect (event) {
  try {
    const labService = new LabService()
    if (labService) {
      return await labService.getLabSelect()
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

async function getSale (event, dates) {
  try {
    const saleService = new SaleService()
    if (saleService) {
      return await saleService.getSalesBetweenDates(dates)
    }
  } catch (error) {

  }
}

async function addProducts (event, id) {
  try {
    const providerService = new ProviderService()
    if (providerService) {
      return await providerService.addProdProv(id)
    }
  } catch (error) {

  }
}

function mainWindow () {
  const mainWin = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWin.loadFile('./public/index.html')
  mainWin.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  ipcMain.handle('info', getInfo)
  ipcMain.handle('primarySelectData', sendPrimarySelectData)
  ipcMain.handle('secondarySelectData', sendSecondarySelectData)
  ipcMain.handle('thirdSelectData', sendThirdSelectData)
  ipcMain.handle('createEntrance', createNewEntrance)
  ipcMain.handle('sendedForm', createNewEntrance)
  ipcMain.handle('individualData', getOneDataById)
  ipcMain.handle('deleteEntrance', deleteEntrance)
  ipcMain.handle('updateEntrance', updateEntrance)
  ipcMain.handle('getProduct', getProductByCode)
  ipcMain.handle('productSelect', getProductSelect)
  ipcMain.handle('createSale', createSale)
  ipcMain.handle('getSales', getSale)
  ipcMain.handle('addProducts', addProducts)
  mainWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
  })
})
