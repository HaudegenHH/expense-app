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
