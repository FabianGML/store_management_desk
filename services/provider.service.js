const boom = require("@hapi/boom");
const { Op } = require("sequelize");

const { models } = require("./../libs/sequelize");
const ProductService = require("./product.service");

const productService = new ProductService();

class ProviderService {
  constructor() {}

  /* 
    check if each lab name exist in the db, if not, create an entrance in the db and adds the id to de data
    if the name exist in the db, just add the id, returns all labs with their labId and providerId
  */
  async labExist(data, providerId) {
    const labs = [];
    for (const lab of data) {
      let name = lab.labName;
      name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd();

      const dbLab = await models.Lab.findOne({ where: { name } });

      if (!dbLab) {
        const newLab = await models.Lab.create({
          name,
        });
        lab.labId = newLab.dataValues.id;
      } else {
        lab.labId = dbLab.dataValues.id;
      }
      lab.providerId = providerId;
      labs.push(lab);
    }
    return labs;
  }
  async getProviders() {
    const rta = await models.Provider.findAll({
      raw: true,
    });
    return rta;
  }

  async getOneProvider(id) {
    // Find the provider by its id, and it's not in the db, we throw an error
    const provider = await models.Provider.findByPk(id, { raw: true });
    if (!provider) {
      throw boom.badRequest("El proveedor no existe");
    }
    //search by providerId in the ProductsProvider and LabProvider tables
    const labsIds = await models.LabProvider.findAll({
      where: { providerId: provider.id },
      raw: true,
    });
    const productsIds = await models.ProductProvider.findAll({
      where: { providerId: provider.id },
      raw: true,
    });

    let labs = [];
    let products = [];
    /*-----------------------------------------------------------------------------------------------
    For each result from the ProductsProvider and LabProvider tables, we need to find the information
    from each product and each lab to print it on the screen 

    ------------------------------------------------------------------------------------------------*/
    for (let lab of labsIds) {
      const labName = await models.Lab.findByPk(lab.labId);
      labs.push({ labId: lab.labId, labName: labName.name });
    }

    for (let product of productsIds) {
      const productInfo = await models.Product.findByPk(product.productId, {
        include: ["lab"],
      });
      products.push({
        name: productInfo.name,
        stock: productInfo.stock,
        expiration: productInfo.expiration,
        lab: productInfo.lab.name,
      });
    }

    const completeProvider = { ...provider, labs, products };
    return completeProvider;
  }

  async createProvider(data) {
    let name = data.name;
    name = name[0].toUpperCase() + name.substring(1).toLowerCase();
    const newProvider = await models.Provider.create({
      name,
      email: data.email,
      phone: data.phone,
      phone2: data.phone2,
    });
    await this.addLabs(data.labs, newProvider.dataValues.id);

    await this.autoAddProdProv(newProvider.id);

    return `Proveedor ${newProvider.name} agregado correctamente`;
  }

  async updateProvider(providerId, data) {
    let name = data.name;
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd();
    await models.Provider.update(
      {
        ...data,
        name,
      },
      { where: { id: providerId } }
    );
    await this.updateLabs(data.labs, providerId);

    return "¡El proveedor cambio correctamente!";
  }

  async updateLabs(labsData, providerId) {
    /* ---------------------------------------------------------------------------------
    if the user adds, update or delete a lab from a provider, this code block add or update the
    lab wheter or not, the name has changed or not  
  */
    const updatedLabs = [];
    for (let lab of labsData) {
      if (lab.labId) {
        const { labId, labName } = lab;
        let formName = labName;
        formName =
          formName[0].toUpperCase() +
          formName.substring(1).toLowerCase().trimEnd();

        const dbLab = await models.Lab.findByPk(labId);
        if (dbLab.name !== formName) {
          const rawLab = await this.addLabs([lab]);
          await models.LabProvider.destroy({ where: { labId, providerId } });
          updatedLabs.push(rawLab[0]);
        } else {
          updatedLabs.push(lab);
        }
      } else {
        const rawNewLab = await this.addLabs([lab], providerId);
        updatedLabs.push(rawNewLab[0]);
      }
    }
    const idsDeleted = await this.deleteLabs(updatedLabs, providerId);
    await this.updateProductsProvider(idsDeleted, providerId);
  }
  //------------------------------------------------------------------------------------

  async deleteProvider(id) {
    const provider = await this.findOne(id);
    await provider.destroy();
    return {
      message: `¡Proveedor ${provider.name} borrado!`,
    };
  }
  /* LabProvider Service */
  async addLabs(data, providerId) {
    const labs = await this.labExist(data, providerId);
    await models.LabProvider.bulkCreate(labs);

    return labs;
  }

  async deleteLabs(data, providerId) {
    /* ---------------------------------------------------------------------------------
      if the user deletes an item from an order, this code block find the items the user wants to remove
      and remove it
    */
    const labProvider = await models.LabProvider.findAll({
      where: { providerId },
    });

    const dbLabsIds = labProvider.map((labProv) => labProv.labId);
    const formLabsIds = data.map((form) => form.labId);
    const labsIdsForDelete = dbLabsIds.filter(
      (labId) => !formLabsIds.includes(labId)
    );
    if (labsIdsForDelete) {
      for (let deleteLabId of labsIdsForDelete) {
        await models.LabProvider.destroy({
          where: { labId: deleteLabId, providerId },
        });
      }
    }

    //-----------------------------------------------------------------------------------
    return labsIdsForDelete;
  }

  
  async updateProductsProvider(idsDeleted, providerId) {
    const labs = await models.LabProvider.findAll({
      where: { providerId },
    });
  
    const labsIds = labs.map((lab) => lab.labId);
  
    let products = [];
  
    if (idsDeleted && idsDeleted.length > 0) {
      products = await models.Product.findAll({
        where: {
          labId: {
            [Op.in]: idsDeleted
          }
        }
      });
    }
  
    const providerProducts = await models.ProductProvider.findAll({
      where: {
        providerId,
        productId: {
          [Op.notIn]: products.map(product => product.id)
        }
      },
      attributes: ['productId']
    });
  
    const existingProductIds = providerProducts.map(product => product.productId);
  
    const newProducts = await models.Product.findAll({
      where: {
        labId: {
          [Op.in]: labsIds
        },
        id: {
          [Op.notIn]: existingProductIds
        }
      }
    });
  
    const productProviders = newProducts.map(product => ({
      productId: product.id,
      providerId
    }));
  
    if (productProviders.length > 0) {
      await models.ProductProvider.bulkCreate(productProviders);
    }
  
    if (idsDeleted && idsDeleted.length > 0) {
      await models.ProductProvider.destroy({
        where: {
          providerId,
          productId: {
            [Op.in]: products.map(product => product.id)
          }
        }
      });
    }
  }
  
  


  async addProdProv(providerId, data) {
    const provider = await this.getOneProvider(providerId);
    const products = [];

    for (const productProv of data.productsProv) {
      /* Making sure the product actually exist in the DB */
      const product = await productService.getOneProduct(productProv.productId);
      /* If the product does exist then we push it into the array, if it's not, we discard it */
      if (product) {
        products.push(productProv);
      }
      productProv.providerId = provider.dataValues.id;
    }
    await models.ProductProvider.bulkCreate(products);
    return {
      message: `Productos agregados correctamente a ${provider.name}`,
    };
  }
}

module.exports = ProviderService;
