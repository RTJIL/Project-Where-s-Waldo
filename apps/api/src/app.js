//app.js
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import { sessionsService } from './services/sessionsService.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)

setInterval(
  () => {
    sessionsService.cleanupSessions()
  },
  10 * 60 * 60 * 1000
)

app.use((err, req, res, next) => {
  console.error('💥 Global Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

export default app
