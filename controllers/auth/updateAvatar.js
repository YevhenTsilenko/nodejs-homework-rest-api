const fs = require('fs/promises')
const path = require('path')
const { Unauthorized, NotFound } = require('http-errors')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw new Unauthorized('Not authorized')
  }
  const { _id } = req.user
  const { path: tmpUpload, originalname } = req.file

  try {
    await Jimp.read(tmpUpload)
      .then((image) => {
        return image
          .autocrop()
          .resize(250, 250, Jimp.RESIZE_BEZIER)
          .write(tmpUpload)
      })
  } catch (error) {
    console.log(error)
  }

  try {
    const resultUpload = path.join(avatarsDir, String(_id), `${_id}_${originalname}`)
    await fs.rename(tmpUpload, resultUpload)
    const avatar = path.join('/avatars', String(_id), originalname)
    const result = await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
    if (!result) {
      throw new NotFound('User with such id is not found')
    }
    res.status(200).json({
      avatarURL: avatar
    })
  } catch (error) {
    fs.unlink(tmpUpload)
  }
}

module.exports = updateAvatar
