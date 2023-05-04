"use strict";

const { LAB_TABLE } = require("../models/lab.model");
const { PRODUCT_PROVIDER_TABLE } = require("../models/product-provider.model");
const { PRODUCT_TABLE } = require("../models/product.model");
const { PROVIDER_TABLE } = require("../models/provider.model");
const { SALE_PRODUCT_TABLE } = require("../models/sale-product.model");
const { SALE_TABLE } = require("../models/sale.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.changeColumn(PRODUCT_TABLE, "lab_id", {
    //   field: "lab_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: LAB_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    // await queryInterface.changeColumn(SALE_PRODUCT_TABLE, "sale_id", {
    //   field: "sale_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: SALE_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    // await queryInterface.changeColumn(SALE_PRODUCT_TABLE, "product_id", {
    //   field: "product_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: PRODUCT_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, "product_id", {
      field: "product_id",
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, "provider_id", {
      field: "provider_id",
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PROVIDER_TABLE,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.changeColumn(PRODUCT_TABLE, "lab_id", {
    //   field: "lab_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: LAB_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    // await queryInterface.changeColumn(SALE_PRODUCT_TABLE, "sale_id", {
    //   field: "sale_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: SALE_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    // await queryInterface.changeColumn(SALE_PRODUCT_TABLE, "product_id", {
    //   field: "product_id",
    //   allowNull: false,
    //   type: Sequelize.DataTypes.INTEGER,
    //   references: {
    //     model: PRODUCT_TABLE,
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    // });
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, "product_id", {
      field: "product_id",
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: "id",
      },
    });
    await queryInterface.changeColumn(PRODUCT_PROVIDER_TABLE, "provider_id", {
      field: "provider_id",
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PROVIDER_TABLE,
        key: "id",
      },
    });
  },
};
