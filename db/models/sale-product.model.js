const { Model, DataTypes } = require('sequelize')

const { SALE_TABLE } = require('./sale.model')
const { PRODUCT_TABLE } = require('./product.model')
const SALE_PRODUCT_TABLE = 'sales_products'

const SaleProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  saleId: {
    field: 'sale_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SALE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  },
  unitPrice: {
    field: 'unit_price',
    type: DataTypes.DOUBLE
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  TotalUnit: { // name is wrong
    field: 'total_unit',
    type: DataTypes.DOUBLE
  },
  discount: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  }
}

class SaleProduct extends Model {
  static associate (models) {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SALE_PRODUCT_TABLE,
      modelName: 'SaleProduct',
      timestamps: false
    }
  }
}

module.exports = { SALE_PRODUCT_TABLE, SaleProductSchema, SaleProduct }
