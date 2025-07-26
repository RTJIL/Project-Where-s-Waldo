import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}api/scenes`, {
          mode: 'cors',
        })
        const json = await res.json()
        console.log(json)
        setData(json)
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])

  if (loading) return <div className="loading"></div>

  return (
    <div className={styles.scenesContainer}>
      {data.map((scene) => (
        <Link
          key={scene.id}
          className={styles.article}
          to={`scene/${scene.id}`}
          state={{ scene }}
        >
          <h1>{scene.title}</h1>
          <img src={scene.imgUrl} alt="someimg" className={styles.img} />
        </Link>
      ))}
    </div>
  )
}
