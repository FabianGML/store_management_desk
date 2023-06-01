const boom = require('@hapi/boom')
const path = require('path')
const fs = require('fs')

const { models } = require('./../libs/sequelize')

class ProductService {
  constructor () {
    this.imagePath = ''
  }

  handleImage (image, name) {
    // -----------------All Constants we'll need -------------------------
    const imageRoute = path.join(__dirname, '../src/images')
    const destinationPath = path.join(imageRoute, image.name)
    const extention = image.type.split('/')[1]
    const newName = path.join(name + `.${extention}`)
    // -------------------------------------------------------------------
    // Copy the file from the user computer to the project image file
    fs.copyFile(image.path, destinationPath, (err) => {
      if (err) {
        console.error('Error al mover el archivo:', err)
      } else {
        console.log('Archivo movido exitosamente')
      }
    })
    // change the file name to the product name
    fs.rename(destinationPath, path.join(imageRoute, newName), (err) => {
      if (err) {
        console.error('Error al mover el archivo:', err)
      } else {
        console.log('Archivo movido exitosamente')
      }
    })
    return newName
  }

  async getAllProducts () {
    const products = await models.Product.findAll({
      include: ['lab'],
      order: ['stock'],
      raw: true
    })
    const providers = await models.ProductProvider.findAll({
      raw: true,
      include: ['provider']
    })

    const combinedInfo = products.map((product) => {
      const matchProviders = []
      for (const provider of providers) {
        if (product.id === provider.productId) {
          matchProviders.push(provider['provider.name'])
        }
      }
      const cleanMatchProviders = matchProviders.filter(
        (prodProvider, index) => {
          return matchProviders.indexOf(prodProvider) === index
        }
      )
      return {
        ...product,
        providers: cleanMatchProviders
      }
    })
    return combinedInfo
  }

  async getOneProduct (id) {
    const product = await models.Product.findByPk(id, {
      include: ['lab'],
      raw: true
    })
    if (!product) {
      throw boom.badRequest('El producto no existe')
    }
    return product
  }

  async createProduct (data) {
    let name = data.name
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd()
    /*
    if there is an image, we store it in ./images and change the file name
    to the product name
    */
    if (data.image) {
      this.imagePath = this.handleImage(data.image, name)
    }
    const newProduct = await models.Product.create({
      ...data,
      image: this.imagePath,
      name
    })
    return `¡Producto ${newProduct.name} agregado correctamente`
  }

  async updateProduct (id, data) {
    let name = data.name
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd()
    const product = await this.getOneProduct(id)
    if (data.image) {
      this.imagePath = this.handleImage(data.image, name)
    }
    await models.Product.update(
      {
        ...data,
        image: this.imagePath,
        name
      },
      {
        where: { id }
      }
    )
    return `Producto ${product.name} actualizado correctamente`
  }

  async deleteProduct (id) {
    const product = await models.Product.destroy({ where: { id } })
    return `Producto ${product} eliminado correctamente`
  }

  async getProductForSale (form, shoppingCart) {
    let product
    if (form.code) {
      product = await models.Product.findOne({
        where: { barCode: form.code },
        raw: true
      })
    } else if (form.product) {
      product = await models.Product.findOne({
        where: { id: form.product },
        raw: true
      })
    }

    if (!product) {
      return 'El producto no existe'
    }

    if (shoppingCart.length < 1) {
      return [
        {
          id: product.id,
          name: product.name,
          amount: 1,
          unitPrice: product.price,
          total: product.price
        }
      ]
    } else {
      if (!shoppingCart.some((element) => element.id === product.id)) {
        shoppingCart.push({
          id: product.id,
          name: product.name,
          amount: 1,
          unitPrice: product.price,
          total: product.price
        })
      } else {
        for (const item of shoppingCart) {
          if (item.id === product.id) {
            item.amount += 1
            item.total = item.unitPrice * item.amount
          }
        }
      }
      return shoppingCart
    }
  }

  async getProductSelect () {
    const products = await models.Product.findAll({ raw: true })
    const idsAndNames = products.map((product) => {
      return {
        id: product.id,
        name: product.name
      }
    })
    return idsAndNames
  }
}

module.exports = ProductService
