const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params

  if (!favorite) {
    return res.status(400).json({
      code: 400,
      message: 'missing field favorite'
    })
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )

  if (!result) {
    throw new NotFound('Not found')
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateStatusContact
