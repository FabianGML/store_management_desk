const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const ProductService = require('./services/product.service');

const productService = new ProductService();

async function getProducts() {
  const products = await productService.getAllProducts();
  return products
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
    ipcMain.handle('products', getProducts);
    mainWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) mainWindow()
    })
  })