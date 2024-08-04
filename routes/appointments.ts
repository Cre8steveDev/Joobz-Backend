import { NextFunction, Request, Response, Router } from 'express';
import { Users, Appointments, Wallets, Chats } from '../models/models';

const router = Router();

const loginErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(403).json({ message: 'Invalid Login Details' });
  }

  next();
};

router.post('/create', async (request: Request, response: Response) => {
  if (!request.user)
    return response.status(403).json({ message: 'Unauthorized Request' });

  const {
    userId,
    occupation,
    department,
    preferred_date,
    medical_history,
    transaction_ref,
    transaction_status,
    transaction_message,
  } = request.body;

  // Create the Medical history to database
  let newChat;
  let newAppointment;
  try {
    newChat = new Chats({
      userId,
      title: `Appointment: ${department}`,
      messages: medical_history,
    });
    newChat.save();
    // console.log(newChat);
  } catch (error) {
    return response.status(500).json({
      message:
        'Problem with Appointment Creation (Storing Chats). Please Contact Support',
    });
  }

  // Create and Save the appointment to Database
  try {
    newAppointment = new Appointments({
      userId,
      occupation,
      department,
      preferred_date,
      status: 'Pending',
      user_medical_history: [newChat._id],
    });

    newAppointment.save();
    //
    const user = await Users.findById(userId);

    if (!user) {
      console.log('User is not found!');
      return response.status(404).json({ message: 'User not found' });
    }

    // Update the wallet with the new transaction
    const newTransaction = {
      userId,
      transaction_ref,
      transaction_status,
      transaction_message,
      payment_for: `Appointment:${department}-${preferred_date}`,
    };

    const wallet = await Wallets.updateOne(
      { _id: user.walletId },
      { $push: { transaction_history: newTransaction } }
    );

    await Users.updateOne(
      { _id: user._id },
      { $push: { appointments: newAppointment } }
    );

    if (!wallet) {
      // Do some kind of logging, so that it can be monitored by the Customer Care
      throw new Error('There was an Error Updating the transaction.');
    }
    //
  } catch (error) {
    return response.status(500).json({
      message:
        'Problem with Appointment Creation (Storing Appointment). Please Contact Support',
    });
  }

  return response.status(200).json({ message: 'Appointment Created' });
});

// Get a Specific Appointment

router.get('/:id', async (request: Request, response: Response) => {
  console.log(request.params);
  return response
    .status(200)
    .json({ message: 'Endpoint hit', param: request.params });
});

// Export Router
export default router;
