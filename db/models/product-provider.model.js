const { Model, DataTypes } = require('sequelize')

const { PROVIDER_TABLE } = require('./provider.model')
const { PRODUCT_TABLE } = require('./product.model')

const PRODUCT_PROVIDER_TABLE = 'products_providers'

const ProductProviderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  productId: {
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  providerId: {
    field: 'provider_id',
    type: DataTypes.INTEGER,
    references: {
      model: PROVIDER_TABLE,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}

class ProductProvider extends Model {
  static associate (models) {
    this.belongsTo(models.Product, { as: 'product' })
    this.belongsTo(models.Provider, { as: 'provider' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_PROVIDER_TABLE,
      modelName: 'ProductProvider',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_PROVIDER_TABLE, ProductProviderSchema, ProductProvider }
