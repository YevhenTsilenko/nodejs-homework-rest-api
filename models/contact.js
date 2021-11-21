const { Schema, model } = require('mongoose')

const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    minlength: 2,
    require: [true, 'Set name for contact']
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},
{ versionKey: false, timestamps: true }
)

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactSchema
}
