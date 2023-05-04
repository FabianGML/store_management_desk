const boom = require("@hapi/boom");
const path = require("path");
const fs = require("fs");

const { models } = require("./../libs/sequelize");

class ProductService {
  constructor() {}

  async getAllProducts() {
    const products = await models.Product.findAll({
      include: ["lab"],
      order: ["stock"],
      raw: true,
    });
    const providers = await models.ProductProvider.findAll({
      raw: true,
      include: ["provider"],
    });

    const combinedInfo = products.map((product) => {
      const matchProviders = [];
      for (let provider of providers) {
        if (product["id"] === provider["productId"]) {
          matchProviders.push(provider["provider.name"]);
        }
      }
      const cleanMatchProviders = matchProviders.filter(
        (prodProvider, index) => {
          return matchProviders.indexOf(prodProvider) === index;
        }
      );
      return {
        ...product,
        providers: cleanMatchProviders,
      };
    });
    return combinedInfo;
  }

  async getOneProduct(id) {
    const product = await models.Product.findByPk(id, {
      include: ["lab"],
      raw: true,
    });
    if (!product) {
      throw boom.badRequest("El producto no existe");
    }
    return product;
  }

  async createProduct(data) {
    let name = data.name;
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd();
    let image = data.image;
    console.log(`imagen: ${image}`);
    const newProduct = await models.Product.create({
      ...data,
      name,
    });
    return {
      message: `¡Producto ${newProduct.name} agregado correctamente`,
      data: newProduct,
    };
  }

  async updateProduct(id, data) {
    let name = data.name;
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd();
    const product = await this.getOneProduct(id);
    await models.Product.update(
      {
        name,
        ...data,
      },
      {
        where: { id },
      }
    );
    return `Producto ${product.name} actualizado correctamente`;
  }

  async deleteProduct(id) {
    const product = await models.Product.destroy({ where: { id } });
    return `Producto ${product} eliminado correctamente`;
  }
}

module.exports = ProductService;
