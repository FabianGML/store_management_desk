const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const ProductService = require('./services/product.service');
const OrderService = require('./services/order.service');
const ProviderService = require('./services/provider.service');
const LabService = require('./services/lab.service');


const services = {
  'Productos': {
    'mainInfo': {service: new ProductService(), method: 'getAllProducts'},
    'formInfo': {service: new LabService(), method: 'getAllLabs'},
    'createProduct': {service: new ProductService(), method: 'create'}
  },
  'Pedidos': {
    'mainInfo': {service: new OrderService(), method: 'getOrders'},
    'formInfo': {service: new ProviderService(), method: 'getProviders'},
    'createOrder': {service: new OrderService(), method: 'createOrder'}
  },
  'Proveedores': {
    'mainInfo': {service: new ProviderService(), method: 'getProviders'},
    'formInfo': {service: new LabService(), method: 'getAllLabs'},
    'createProvider': {service: new ProviderService(), method: 'createProvider'}
  },
  'Laboratorios': {
    'mainInfo': {service: new LabService(), method: 'getAllLabs'},
    'formInfo': {service: new ProductService(), method: 'getAllProducts'},
    'createLab': {service: new LabService(), method: 'createLab'}
  }
};

async function getInfo(event, section) {
  try {
    const serviceData = services[section];
    if (serviceData) {
      const {service, method} = serviceData[Object.keys(serviceData)[0]];
      return await service[method]();
    } else {
      return null;
    }
  } catch (error) {
    // Manejar la excepción
    console.error(`Se produjo un error: ${error}`);
    return null;
  }
}

async function sendFormInfo(event, section) {
  try {
    const serviceData = services[section];
    if (serviceData) {
      const {service, method} = serviceData[Object.keys(serviceData)[1]];
      return await service[method]();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
  }
}

async function createNewEntrance(event, section, data) {
  try {
    console.log(`Informacion que llega: ${data}`)
    const serviceData = services[section];
    if (serviceData) {
      const {service, method} = serviceData[Object.keys(serviceData)[2]];
      return await service[method](data);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
  }
}

function mainWindow() {
    const mainWin = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWin.loadFile('./public/index.html');
    mainWin.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
    ipcMain.handle('info', getInfo);
    ipcMain.handle('formData', sendFormInfo);
    ipcMain.handle('sendedForm', createNewEntrance);
    mainWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) mainWindow()
    })
  })