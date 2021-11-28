const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res) => {
  const { email, password, subscription } = req.body

  const avatar = gravatar.url(email, { protocol: 'https', s: '250' })

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const verificationToken = nanoid()
  const newUser = new User({ email, subscription, avatarURL: avatar, verificationToken })

  newUser.setPassword(password)

  await newUser.save()

  const mail = {
    to: email,
    subject: 'Заявка на подтверждение с сайта',
    text: 'Подтвердите регистрацию',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите регистрацию</a>`
  }

  await sendMail(mail)

  const avatarFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: avatar
    }
  })
}

module.exports = signup
