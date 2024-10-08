import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Users, Wallets } from '../../models/models';
import { RegisterData } from '../../types/global';
import generateRandomNumber from '../../utils/generateRandomNumbers';

import sendEmailToUser from '../../utils/sendEmailMessage';

/**
 * UserSignUp - Controller for creating a New User Account
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */

const UserSignUp = async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password, state, country } =
    req.body as RegisterData;

  // Validate request body Lengths
  // TODO: A more robust validation check should be implemented
  const bodyArray = [fullName, email, phoneNumber, password, state, country];

  if (!bodyArray.every((item) => item.length >= 2))
    return res.status(400).json({
      message: 'BAD REQUEST. Please check the entry you submitted in the form',
    });

  // Create a new wallet to be saved for the user
  const newWallet = new Wallets();
  try {
    await newWallet.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to proceed with registration. Try again later.',
    });
  }

  // Initiate User Account Creation
  let randomOTP: number;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    randomOTP = generateRandomNumber(5);
    const OTPExpiry = Date.now() + 1000 * 60 * 5;

    // Create New User
    const newUser = new Users({
      fullName,
      email: email.toLowerCase().trim(),
      phoneNumber,
      OTP: { number: randomOTP, expiry: OTPExpiry },
      location: { state, country },
      wallet: newWallet._id,
      password: hashedPassword,
    });

    await newUser.save();

    // Catch any error that may have occured
  } catch (error: any) {
    console.log(error);
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: error!.message });
    }
    return res.status(403).json({ success: false, message: error!.message });
  }

  // Send OTP to user via Email
  await sendEmailToUser('OTPEmail', email, 'Joobz: Verify OTP ✅', {
    username: fullName.split(' ')[0],
    otpCode: randomOTP,
  });

  return res
    .status(201)
    .json({ success: true, message: 'User Account created successfully.' });
};

export default UserSignUp;
