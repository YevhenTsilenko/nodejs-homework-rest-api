const { Contact } = require('../../model')
const { NotFound } = require('http-errors')

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    )
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
