const { Unauthorized } = require('http-errors')

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user
  if (!req.user) {
    throw new Unauthorized('Not authorized')
  }
  res.status(200).json({
    email: email,
    subscription: subscription
  })
}

module.exports = getCurrentUser
