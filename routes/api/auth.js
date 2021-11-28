const express = require('express')

const { validation, controllerWrapper, authenticate, upload } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')
const { mailJoiSchema } = require('../../controllers/auth/resendingEmail')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.post('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser))

router.patch('/avatars', authenticate, upload.single('avatarURL'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', validation(mailJoiSchema), controllerWrapper(ctrl.resendEmail))

module.exports = router
