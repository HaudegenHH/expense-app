<<<<<<< HEAD
import express from 'express'
import mongoose from 'mongoose'
import connect from './database/mongodb.js'
import Transaction from './models/Transaction.js'
import transactionRoutes from './routes/transactions.js'

import cors from 'cors'

// JSON and URL-encoded parser
// top-level-middleware to parse the body of all incoming requests
import bodyParser from 'body-parser'

import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000



const app = express()



// ---------- middleware ------------ //
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
// transaction Routes
app.use('/transactions', transactionRoutes)

// ----------------------------------- //

// since the application cant run without a DB connection..
// first wait for the connection to MongoDB, (only) then start the express server
await connect()

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
=======
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
>>>>>>> 67beb04422e6cb826e956bec94565180cdda1c2a
