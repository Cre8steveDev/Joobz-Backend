import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Freelancers, Wallets } from '../../models/models';
import { RegisterData } from '../../types/global';
import generateRandomNumber from '../../utils/generateRandomNumbers';

/**
 * FreelanceSignup - Controller for creating a New Freelancer Account
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */

const FreelanceSignUp = async (req: Request, res: Response) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    category,
    state,
    country,
    displayName,
  } = req.body as RegisterData;

  // Validate request body Lengths
  // TODO: A more robust validation check should be implemented
  const bodyArray = [
    fullName,
    displayName,
    email,
    phoneNumber,
    password,
    category,
    state,
    country,
  ];

  if (!bodyArray.every((item) => item.length >= 3))
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

  // Initiate Freelancer Account Creation
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const randomOTP = generateRandomNumber(5);
    const OTPExpiry = Date.now() + 1000 * 60 * 5;

    // Create New Freelancer
    const newUser = new Freelancers({
      fullName,
      displayName: displayName.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber,
      category,
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

  return res.status(201).json({
    success: true,
    message: 'Freelancer Account created successfully.',
  });
};

export default FreelanceSignUp;
