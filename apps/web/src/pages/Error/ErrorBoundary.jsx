import React from 'react'
import styles from './ErrorBoundary.module.css'

export default function ErrorBoundary({ error }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>😵 Oops, something went wrong!</h1>
      <p style={styles.message}>
        {error.statusText || error.message || 'Unknown error'}
      </p>
      <button
        style={styles.button}
        onClick={() => (window.location.href = '/')}
      >
        Go Home
      </button>
    </div>
  )
}
