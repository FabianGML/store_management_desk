// const { date } = require('joi')
const { Model, DataTypes, Sequelize } = require('sequelize')

const SALE_TABLE = 'sales'

const SaleSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0.1
  },
  saleDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'sale_date'
  }
}

class Sale extends Model {
  static associate (models) {
    this.belongsToMany(models.Product, {
      as: 'products',
      through: models.SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SALE_TABLE,
      modelName: 'Sale',
      timestamps: false
    }
  }
}

module.exports = { SALE_TABLE, SaleSchema, Sale }
