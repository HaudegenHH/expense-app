import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import connect from './database/mongodb.js';
import transactionRoutes from './routes/transactions.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

import passportConfig from './config/passport.js';

import cors from 'cors';

// JSON and URL-encoded parser
// top-level-middleware to parse the body of all incoming requests
import bodyParser from 'body-parser';
import passport from 'passport';

const PORT = process.env.PORT || 5000;

const app = express();

// ---------- middleware ------------ //
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// passport middleware to use with jwt
app.use(passport.initialize());
// passing the initialized passport to the config
passportConfig(passport);

// transaction Routes
app.use('/transactions', transactionRoutes);
// auth Routes
app.use('/auth', authRoutes);
//user Routes
app.use('/user', userRoutes);
// -------------------------------------------- //

// since the application cant run without a DB connection..
// first wait for the connection to MongoDB, (only) then start the express server
await connect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
