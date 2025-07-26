import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={styles.header}>
      <span>Where's Waldo</span>
      <Link to="/leaderboard" className={styles.link}>
        🏆Leader Board
      </Link>
    </header>
  )
}
