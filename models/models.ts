import mongoose from 'mongoose';

// import the schemas
import {
  userSchema,
  walletSchema,
  chatSchema,
  doctorSchema,
  appointmentSchema,
} from './schemas';

// Create all Models from the Schemas
const Wallets = mongoose.model('Wallets', walletSchema);
const Chats = mongoose.model('Chats', chatSchema);
const Doctors = mongoose.model('Doctors', doctorSchema);
const Appointments = mongoose.model('Appointments', appointmentSchema);
const Users = mongoose.model('Users', userSchema);

export { Users, Wallets, Chats, Doctors, Appointments };
