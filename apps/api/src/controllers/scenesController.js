import { scenesService } from '../services/scenesService.js'

export const scenesController = {
  getAllScenes: async (req, res, next) => {
    try {
      const scenes = await scenesService.getAllScenes()
      res.status(200).json(scenes)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error fetching scenes: ' + err.message,
      })
    }
  },

  getScenesSessions: async (req, res, next) => {
    try {
      const sessions = await scenesService.getScenesSessions()
      res.status(200).json(sessions)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error fetching scenes: ' + err.message,
      })
    }
  },

  getAllScenesData: async (req, res, next) => {
    try {
      const scenes = await scenesService.getAllScenesData()
      res.status(200).json(scenes)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error fetching scenes: ' + err.message,
      })
    }
  },
}
