const nodemailer = require('nodemailer')
require('dotenv').config()

const { META_PASS } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'fibos@meta.ua',
    pass: META_PASS
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async(data) => {
  const email = { ...data, from: 'fibos@meta.ua' }
  await transporter.sendMail(email)
    .then(() => { console.log('Mail already send') })
    .catch(error => console.log(error.message))
}

module.exports = sendMail
