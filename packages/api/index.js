import express from 'express'
import cors from 'cors'

import db from './db/index.js'
import stockRoutes from './routes/stock.js'
import userRoutes from './routes/users.js'

const app = express()
const apiPort = 5000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/stock', stockRoutes)
app.use('/user', userRoutes)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
