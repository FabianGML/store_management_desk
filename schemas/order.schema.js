const Joi = require('joi').extend(require('@joi/date'))

const id = Joi.number().positive().when('codeBar', { not: Joi.exist(), then: Joi.required() })
const itemId = Joi.number().positive().required()
const providerId = Joi.number().positive().required()
const orderArrive = Joi.date()
const isPayed = Joi.boolean()

const orderId = Joi.number().positive()
const productName = Joi.string().required()
const unitPrice = Joi.number().positive().required()
const salePrice = Joi.number().positive().when('codeBar', { is: Joi.exist(), then: Joi.required() })
const amount = Joi.number().positive().required()
const codeBar = Joi.number().positive().allow('')
const ingredients = Joi.string().allow('')
const image = Joi.object().allow('')
const expiration = Joi.date().required()
const lab = Joi.alternatives().try(Joi.number().positive().required(), Joi.string()).when('codeBar', { is: Joi.exist(), then: Joi.required() })
const description = Joi.string().allow('')
const items = Joi.array().items(Joi.object({
  id,
  productName,
  unitPrice,
  amount,
  expiration,
  salePrice,
  codeBar,
  ingredients,
  image,
  lab,
  description
}))

const getOrderSchema = Joi.object({
  id
})

const getOrderProductSchema = Joi.object({
  id,
  itemId
})

const createOrderSchema = Joi.object({
  providerId,
  isPayed,
  orderArrive,
  items
})

const updateOrderSchema = Joi.object({
  providerId,
  isPayed,
  orderArrive
})

const updateItemSchema = Joi.object({
  items
})

const addItemSchema = Joi.object({
  orderId,
  items

})

module.exports = { getOrderSchema, getOrderProductSchema, createOrderSchema, updateOrderSchema, updateItemSchema, addItemSchema }
