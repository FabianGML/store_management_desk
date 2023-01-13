const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const ProductService = require('./services/product.service');
const OrderService = require('./services/order.service');
const ProviderService = require('./services/provider.service');
const LabService = require('./services/lab.service');



async function sendInfo(event, section) {
  const info = await getInfo(section)
  return info
}

function getInfo(section) {
  let info; 
  switch (section) {
    case 'Productos':
      const productService = new ProductService();
      info = productService.getAllProducts()
      break;

    case 'Pedidos':
      const orderService = new OrderService();
      info = orderService.getOrders();
      break;

    case 'Proveedores':
      const providerService = new ProviderService();
      info = providerService.getProviders();
      break;
    case 'Laboratorios':
      const labService = new LabService();
      info = labService.getAllLabs();
      break;
      
    default:
      break;
    }
  return info
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
    ipcMain.handle('data', sendInfo);
    mainWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) mainWindow()
    })
  })