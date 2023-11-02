const boom = require('@hapi/boom')
const sequelize = require('sequelize')

const { models } = require('./../libs/sequelize')
const nameFormat = require('./helpers/nameFormat')

class LabService {
  /*
    Se tendra que incluir los proveedores que maneja este laboratorio, y quizas cuantos productos de
    ese laboratorio hay
     */
  async getAllLabs () {
    const labs = await models.Lab.findAll({
      order: sequelize.col('name'),
      raw: true
    })
    return labs
  }

  async getOneLab (id) {
    const lab = await models.Lab.findByPk(id, {
      raw: true
    })
    const products = []
    const dbProducts = await models.Product.findAll({ where: { labId: lab.id }, raw: true })
    products.push(...dbProducts)

    if (!lab) {
      throw boom.badRequest('El laboratorio no existe')
    }
    return { ...lab, products } // Se le agregara los proveedores y productos
  }

  async createLab (data) {
    const name = nameFormat(data.name)
    const newLab = await models.Lab.create({
      name
    })
    return { message: `¡Laboratorio ${newLab.name} agregado exitosamente!` }
  }

  async updateLab (labId, data) {
    const { id } = await this.getOneLab(labId)
    const name = nameFormat(data.name)
    console.log(name)
    await models.Lab.update({ name }, { where: { id } })
    return '¡El laboratorio cambio correctamente!'
  }

  async deleteLab (id) {
    const lab = await models.Lab.destroy({ where: { id } })
    return `¡Laboratorio ${lab.name} borrado!`
  }

  async getLabSelect () {
    const labs = await models.Lab.findAll({ raw: true })
    const names = labs.map((lab) => {
      return {
        name: lab.name
      }
    })
    return names
  }
}

module.exports = LabService
