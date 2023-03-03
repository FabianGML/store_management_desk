'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('./../models/product.model');
const { SALE_TABLE } = require('./../models/sale.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'line')
    await queryInterface.addColumn(PRODUCT_TABLE, 'image', {
      type: DataTypes.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn(SALE_TABLE, 'discount', {
      type: DataTypes.STRING,
      allowNull: true,
    })
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'line', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Naturista'
    })
    await queryInterface.removeColumn(PRODUCT_TABLE, 'image')
    await queryInterface.removeColumn(SALE_TABLE, 'discount')

  }
};
