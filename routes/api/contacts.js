const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { validation, controllerWrapper } = require('../../middlewares')
const { joiContactSchema, joiContactSchemaPatch } = require('../../validations')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiContactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(joiContactSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contacId/favorite', validation(joiContactSchemaPatch), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
