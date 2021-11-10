const Joi = require('joi')

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

const joiContactSchemaPatch = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  joiContactSchema,
  joiContactSchemaPatch
}
