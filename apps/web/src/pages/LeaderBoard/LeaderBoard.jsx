import styles from './LeaderBoard.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatTime } from '../../utils/formatTime'

export default function LeaderBoard() {
  const [sceneSessions, setSceneSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSceneData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/scenes/sessions', {
          mode: 'cors',
          method: 'GET',
        })

        const sceneData = await res.json()

        console.log(sceneData)

        setSceneSessions(sceneData)
      } catch (err) {
        console.error('❌ Error loading leaderboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSceneData()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.leaderboards}>
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : sceneSessions.length > 0 ? (
          sceneSessions.map((scene) => (
            <div key={scene.id} className={styles.sceneBlock}>
              <h2>{scene.title}</h2>
              <ul>
                {scene.gameSessions && scene.gameSessions.length > 0 ? (
                  scene.gameSessions
                    .sort((a, b) => a.duration - b.duration)
                    .slice(0, 5)
                    .map((session, index) => (
                      <li
                        key={session.id}
                        style={{
                          fontWeight: index < 3 ? 'bold' : 'normal',
                          color:
                            index === 0
                              ? '#38b000'
                              : index === 1
                                ? '#1e90ff'
                                : index === 2
                                  ? '#ff8c00'
                                  : '#444',
                        }}
                      >
                        {index + 1}. {session.user?.name || 'Anonym'} — Time:{' '}
                        {formatTime(session.duration) || 'N/A'}
                      </li>
                    ))
                ) : (
                  <li>No sessions yet.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>No scenes found.</p>
        )}
      </div>

      <Link to="/" className={styles.button}>
        Back
      </Link>
    </div>
  )
}
