import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from '../config';

export default async function connectDB() {
  // Mongoose Client Options
  const clientOptions: ConnectOptions = {
    dbName: 'Joobz',
    serverApi: { version: '1', strict: true, deprecationErrors: true },
  };

  try {
    const response = await mongoose.connect(MONGO_URI!, clientOptions);
    console.log('Connected to DB: ', response.connection);

    // return true when mongoose succesfully connected
    return true;
  } catch (error) {
    console.log('There was an error:\n', error);
    return false;
  }
}
