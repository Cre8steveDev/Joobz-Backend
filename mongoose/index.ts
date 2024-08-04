import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from '../config';

export default async function connectDB() {
  // Mongoose Client Options
  const clientOptions: ConnectOptions = {
    dbName: 'Joobz',
    serverApi: { version: '1', strict: true, deprecationErrors: true },
  };

  try {
    await mongoose.connect(MONGO_URI!, clientOptions);
    console.log('==== DB CONNECTION ESTABLISHED ====');

    // return true when mongoose succesfully connected
    return true;
  } catch (error) {
    console.log('There was an error:\n', error);
    return false;
  }
}
