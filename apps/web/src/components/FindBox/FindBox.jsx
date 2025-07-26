import styles from './FindBox.module.css'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useState } from 'react'

export default function FindBox({ characters, handleHide, handleResolve }) {
  const [dropdown, setDropdown] = useState(true)

  const handleClick = () => {
    setDropdown((prev) => !prev)
  }

  return (
    <div className={styles.boxContainer}>
      <div className={styles.box} onClick={handleHide}></div>

      <div className={styles.dropdown}>
        <span>
          Who:
          <RiArrowDropDownLine
            className={`${styles.icon} ${dropdown ? styles.rotate : ''}`}
            onClick={handleClick}
          />
        </span>

        {dropdown && (
          <div className={styles.list}>
            {characters.map((c, id) => (
              <p onClick={handleResolve} key={id}>
                {c}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
