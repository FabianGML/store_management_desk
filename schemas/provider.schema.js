const Joi = require('joi')

const name = Joi.string().required()
const email = Joi.string().email().allow('')
const phone = Joi.string().regex(/^[0-9]+$/).min(8).allow('')
const providerId = Joi.number().positive().required()
const labProviderId = Joi.number().positive().required()

const id = Joi.number().positive().when('codeBar', { not: Joi.exist(), then: Joi.required() })
const productName = Joi.string().required()
const salePrice = Joi.number().positive().when('codeBar', { is: Joi.exist(), then: Joi.required() })
const amount = Joi.number().positive().when('codeBar', { is: Joi.exist(), then: Joi.required() })
const codeBar = Joi.number().positive().allow('')
const ingredients = Joi.string().allow('')
const image = Joi.object().allow('')
const expiration = Joi.date().when('codeBar', { is: Joi.exist(), then: Joi.required() })
const lab = Joi.alternatives().try(Joi.number().positive().required(), Joi.string()).when('codeBar', { is: Joi.exist(), then: Joi.required() })
const description = Joi.string().allow('')

const items = Joi.array().items(Joi.object({
  id,
  productName,
  amount,
  expiration,
  salePrice,
  codeBar,
  ingredients,
  image,
  lab,
  description
}))

/* product-provider Schema */
const productId = Joi.number().positive().required()
const prodProvId = Joi.number().positive()
const productsProv = Joi.array().items(Joi.object({
  productId
}))

const getProviderSchema = Joi.object({
  providerId
})

const getLabProviderSchema = Joi.object({
  providerId,
  labProviderId
})

const createProviderSchema = Joi.object({
  name,
  email,
  phone,
  items
})

const updateProviderSchema = Joi.object({
  productName,
  email,
  phone
})

/* product-providder */

const getProductProvSchema = Joi.object({
  providerId,
  prodProvId
})

const createProductProvSchema = Joi.object({
  productsProv
})

const updateProductProvSchema = Joi.object({
  productId
})

module.exports = { getProviderSchema, getLabProviderSchema, createProviderSchema, updateProviderSchema, getProductProvSchema, createProductProvSchema, updateProductProvSchema }
