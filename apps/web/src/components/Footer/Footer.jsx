import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link
        to="https://github.com/RTJIL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className={styles.icon} />
      </Link>
      <Link
        to="https://www.linkedin.com/in/artem-davydov-404442357/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className={styles.icon} />
      </Link>
    </footer>
  )
}
