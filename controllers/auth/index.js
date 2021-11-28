const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verifyToken')
const { resendEmail } = require('./resendingEmail')

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verify,
  resendEmail
}
