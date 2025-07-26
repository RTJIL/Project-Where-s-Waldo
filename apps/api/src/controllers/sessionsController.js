import { sessionsService } from '../services/sessionsService.js'

export const sessionsController = {
  getAllSessions: async (req, res, next) => {
    try {
      const sessions = await sessionsService.getAllSessions()
      res.status(200).json(sessions)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error fetching sessions: ' + err.message,
      })
    }
  },

  addSession: async (req, res, next) => {
    const { sceneId } = req.body

    try {
      const sessions = await sessionsService.addSession({
        data: { sceneId },
      })
      res.status(200).json(sessions)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error adding sessions: ' + err.message,
      })
    }
  },

  endSession: async (req, res, next) => {
    const { sessionId, username } = req.body
    try {
      const session = await sessionsService.getSessionById(sessionId)

      if (!session) {
        return res.status(404).json({ message: 'Session not found' })
      }

      if (session.endedAt) {
        return res.status(400).json({ message: 'Session already ended' })
      }

      const endedAt = new Date()
      const duration = Math.floor((endedAt - session.startedAt) / 1000) // in seconds

      const updatedSession = await sessionsService.updateSession(
        sessionId,
        endedAt,
        duration,
        username
      )

      res.status(200).json(updatedSession)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error ending session: ' + err.message,
      })
    }
  },

  updateUsername: async (req, res, next) => {
    const { sessionId, username } = req.body

    try {
      const updated = await sessionsService.updateUsername(sessionId, username)
      res.status(200).json(updated)
    } catch (err) {
      next({
        status: 500,
        message: '❌ Error updatin username: ' + err.message,
      })
    }
  },
}
