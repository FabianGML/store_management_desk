'use strict'

const { PRODUCT_PROVIDER_TABLE } = require('../models/product-provider.model')
const { PRODUCT_TABLE } = require('../models/product.model')
const { PROVIDER_TABLE } = require('../models/provider.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, 'product_id', {
      field: 'product_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, 'provider_id', {
      field: 'provider_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PROVIDER_TABLE,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, 'product_id', {
      field: 'product_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id'
      }
    })
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, 'provider_id', {
      field: 'provider_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PROVIDER_TABLE,
        key: 'id'
      }
    })
  }
}
