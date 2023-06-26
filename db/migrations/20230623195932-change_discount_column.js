'use strict'
const { DataTypes } = require('sequelize')
const { SALE_TABLE } = require('./../models/sale.model')
const { SALE_PRODUCT_TABLE } = require('../models/sale-product.model')
const { PROVIDER_TABLE } = require('../models/provider.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(SALE_TABLE, 'discount')
    await queryInterface.addColumn(SALE_PRODUCT_TABLE, 'discount', {
      type: DataTypes.STRING,
      allowNull: true
    })
    await queryInterface.removeColumn(PROVIDER_TABLE, 'phone_2')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(SALE_PRODUCT_TABLE, 'discount')
    await queryInterface.addColumn(SALE_TABLE, 'discount', {
      type: DataTypes.STRING,
      allowNull: true
    })
    await queryInterface.addColumn(PROVIDER_TABLE, 'phone_2', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      field: 'phone_2',
      unique: false
    })
  }
}
