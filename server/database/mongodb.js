import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.MONGODB_URI;

function connect() {
  mongoose.connect(DB_URI);

  console.log('Successfully connected to MongoDB');
}

export default connect;
