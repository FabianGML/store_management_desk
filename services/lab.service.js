const boom = require('@hapi/boom');
const sequelize = require('sequelize');

const { models } = require('./../libs/sequelize');

class LabService {
    
    constructor() {}

    /*
    Se tendra que incluir los proveedores que maneja este laboratorio, y quizas cuantos productos de 
    ese laboratorio hay 
     */
    async getAllLabs() {
        const labs = await models.Lab.findAll({
            order: sequelize.col('name'),
            raw:true
        })
        return labs
    }

    async getOneLab(id) {
        const lab = await models.Lab.findByPk(id, {
            include: ['products']
        });
        if (!lab) {
            throw boom.badRequest('El laboratorio no existe');
        }
        return lab; // Se le agregara los proveedores y productos
    }

    async createLab(data) {
        let name = data.name;
        name = name[0].toUpperCase() + name.substring(1).toLowerCase();
        const newLab = await models.Lab.create({
            name
        });
        return {
            message: `¡Laboratorio ${newLab.name} agregado exitosamente!`
        }
    }

    async updateLab(id, data) {
        const lab = await this.findOne(id);
        let name = data.name;
        name = name[0].toUpperCase() + name.substring(1).toLowerCase();
        console.log(name);
        await lab.update({name});
        return {
            message: '¡El laboratorio cambio correctamente!'
        }
    }

    async deleteLab(id) {
        const lab = await this.findOne(id);
        await lab.destroy();
        return {
            message: `¡Laboratorio ${lab.name} borrado!`
        }
    }
}

module.exports = LabService