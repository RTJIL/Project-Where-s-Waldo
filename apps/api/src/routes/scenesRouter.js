import { Router } from 'express'
import { scenesController } from '../controllers/scenesController.js'

export const scenesRouter = Router()

scenesRouter.get('/', scenesController.getAllScenesData)
scenesRouter.get('/sessions', scenesController.getScenesSessions)
