import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())


// since the application cant run without a DB connection..
// first wait for the connection to MongoDB, (only) then start the express server
await mongoose.connect(
  'mongodb+srv://Haudegen:Svenja123@mern-second.zhlanuw.mongodb.net/?retryWrites=true&w=majority'
)
console.log('Successfully connected to MongoDB')


app.get('/', (req, res) => {
  res.send('Hello world')
})


app.get('/transaction', (req, res) => {
  let formData = req.body
  console.log(formData)
  res.json(formData) 
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})