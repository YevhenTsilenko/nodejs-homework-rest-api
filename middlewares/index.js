const controllerWrapper = require('./controllerWrapper')
const validation = require('./validation')
const authenticate = require('./authenticate')
const upload = require('./upload')

module.exports = {
  authenticate,
  controllerWrapper,
  validation,
  upload
}
