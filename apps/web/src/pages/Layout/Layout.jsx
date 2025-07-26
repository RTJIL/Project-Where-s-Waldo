import styles from './Layout.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
