const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')
const nameFormat = require('./helpers/nameFormat')

class ProviderService {
  /*
    check if each lab name exist in the db, if not, create an entrance in the db and adds the id to de data
    if the name exist in the db, just add the id, returns all labs with their labId and providerId
  */
  async labExist (data, providerId) {
    const labs = []
    for (const lab of data) {
      const name = nameFormat(lab.labName)

      const dbLab = await models.Lab.findOne({ where: { name } })

      if (!dbLab) {
        const newLab = await models.Lab.create({
          name
        })
        lab.lab = newLab.dataValues.id
      } else {
        lab.lab = dbLab.dataValues.id
      }
      lab.providerId = providerId
      labs.push(lab)
    }
    return labs
  }

  async getProviders () {
    const rta = await models.Provider.findAll({
      raw: true
    })
    return rta
  }

  async getOneProvider (id) {
    // Find the provider by its id, and it's not in the db, we throw an error
    const provider = await models.Provider.findByPk(id, { raw: true })
    if (!provider) {
      throw boom.badRequest('El proveedor no existe')
    }
    // search by providerId in the ProductsProvider and LabProvider tables
    const labsIds = await models.LabProvider.findAll({
      where: { providerId: provider.id },
      raw: true
    })
    const productsIds = await models.ProductProvider.findAll({
      where: { providerId: provider.id },
      raw: true
    })

    const labs = []
    const items = []
    /* -----------------------------------------------------------------------------------------------
    For each result from the ProductsProvider and LabProvider tables, we need to find the information
    from each item and each lab to print it on the screen

    ------------------------------------------------------------------------------------------------ */
    for (const lab of labsIds) {
      const labName = await models.Lab.findByPk(lab.labId)
      labs.push({ labId: lab.labId, labName: labName.name })
    }

    for (const item of productsIds) {
      const productInfo = await models.Product.findByPk(item.productId)
      items.push({
        id: productInfo.id,
        productName: productInfo.name,
        stock: productInfo.stock,
        expiration: productInfo.expiration,
        lab: productInfo.labId
      })
    }

    const completeProvider = { ...provider, labs, items }
    return completeProvider
  }

  async createProvider (data) {
    const name = nameFormat(data.name)
    const newProvider = await models.Provider.create({
      name,
      email: data.email,
      phone: data.phone
    })

    await this.addProdProv(newProvider.id, data.items)
    return `Proveedor ${newProvider.name} agregado correctamente`
  }

  async updateProvider (providerId, data) {
    const name = nameFormat(data.name)
    await models.Provider.update(
      {
        ...data,
        name
      },
      { where: { id: providerId } }
    )
    await this.updateItems(data.items, providerId)

    return '¡El proveedor cambio correctamente!'
  }

  async updateItems (items, providerId) {
    /* ---------------------------------------------------------------------------------
    if the user adds, update or delete a lab from a provider, this code block add or update the
    lab wheter or not the name has changed
  */
    const dbProductsProvider = await models.ProductProvider.findAll({ where: { providerId }, raw: true })
    const dbLabsProviders = await models.LabProvider.findAll({ where: { providerId }, raw: true })
    const dbLabsProvidersIds = dbLabsProviders.map(row => row.labId)
    const formLabs = []
    const formProducts = []
    const productsToCreateInBulk = []
    if (items.length > 0) {
      for (const item of items) {
        const { id } = item
        const dbProduct = await models.Product.findByPk(id, { raw: true })
        if (dbProduct) {
          productsToCreateInBulk.push({ id: dbProduct.id })
          formProducts.push(id)
          formLabs.push(dbProduct.labId)
        } else {
          const newProduct = await this.addProdProv(providerId, [item])
          formProducts.push(newProduct.id)
          formLabs.push(newProduct.labId)
        }
      }
      await this.addProdProv(providerId, productsToCreateInBulk)
    }
    if (dbProductsProvider) {
      const labsIdsToDelete = dbLabsProvidersIds.filter(labId => !formLabs.includes(labId))
      for (const labId of labsIdsToDelete) {
        await models.LabProvider.destroy({ where: { labId } })
      }
      const dbProductsIds = dbProductsProvider.map(row => row.productId)
      const productsIdsToDelete = dbProductsIds.filter(product => !formProducts.includes(product))
      for (const productId of productsIdsToDelete) {
        await models.ProductProvider.destroy({ where: { productId } })
      }
    }
  }
  // ------------------------------------------------------------------------------------

