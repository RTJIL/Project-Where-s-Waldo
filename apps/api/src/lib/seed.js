import { prisma } from './db.js'

async function main() {
  await prisma.$transaction([
    prisma.position.deleteMany(),
    prisma.gameSession.deleteMany(),
    prisma.scene.deleteMany(),
    prisma.character.deleteMany(),
    prisma.user.deleteMany(),
  ])

  const waldo = await prisma.character.create({ data: { name: 'Waldo' } })
  const wizard = await prisma.character.create({ data: { name: 'Wizard' } })
  const odlaw = await prisma.character.create({ data: { name: 'Odlaw' } })

  const townScene = await prisma.scene.create({
    data: {
      title: 'Town',
      imgUrl:
        'https://pzayzfkambqnvlzxqlbb.supabase.co/storage/v1/object/public/files-container//3cJkBGJ.jpeg',
      characters: {
        connect: [{ id: waldo.id }, { id: wizard.id }, { id: odlaw.id }],
      },
    },
  })

  const mountainScene = await prisma.scene.create({
    data: {
      title: 'Snowy mountain',
      imgUrl:
        'https://pzayzfkambqnvlzxqlbb.supabase.co/storage/v1/object/public/files-container//where-s-waldo-snow-mountain-jfcrg87pmobfoauq.jpg',
      characters: {
        connect: [{ id: waldo.id }, { id: wizard.id }, { id: odlaw.id }],
      },
    },
  })

  const seaScene = await prisma.scene.create({
    data: {
      title: 'Deep sea',
      imgUrl:
        'https://pzayzfkambqnvlzxqlbb.supabase.co/storage/v1/object/public/files-container//xZbguCH.jpeg',
      characters: {
        connect: [{ id: waldo.id }, { id: wizard.id }, { id: odlaw.id }],
      },
    },
  })

  async function addPositions(sceneId, coords) {
    await prisma.position.createMany({
      data: coords.map(({ x, y, character }) => ({
        x,
        y,
        missMatch: 3,
        characterId: character.id,
        sceneId,
      })),
    })
  }

  await addPositions(townScene.id, [
    { x: 43.01724137931034, y: 74.39263750163563, character: waldo },
    { x: 65.77586206896552, y: 77.88197321934837, character: wizard },
    { x: 58.9655172413793, y: 95.04950495049505, character: odlaw },
  ])

  await addPositions(mountainScene.id, [
    { x: 48.96551724137931, y: 41.61761268249145, character: waldo },
    { x: 6.982758620689655, y: 74.93890388252544, character: wizard },
    { x: 31.896551724137932, y: 64.05848226618781, character: odlaw },
  ])

  await addPositions(seaScene.id, [
    { x: 66.29310344827586, y: 16.323089245815943, character: waldo },
    { x: 78.5344827586207, y: 12.950550145440747, character: wizard },
    { x: 30.17241379310345, y: 19.290923654146116, character: odlaw },
  ])

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
