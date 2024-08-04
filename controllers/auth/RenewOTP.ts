import { Request, Response, NextFunction } from 'express';
import { Users, Freelancers } from '../../models/models';
import generateRandomNumber from '../../utils/generateRandomNumbers';

/**
 * RenewOTP - Controller for generating a new otp
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */
const RenewOTP = async (req: Request, res: Response) => {
  // Retrieve user type from request body
  const { userType, email } = req.body;

  // Generate OTP Values
  const randomOTP = generateRandomNumber(5);
  const OTPExpiry = new Date().getTime() + 1000 * 60 * 5;

  if (userType === 'User') {
    try {
      const foundUser = await Users.findOne({ email: email });

      if (!foundUser) throw new Error('Invalid Request. User not found.');

      // Update the OTP Field For the User
      await Users.findOneAndUpdate(
        { email: email },
        { $set: { OTP: { number: randomOTP, expiry: OTPExpiry } } }
      );

      console.log('Pretend Email of OTP:', randomOTP);
      console.log('Email: ', email);

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
  } else {
    try {
      const foundFreelancer = await Freelancers.findOne({ email: email });

      if (!foundFreelancer) throw new Error('Invalid Request. User not found.');

      // Update the OTP Field For the User
      await Freelancers.findOneAndUpdate(
        { email: email },
        { $set: { OTP: { number: randomOTP, expiry: OTPExpiry } } }
      );

      console.log('Pretend Email of OTP:', randomOTP);
      console.log('Email: ', email);

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
  }
};

export default RenewOTP;
