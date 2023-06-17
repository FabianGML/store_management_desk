// const boom = require('@hapi/boom')

const { Op } = require('sequelize')
const { models } = require('./../libs/sequelize')

class SaleService {
  getDate () {
    const fechaActual = new Date()
    const year = fechaActual.getFullYear()
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0')
    const day = String(fechaActual.getDate()).padStart(2, '0')
    const fechaFormateada = `${year}-${month}-${day}`
    return fechaFormateada
  }

  async getAllSales () {
    const sales = await models.Sale.findAll()
    return sales
  }

  async getOneSale (saleId) {
    /* Should include the products in the future */
    const sale = await models.Sale.findByPk(saleId, {
      include: ['products']
    })
    return sale
  }

  async createSale (data, userId) {
    const sale = await models.Sale.create({
      total: 0.1,
      userId
    })
    const prices = []
    const items = []
    for (const item of data.items) {
      const product = await models.Product.findByPk(item.productId)
      if (product) {
        item.unitPrice = product.price
        item.TotalUnit = item.unitPrice * item.amount
        item.saleId = sale.id
        prices.push(item.TotalUnit)
        items.push(item)
        await models.Product.update({
          ...product,
          stock: product.stock - item.amount
        }, { where: { id: item.productId } })
      }
    }
    await models.SaleProduct.bulkCreate(items)
    const total = prices.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    console.log(total)
    sale.update({
      total
    })
    return '¡Compra Registrada Correctamente!'
  }

  async getSalesBetweenDates (dates) {
    const date = this.getDate()
    const tableInfo = await models.Sale.findAll({
      where: {
        saleDate: {
          [Op.between]: [`${date}T00:00:00-06:00`, `${date}T23:59:59-06:00`]
        }
      },
      order: [['sale_date', 'DESC']],
      raw: true
    })
    const dayTotal = await models.Sale.sum('total', {
      where: {
        saleDate: {
          [Op.between]: [`${date}T00:00:00-06:00`, `${date}T23:59:59-06:00`]
        }
      }
    })
    return {
      tableInfo,
      dayTotal
    }
  }
}

module.exports = SaleService
