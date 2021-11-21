const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { validation, controllerWrapper, authenticate } = require('../../middlewares')
const { joiContactSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validation(joiContactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById))

router.put('/:contactId', authenticate, validation(joiContactSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContact))

module.exports = router
