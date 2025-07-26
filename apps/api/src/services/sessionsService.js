import { prisma } from '../lib/db.js'

export const sessionsService = {
  getAllSessions: async () => await prisma.gameSession.findMany(),

  getSessionById: async (id) =>
    await prisma.gameSession.findUnique({ where: { id } }),

  addSession: async (data) => await prisma.gameSession.create(data),

  updateSession: async (id, endedAt, duration, username) => {
    const user = await prisma.user.create({
      data: {
        name: username || 'Anonym',
      },
    })

    return await prisma.gameSession.update({
      where: { id },
      data: {
        endedAt,
        duration,
        userId: user.id,
      },
    })
  },

  updateUsername: async (id, username) => {
    const session = await prisma.gameSession.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!session || !session.userId) {
      throw new Error('Session or user not found')
    }

    return await prisma.user.update({
      where: { id: session.userId },
      data: { name: username },
    })
  },

  cleanupSessions: async () => {
    try {
      const result = await prisma.gameSession.deleteMany({
        where: {
          duration: null,
        },
      })

      console.log(`🧹 Cleaned ${result.count} sessions without duration.`)
    } catch (err) {
      console.error('❌ Error during cleanup:', err)
    }
  },
}
