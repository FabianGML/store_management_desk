const Joi = require('joi').extend(require('@joi/date'))

const id = Joi.number().positive().required()
const name = Joi.string()
const price = Joi.number().positive()
const stock = Joi.number().positive()
const ingredients = Joi.string()
const labId = Joi.number().positive()
const description = Joi.string()
const expiration = Joi.date().format('YYYY-MM-DD').utc()

// const products = Joi.object({
//   name: name.required(),
//   price: price.required(),
//   stock: stock.required(),
//   ingredients: ingredients.required(),
//   labId: labId.required(),
//   description,
//   expiration
// })

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
  ingredients: ingredients.required(),
  labId: labId.required(),
  description,
  expiration: expiration.required()
})

const getProductSchema = Joi.object({
  id
})

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
  ingredients: ingredients.required(),
  labId: labId.required(),
  description,
  expiration
})

module.exports = { createProductSchema, getProductSchema, updateProductSchema }
