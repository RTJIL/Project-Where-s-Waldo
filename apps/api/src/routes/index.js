import { Router } from 'express'
import { scenesRouter } from './scenesRouter.js'
import { sessionsRouter } from './sessionsRouter.js'

export const routes = Router()

routes.use('/scenes', scenesRouter)
routes.use('/sessions', sessionsRouter)
