'use strict';

const { PRODUCT_TABLE } = require("../models/product.model");
const { PROVIDER_TABLE } = require("../models/provider.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'bar_code', {
      type: Sequelize.DataTypes.STRING(14),
      allowNull: true,
      name:'barCode',
      unique: {
        where: {
          [Sequelize.Op.not]: null
        }
      },
    })
    await queryInterface.changeColumn(PROVIDER_TABLE, 'phone_2', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      unique: {
        where:{
          [Sequelize.Op.not]: null
        }
      },
      field: 'phone_2'
  })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'barCode')
    await queryInterface.changeColumn(PROVIDER_TABLE, 'phone_2', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      unique: true,
      field: 'phone_2'
  })
  }
};
