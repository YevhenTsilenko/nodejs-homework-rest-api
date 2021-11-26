const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const resendEmail = async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.status(400).json({
      message: 'missing required field email'
    })
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User with such email not found')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const mail = {
    to: email,
    subject: 'Заявка на подтверждение с сайта',
    text: 'Подтвердите регистрацию',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Подтвердите регистрацию</a>`
  }

  await sendMail(mail)

  res.status(200).json({
    message: 'Verification email sent'
  })
}

const mailJoiSchema = Joi.object({
  email: Joi.string().required()
})

module.exports = {
  resendEmail,
  mailJoiSchema
}
