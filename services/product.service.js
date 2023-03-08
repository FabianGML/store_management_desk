const boom = require('@hapi/boom');
const path = require('path')
const fs = require('fs')

const { models } = require('./../libs/sequelize');

class ProductService {

    constructor() {}

    async getAllProducts() {
        const products = await models.Product.findAll({
            include: ['lab'],
            order: ['stock'],
            raw: true,
        })
        const providers = await models.ProductProvider.findAll({
            raw: true,
            include:['provider']
        })

        const combinedInfo = products.map(product => {
            const matchProviders = []
                for (let provider of providers){
                    if (product['id'] === provider['productId']){
                        matchProviders.push(provider['provider.name'])
                    }
                }
            const cleanMatchProviders = matchProviders.filter((prodProvider, index) => {
                return matchProviders.indexOf(prodProvider) === index;
            })
                return {
                    ...product,
                    providers: cleanMatchProviders
                }
        })
        console.log(`productos combinados: ${JSON.stringify(combinedInfo)}`)
        return combinedInfo
    }


    async getOneProduct(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.badRequest('El producto no existe');
        }
        return product;
    }

    async create(data) {
        let name = data.name;
        name = name[0].toUpperCase() + name.substring(1).toLowerCase();
        let image = data.image
        console.log(`imagen: ${image}`)
        const newProduct = await models.Product.create({
            ...data,
            name
        })
        return {
            message: `¡Producto ${newProduct.name} agregado correctamente`,
            data: newProduct
        }
    }

    async update(id, data) {
        let name = data.name;
        name = name[0].toUpperCase() + name.substring(1).toLowerCase();
        const product = await this.getOneProduct(id);
        await product.update({
            name,
            ...data
        })
    }

    async delete(id) {
        const product = await this.getOneProduct(id);
        await product.destroy()
    }

    
}

module.exports = ProductService