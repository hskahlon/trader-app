import mongoose from 'mongoose'

mongoose.connect('mongodb://mongo:27017/cinema', { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  })

const db = mongoose.connection

export default db
