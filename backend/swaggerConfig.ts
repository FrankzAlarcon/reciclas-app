export const swaggerSpecs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reciclas App - API',
      version: '1.0.0',
      description: 'Reciclas App API Documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1'
      }
    ]
  },
  apis: [
    './src/**/controllers/*_controller.ts',
    './src/**/models/*_model.ts',
    './swaggerConfig.ts'
  ]
}

/**
 *  @swagger
 *  tags:
 *    - name: Admin
 *      description: The admin managing API
 *    - name: Auth
 *      description: The authentication managing API
 *    - name: Users
 *      description: The users managing API. All endpoints are available just for ADMIN users
 *    - name: Center Employees
 *      description: The center employees managing API. All endpoints are available just for ADMIN users
 *    - name: Collect Centers
 *      description: The collect centers managing API
 *    - name: Locations
 *      description: The locations managing API
 *    - name: Log Actions Collaborators
 *      description: The log actions collaborators managing API
 *    - name: Observations
 *      description: The observations managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    NotFound:
 *      type: object
 *      properties:
 *        error:
 *          oneOf:
 *            - type: string
 *            - type: object
 *        body:
 *          type: object
 *          nullable: true
 *      example:
 *        error: "User not found"
 *        body: null
 *    BadRequest:
 *      type: object
 *      properties:
 *        error:
 *          oneOf:
 *            - type: string
 *            - type: object
 *        body:
 *          type: object
 *          nullable: true
 *      example:
 *        error: "Bad request"
 *        body: null
 *
 */
