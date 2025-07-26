//worst code that u ever see
import styles from './Scene.module.css'
import { IoTimerOutline } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { formatTime } from '../../utils/formatTime.js'
import { PiSealCheckFill } from 'react-icons/pi'
import FindBox from '../../components/FindBox/FindBox'
import WinForm from '../WinForm/WinForm.jsx'

export default function Scene() {
  const location = useLocation()
  const [scene, setScene] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [sessionEnded, setSessionEnded] = useState(false)

  const [coords, setCoords] = useState(null)
  const popupRef = useRef(null)

  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const intervalRef = useRef(null)
  const [gameOver, setGameOver] = useState(false)

  const [foundCharacters, setFoundCharacters] = useState([])

  const [feedback, setFeedback] = useState(null)
  const navigate = useNavigate()

  console.log('scene data: ', scene, 'location data: ', location)

  const handleImgClick = (e) => {
    const rect = e.target.getBoundingClientRect()

    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const xPercent = (clickX / rect.width) * 100
    const yPercent = (clickY / rect.height) * 100

    setCoords({ x: xPercent, y: yPercent })
    console.log(`coords x: ${xPercent}, y: ${yPercent} `)
  }

  const handleSubmit = (username) => {
    const checkUsername = username ? username : 'Anonym'

    console.log('🎯 Submitting score:', {
      username: checkUsername,
      secondsElapsed,
    })
    if (sessionId) {
      fetch(`http://localhost:3000/api/sessions/username`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, username }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('🟢 Username added:', data)
        })
        .catch((err) => {
          console.error('❌ Failed to end session:', err)
        })
    }

    navigate('/leaderboard', {
      replace: true,
    })
  }

  useEffect(() => {
    if (!location.state?.scene || !location.state.scene.id) {
      navigate('/', { replace: true })
    } else {
      setScene(location.state.scene)
    }
  }, [location.state, navigate])

  useEffect(() => {
    if (!scene) return

    const createSession = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sceneId: scene.id,
            // userId: location.state?.userId || null,
          }),
        })

        const data = await res.json()
        setSessionId(data.id)
        console.log('🟢 Session created:', data.id)
      } catch (err) {
        console.error('❌ Failed to create session:', err)
      }
    }

    createSession()
  }, [scene])

  useEffect(() => {
    if (!scene) return

    if (gameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [scene, gameOver])

  const handleHide = () => {
    setCoords(null)
  }

  const handleResolve = (e) => {
    console.log(e)

    console.log('Name: ', e.target.innerHTML)
    console.log(coords.x, coords.y)

    const name = e.target.innerHTML

    const matchedChar = scene.characters.find((char) => {
      const pos = char.positions?.find((p) => p.sceneId === scene.id)
      if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number')
        return false

      return (
        char.name.toLowerCase() === name.toLowerCase() &&
        Math.abs(pos.x - coords.x) < 3 &&
        Math.abs(pos.y - coords.y) < 3
      )
    })

    if (!matchedChar) {
      setFeedback({ message: '❌ Nope, try again!', type: 'error' })
      return
    }

    if (foundCharacters.some((c) => c.name === name)) {
      setFeedback({ message: `❌ You already found ${name}`, type: 'error' })
      return
    }

    if (matchedChar) {
      const updated = [...foundCharacters, { name, x: coords.x, y: coords.y }]
      setFoundCharacters(updated)

      setFeedback({ message: `✅ Found ${name}!`, type: 'success' })
      setCoords(null)

      if (!gameOver && updated.length === scene.characters.length) {
        console.log('🎉 All characters found! Ending session.')

        setSessionEnded(true)
        setGameOver(true)

        fetch(`http://localhost:3000/api/sessions/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('🟢 Session ended:', data)
          })
          .catch((err) => {
            console.error('❌ Failed to end session:', err)
          })

        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
  }

  useEffect(() => {
    console.log('✅ Updated foundCharacters:', foundCharacters)
  }, [foundCharacters])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !e.target.classList.contains(styles.img)
      ) {
        setCoords(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!feedback?.message) return
    const timeout = setTimeout(() => setFeedback(null), 3000)
    return () => clearTimeout(timeout)
  }, [feedback])

  if (!scene) return null

  return (
    <article className={styles.article}>
      {feedback?.message && (
        <p
          className={`${styles.feedback} ${
            feedback.type === 'success' ? styles.success : styles.error
          }`}
        >
          {feedback.message}
        </p>
      )}
      <div className={styles.timer}>
        <IoTimerOutline className={styles.icon} />
        <p>{formatTime(secondsElapsed)}</p>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={scene.imgUrl}
          alt="scene"
          className={styles.img}
          onClick={handleImgClick}
        />

        {coords && (
          <div
            ref={popupRef}
            className={styles.popup}
            style={{
              top: `${coords.y}%`,
              left: `${coords.x}%`,
              transform: 'translate(-50%, -5%)',
            }}
          >
            <FindBox
              characters={scene.characters
                .map((char) => char.name)
                .filter(
                  (name) => !foundCharacters.some((c) => c.name === name)
                )}
              handleHide={handleHide}
              handleResolve={handleResolve}
            />
          </div>
        )}

        {foundCharacters.map((char, i) => (
          <PiSealCheckFill
            key={i}
            className={styles.successIcon}
            style={{
              top: `${char.y}%`,
              left: `${char.x}%`,
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              color: '#38b000',
              fontSize: '2rem',
              pointerEvents: 'none',
            }}
          />
        ))}

        {scene?.characters &&
          foundCharacters.length === scene.characters.length && (
            <WinForm time={secondsElapsed} handleSubmit={handleSubmit} />
          )}
      </div>

      <Link to="/" className={styles.button}>
        Back
      </Link>
    </article>
  )
}
