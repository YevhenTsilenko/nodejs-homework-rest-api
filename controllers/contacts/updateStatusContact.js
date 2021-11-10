const { NotFound } = require('http-errors')
const { Contact } = require('../../model')

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params

  if (!req.body) {
    return res.status(400).json({
      status: 400,
      message: 'missing field favorite'
    })
  }

  const result = Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )

  if (!result) {
    throw new NotFound('contact not found')
  }

  res.json({
    status: 'success',
    code: 200,
    result
  })
}

module.exports = updateStatusContact
