// const boom = require('@hapi/boom')

const { Op } = require('sequelize')
const { models } = require('./../libs/sequelize')

class SaleService {
  getCurrentDatesAsString () {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const date = `${year}-${month}-${day}`

    const monthStartDate = `${year}-${month}-01`

    const lastDayOfMonth = new Date(year, month, 0).getDate()
    const monthEndDate = `${year}-${month}-${String(lastDayOfMonth).padStart(2, '0')}`

    const currentDay = currentDate.getDay()
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1))

    const endOfWeek = new Date(currentDate)
    endOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? 0 : 6))

    const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0]
    const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0]

    return { date, monthStartDate, monthEndDate, formattedStartOfWeek, formattedEndOfWeek }
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

  async createSale (data) {
    const sale = await models.Sale.create({
      total: 0.1
    })
    const prices = []
    const items = []
    for (const item of data) {
      console.log('item---------------', item)
      const product = await models.Product.findByPk(item.productId)
      if (product) {
        item.TotalUnit = item.total
        item.saleId = sale.id
        console.log('item.total-----------', item.total)
        prices.push(item.total)
        items.push(item)
        await models.Product.update({
          ...product,
          stock: product.stock - item.amount
        }, { where: { id: item.productId } })
      }
    }
    console.log('items-----------', items)
    await models.SaleProduct.bulkCreate(items)
    const total = prices.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    console.log(total)
    sale.update({
      total
    })
    return '¡Compra Registrada Correctamente!'
  }

  async getSalesBetweenDates (dates) {
    const { date, monthStartDate, monthEndDate, formattedStartOfWeek, formattedEndOfWeek } = this.getCurrentDatesAsString()
    console.log('sartDate', monthStartDate)
    console.log('endDate', monthEndDate)
    console.log('startWeekDay', formattedStartOfWeek)
    console.log('endWeekDay', formattedEndOfWeek)
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
    const weekTotal = await models.Sale.sum('total', {
      where: {
        saleDate: {
          [Op.between]: [`${formattedStartOfWeek}T00:00:00-06:00`, `${formattedEndOfWeek}T23:59:59-06:00`]
        }
      }
    })
    const monthTotal = await models.Sale.sum('total', {
      where: {
        saleDate: {
          [Op.between]: [`${monthStartDate}T00:00:00-06:00`, `${monthEndDate}T23:59:59-06:00`]
        }
      }
    })
    console.log(`date------------- ${date}`)
    return {
      tableInfo,
      dayTotal,
      weekTotal,
      monthTotal
    }
  }
}

module.exports = SaleService
