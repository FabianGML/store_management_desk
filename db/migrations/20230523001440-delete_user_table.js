'use strict'

const { PRODUCT_TABLE } = require('../models/product.model')
const { SALE_TABLE } = require('../models/sale.model')
const { USER_TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'user_id')
    await queryInterface.removeColumn(SALE_TABLE, 'user_id')
    await queryInterface.dropTable(USER_TABLE)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name'
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'seler'
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      recoverToken: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        field: 'recovery_token'
      }
    })
    await queryInterface.addColumn(PRODUCT_TABLE, 'user_id', {
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        }
      }
    })
    await queryInterface.addColumn(SALE_TABLE, 'user_id', {
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        }
      }
    })
  }
}
