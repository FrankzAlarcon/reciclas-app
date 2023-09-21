import { Router } from 'express'
import LogActionsCollaboratorsService from '../services/log_action_collaborators_service'
import { Response } from '../../../libs/response'
import { checkTokenAndRoles, validationHandler } from '../../../middlewares/validation_handler'
import { CreateLogActionCollaboratorSchema, UpdateLogActionCollaboratorSchema, getByIdSchema } from '../models/log_actions_collaborators_model'

const router = Router()
const logActionCollaboratorService = new LogActionsCollaboratorsService()
const response = new Response()

router.get(
  '/',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  async (_, res, next) => {
    try {
      const logActionCollaborators = await logActionCollaboratorService.getAll()
      response.success(res, logActionCollaborators)
    } catch (error) {
      next(error)
    }
  })

router.get(
  '/:id',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(getByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const logActionCollaborator = await logActionCollaboratorService.getOne(Number(req.params.id))
      response.success(res, logActionCollaborator)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(CreateLogActionCollaboratorSchema, 'body'),
  async (req, res, next) => {
    try {
      const logActionCollaborator = await logActionCollaboratorService.create(req.body)
      response.success(res, logActionCollaborator, 201)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(getByIdSchema, 'params'),
  validationHandler(UpdateLogActionCollaboratorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const logActionCollaborator = await logActionCollaboratorService.update(Number(id), req.body)
      response.success(res, logActionCollaborator)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  checkTokenAndRoles(['ADMIN']),
  validationHandler(getByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const logActionCollaborator = await logActionCollaboratorService.remove(Number(id))
      response.success(res, logActionCollaborator)
    } catch (error) {
      next(error)
    }
  }
)

export default router
