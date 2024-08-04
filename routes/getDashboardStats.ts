import { NextFunction, Request, Response, Router } from 'express';
import { Users, Appointments, Wallets, Chats } from '../models/models';
import { User } from '../types/types';

const router = Router();

//////////Return Stats for the Dashboard Overview Section
router.get('/overview', async (request: Request, response: Response) => {
  const user = request.user as User | undefined;

  console.log('Overview endpoint reached!');
  console.log('======================');
  console.log(user);
  console.log('======================');

  if (user) {
    // Destructure details from user
    const { _id, appointments } = user;
    const recent_appointment_id = appointments[appointments.length - 1];

    const appointment_length = appointments.length;
    const num_chats = await Chats.countDocuments({ userId: _id });
    const recent_appointment = await Appointments.findOne({
      _id: recent_appointment_id,
    });

    return response.status(200).json({
      num_appointments: appointment_length + '',
      num_chats: num_chats + '',
      recent_appointment: {
        department: recent_appointment?.department,
        preferred_date: recent_appointment?.preferred_date,
        status: recent_appointment?.status,
        _id: recent_appointment_id,
      },
    });
  }

  return response.status(403).json({ message: 'Error Occured' });
});

////////// Return Latest and all Appointments for the user
router.get('/appointments', async (request: Request, response: Response) => {
  const user = request.user as User | undefined;
  if (!user)
    return response.status(403).json({ message: 'Unauthorized Request' });

  const appointments = await Appointments.find(
    { userId: user._id },
    { department: 1, preferred_date: 1, status: 1, _id: 1 }
  );

  response.status(200).json(appointments);
});

export default router;
