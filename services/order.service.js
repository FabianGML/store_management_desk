const boom = require("@hapi/boom");
const { OrderProduct } = require("../db/models/order-product.model");

const { models } = require("./../libs/sequelize");

class OrderService {
  constructor() {}
   /*
  ------------------------------------------------------------------------------------------------------------------------------------
  This method checks if each product passed as "data" exist in the db, if not, it creates one with default values, this is made by the 
  "productExist" method, this method returns an array of "clean" items ready to create an entrance to OrderProduct Table 
  ------------------------------------------------------------------------------------------------------------------------------------
   */
  async productExist(data, orderId) {
    const items = [];
    for (const item of data) {
      let name = item.name;
      name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd();
      const product = await models.Product.findOne({ where: { name } });

      /* If the product the user passed doesn't exist, we create it with some defualts values  */
      if (!product) {
        const newProduct = await models.Product.create({
          name,
          price: 0.1,
          stock: item.amount,
          labId: 2,
          expiration: item.expiration,
          userId: 2,
        });
        item.productId = newProduct.id;
      }

      /* If the product actualy exist in the db, we update it wheter the changes the user wanted */
      if (product) {
        const expiration =
          item.expiration > product.expiration
            ? item.expiration
            : product.expiration;
        product.update({
          stock: product.stock + item.amount, //Probable falla
          expiration,
          expiration2: product.expiration,
        });
        item.productId = product.id;
      }
      item.orderId = orderId;
      items.push(item);
    }

    return items;
  }

  async getOrders() {
    const orders = await models.Order.findAll({
      order: [["orderArrive", "DESC"]],
      include: ["provider"],
      raw: true,
    });
    return orders;
  }

  async getOneOrder(id) {
    /*Still need to find a way to get the same result but instead of making differents db queries
    use the sequelize associations correctly
     */
    const order = await models.Order.findByPk(id, {
      include: ["provider"],
      raw: true,
    });
    if (!order) {
      throw boom.badRequest("La orden no existe");
    }
    const orderProducts = await models.OrderProduct.findAll({
      where: { orderId: id },
      raw: true,
    });
    if (!orderProducts) {
      throw boom.badRequest("La orden no tiene productos asignados");
    }
    let items = [];
    for (let element of orderProducts) {
      const product = await models.Product.findByPk(element.productId, {
        raw: true,
      });
      items.push({
        productId: element.productId,
        name : product.name,
        unitPrice: element.unitPrice,
        amount: element.amount,
        expiration: product.expiration,
        totalPrice: element.totalPrice
      });
    }
    delete order['provider.id']
    delete order['provider.email']
    delete order['provider.email']
    delete order['provider.phone2']
    const completeOrder = { ...order, items };
    
    return completeOrder;
  }

  async createOrder(data) {
    /*
            Making sure the provider actually exist in the database
         */
    const provider = await models.Provider.findByPk(data.providerId);
    if (!provider) {
      throw boom.badRequest("El proveedor no existe");
    }

    /*
            Multiplying the amount of products that arrived in order to get the totalPrice of each product
         */
    data.items.forEach((item) => {
      item.totalPrice = item.amount * item.unitPrice;
    });
    // adding all the total prices to get the total of the entire order and put it in the order Table
    const total = data.items
      .map(({ totalPrice }) => totalPrice)
      .reduce((total, price) => total + price, 0);

    //Create the order first as to get the order id that we need to pass it to the order_product table
    const order = await models.Order.create({
      providerId: data.providerId,
      orderArrive: data.orderArrive,
      isPayed: data.isPayed,
      total,
    });

    await this.addItem(data.items, order.id);

    return {
      message: `Orden numero ${order.id} agregado exitosamente!`,
    };
  }

  async updateOrder(orderId, data) {
    await models.Order.update(data, { where: { id: orderId } });
    /* ---------------------------------------------------------------------------------
      if the user deletes an item from an order, this code block find the items the user wants to remove
      and remove it
    */
    const orderProducts = await models.OrderProduct.findAll({where:{orderId}})
    const dbProductsIds = orderProducts.map(orderProduct => orderProduct.productId)
    const formProductsIds = data.items.map(form => form.productId)
    const itemsIdsForDelete = dbProductsIds.filter(itemId => !formProductsIds.includes(itemId));
    
    if(itemsIdsForDelete) {
      for(let deleteItemId of itemsIdsForDelete){
        await models.OrderProduct.destroy({where:{productId: deleteItemId, orderId}})
      }
    }
    //----------------------------------------------------------------------------------

    for (let itemData of data.items) {
      await this.updateItem(orderId, itemData);
    }
    return `¡La orden ${order.id} cambio correctamente!`;
  }

  async deleteOrder(id) {
    const order = await this.getOneOrder(id);
    await order.destroy();
    return {
      message: `Orden numero ${order.id} borrada!`,
    };
  }

  // Orders-Products service
  async addItem(items, orderId) {
    const product = await this.productExist(items, orderId);
    // inserting a bulk of products at once depends on how many products do we want to add
    await models.OrderProduct.bulkCreate(product);
  }

  async updateItem(orderId, itemData) {
    const product = await models.Product.findByPk(itemData.productId);
    if (!product) {
      throw boom.badRequest("El producto no existe");
    }
    const orderProduct = await models.OrderProduct.findOne({
      where: { orderId, productId: itemData.productId },
    });
    if (!orderProduct) {
      throw boom.badRequest("El producto no existe dentro de la orden");
    }

    /*
    -----------------------------------------------------------------------------
        Checking if the name passed by the body and the name in the db matches
    -----------------------------------------------------------------------------
    */
    let name = itemData.name;
    name = name[0].toUpperCase() + name.substring(1).toLowerCase().trim();

    /* If the name passed by the user is different, we need to remove the incoming amount to the product stock  */
    if (name !== product.dataValues.name.trim()) {
      const stock = product.stock - orderProduct.amount;
      await product.update({
        stock,
      });
      const itemDataAsArray = [...itemData];
      const item = await this.productExist(itemDataAsArray, orderId); //this checks if the product exist or not
      await models.OrderProduct.update({
        item,
        where: { id: orderProduct.dataValues.id },
      });
    } else {
      const stock = product.stock - orderProduct.amount + itemData.amount;
      await product.update({
        stock,
      });
      await orderProduct.update({
        ...itemData,
        productId: product.dataValues.id,
        totalPrice: itemData.amount * itemData.unitPrice,
      });
    }

    /*------------------------------- 
      Calculate again the order total
      -------------------------------
     */
    const itemOrder = await models.OrderProduct.findAll({ where: { orderId } });

    // adding all the total prices to get the total of the entire order and put it in the order Table
    const total = itemOrder
      .map(({ totalPrice }) => totalPrice)
      .reduce((total, price) => total + price, 0);

    await models.Order.update({ total }, { where: { id: orderId } });
  }

  
}

module.exports = OrderService;
