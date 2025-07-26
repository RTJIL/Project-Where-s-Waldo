import { Router } from 'express'
import { sessionsController } from '../controllers/sessionsController.js'

export const sessionsRouter = Router()

sessionsRouter.get('/', sessionsController.getAllSessions)
sessionsRouter.post('/', sessionsController.addSession)
sessionsRouter.patch('/', sessionsController.endSession)
sessionsRouter.patch('/username', sessionsController.updateUsername)
