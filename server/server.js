import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const DB_URI = process.env.MONGODB_URI


const app = express()
app.use(cors())


// since the application cant run without a DB connection..
// first wait for the connection to MongoDB, (only) then start the express server
await mongoose.connect(DB_URI)
console.log('Successfully connected to MongoDB')


app.get('/', (req, res) => {
  res.send('Hello world')
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})