  async deleteProvider (id) {
    const provider = await this.findOne(id)
    await provider.destroy()
    return {
      message: `¡Proveedor ${provider.name} borrado!`
    }
  }

  /* LabProvider Service */
  async addLabs (data, providerId) {
    const labs = await this.labExist(data, providerId)
    await models.LabProvider.bulkCreate(labs)

    return labs
  }

  async deleteLabs (data, providerId) {
    /* ---------------------------------------------------------------------------------
      if the user deletes an item from an order, this code block find the items the user wants to remove
      and remove it
    */
    const labProvider = await models.LabProvider.findAll({
      where: { providerId }
    })

    const dbLabsIds = labProvider.map((labProv) => labProv.labId)
    const formLabsIds = data.map((form) => form.lab)
    const labsIdsForDelete = dbLabsIds.filter(
      (labId) => !formLabsIds.includes(labId)
    )
    if (labsIdsForDelete) {
      for (const deleteLabId of labsIdsForDelete) {
        await models.LabProvider.destroy({
          where: { labId: deleteLabId, providerId }
        })
      }
    }

    // -----------------------------------------------------------------------------------
    return labsIdsForDelete
  }

  /*
  method used to add the relation between a provider and the products that belongs to that particular provider
  data needed: {providerId: 1, items:[ { productId: 1 } ]
 */
  async addProdProv (providerId, items) {
    const productsToCreateInBulk = []
    const rawLabsToCreateInBulk = []
    const labsProvidersDb = await models.LabProvider.findAll({ where: { providerId }, raw: true })
    const labsProvidersIds = labsProvidersDb.map(row => row.labId)
    if (items) {
      for (const item of items) {
        const { id } = item
        console.log(item)
        if (item.lab && typeof item.lab !== 'number') {
          const name = nameFormat(item.lab)
          const newLab = await models.Lab.create({ name })
          item.lab = newLab.id
        }
        const dbProduct = await models.Product.findByPk(id, { raw: true })
        if (dbProduct) {
          if (!await models.ProductProvider.findOne({ where: { productId: dbProduct.id, providerId } })) {
            productsToCreateInBulk.push({
              productId: id,
              providerId
            })
          }
          if (!rawLabsToCreateInBulk.includes(dbProduct.labId)) {
            rawLabsToCreateInBulk.push(dbProduct.labId)
          }
        } else {
          const name = nameFormat(item.productName)
          // eslint-disable-next-line no-var
          var newProduct = await models.Product.create({
            name,
            price: Number(item.price),
            stock: Number(item.amount),
            codeBar: Number(item.codeBar) || null,
            ingredients: item.ingredients,
            labId: item.lab,
            description: item.description || '',
            expiration: item.expiration
          }, { raw: true })
          productsToCreateInBulk.push({
            productId: newProduct.id,
            providerId
          })
          if (!rawLabsToCreateInBulk.includes(item.lab)) {
            rawLabsToCreateInBulk.push(item.lab)
          }
        }
      }
      await models.ProductProvider.bulkCreate(productsToCreateInBulk)
      if (rawLabsToCreateInBulk.length > 0) {
        const labsToAdd = rawLabsToCreateInBulk.filter(labId => !labsProvidersIds.includes(labId)).map((labId) => { return { labId, providerId } })
        await models.LabProvider.bulkCreate(labsToAdd)
      }
    }
    return newProduct
  }
}

module.exports = ProviderService
