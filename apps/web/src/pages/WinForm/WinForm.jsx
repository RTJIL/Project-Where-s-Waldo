import styles from './WinForm.module.css'
import { useState } from 'react'
import { formatTime } from '../../utils/formatTime'

export default function WinForm({ time, handleSubmit }) {
  const [username, setUsername] = useState('')

  return (
    <div className={styles.container}>
      <div className={styles.congrats}>🎉 You WIN in {formatTime(time)}!</div>
      <form action={() => handleSubmit(username)}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Anonym"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">GO</button>
      </form>
    </div>
  )
}
