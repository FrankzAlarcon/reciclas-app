import { Router } from 'express'
import ObservationsService from '../services/observations_service'
import { Response } from '../../../libs/response'
import { checkTokenAndRoles, validationHandler } from '../../../middlewares/validation_handler'
import { getByIdSchema, getByLogActionSchema } from '../../collect_center/models/location_model'
import { CreateObservationSchema, UpdateObservationSchema } from '../models/observations_model'

const router = Router()
const observationsService = new ObservationsService()
const response = new Response()

router.get(
  '/',
  checkTokenAndRoles(['ADMIN']),
  async (_req, res, next) => {
    try {
      const observations = await observationsService.getAll()
      response.success(res, observations)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  checkTokenAndRoles(['ADMIN']),
  validationHandler(getByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const observation = await observationsService.getOne(Number(id))
      response.success(res, observation)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/log-action-collaborator/:logActionCollaboratorId',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(getByLogActionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { logActionCollaboratorId } = req.params
      const observations = await observationsService.getAllByLogActionCollaborator(Number(logActionCollaboratorId))
      response.success(res, observations)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(CreateObservationSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const observation = await observationsService.create(body)
      response.success(res, observation, 201)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  checkTokenAndRoles(['ADMIN', 'CENTER_EMPLOYEE']),
  validationHandler(getByIdSchema, 'params'),
  validationHandler(UpdateObservationSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const observation = await observationsService.update(Number(id), body)
      response.success(res, observation)
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
      const observation = await observationsService.remove(Number(id))
      response.success(res, observation)
    } catch (error) {
      next(error)
    }
  }
)

export default router