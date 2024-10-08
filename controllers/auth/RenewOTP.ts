import { Request, Response, NextFunction } from 'express';
import { Users, Freelancers } from '../../models/models';
import generateRandomNumber from '../../utils/generateRandomNumbers';

import sendEmailToUser from '../../utils/sendEmailMessage';

/**
 * RenewOTP - Controller for generating a new otp
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */
const RenewOTP = async (req: Request, res: Response) => {
  // Retrieve user type from request body
  // Would refactor code later in Front end.
  const { email } = req.body;

  // Generate OTP Values
  const randomOTP = generateRandomNumber(5);
  const OTPExpiry = Date.now() + 1000 * 60 * 5;

  try {
    const foundUser = await Users.findOne({ email: email });

    // Update the OTP Field For the User
    if (foundUser) {
      await Users.findOneAndUpdate(
        { email: email },
        { $set: { OTP: { number: randomOTP, expiry: OTPExpiry } } }
      );
    } else {
      const foundFreelancer = await Freelancers.findOne({ email: email });

      if (!foundFreelancer) throw new Error('Invalid Request. User not found.');

      // Update the OTP Field For the User
      await Freelancers.findOneAndUpdate(
        { email: email },
        { $set: { OTP: { number: randomOTP, expiry: OTPExpiry } } }
      );
    }
    // Send OTP to user via Email
    await sendEmailToUser('OTPEmail', email, 'Joobz: Verify OTP ✅', {
      username: 'User',
      otpCode: randomOTP,
    });

    // Return Successful Notification
    return res
      .status(200)
      .json({ success: true, message: 'OTP Sent Successfully.' });

    // Return Error
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Sorry, an Error Occured' });
  }
};

export default RenewOTP;
