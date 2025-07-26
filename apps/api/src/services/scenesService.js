import { prisma } from '../lib/db.js'

export const scenesService = {
  getAllScenes: async () => await prisma.scene.findMany(),

  getScenesSessions: async () => {
    const scenes = await prisma.scene.findMany({
      select: {
        id: true,
        title: true,
        imgUrl: true,
        gameSessions: {
          select: {
            id: true,
            duration: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    // Filter and sort gameSessions manually in JS
    const filteredScenes = scenes.map((scene) => ({
      ...scene,
      gameSessions: scene.gameSessions
        .filter((session) => session.duration !== null)
        .sort((a, b) => b.duration - a.duration), // 🔽 Descending order
    }))

    return filteredScenes
  },

  getAllScenesData: async () => {
    const scenes = await prisma.scene.findMany({
      include: {
        characters: {
          include: {
            positions: true,
          },
        },
      },
    })

    return scenes.map((scene) => ({
      ...scene,
      characters: scene.characters.map((char) => ({
        ...char,
        positions: char.positions.filter((post) => post.sceneId === scene.id),
      })),
    }))
  },
}
