import boom from '@hapi/boom'
import { type NextFunction, type Request, type Response } from 'express'
import { type ObjectSchema } from 'joi'
import { type Role } from '../src/auth/types/auth'
import { firebaseAuthService } from '../src/auth/firebase_auth_service'

export const validationHandler = (schema: ObjectSchema, property: 'body' | 'params') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property]
    // abortEarly: false => return all errors
    const { error, value } = schema.validate(data, { abortEarly: false })
    if (error !== undefined) {
      next(boom.badRequest(error.message))
    }
    req[property] = value
    next()
  }
}

export const checkTokenAndRoles = (allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token === undefined) {
        next(boom.unauthorized('Token not found'))
        return
      }
      const decodedToken = await firebaseAuthService.verifyIdToken(token)
      if (!allowedRoles.includes(decodedToken.role)) {
        next(boom.forbidden('User has no permissions'))
        return
      }
      next()
    } catch (error) {

    }
  }
}
