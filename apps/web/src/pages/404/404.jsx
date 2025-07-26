import { Link } from 'react-router-dom';
import styles from './404.module.css';

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className={styles.homeLink}>
        Back to Home
      </Link>
    </div>
  );
}
