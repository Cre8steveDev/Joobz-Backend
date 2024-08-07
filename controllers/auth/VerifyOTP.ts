import { Request, Response, NextFunction } from 'express';
import { Users, Freelancers } from '../../models/models';

/**
 * VerifyOTP - Controller for Verifying OTP on Registration
 * @param req - Request Object from the Client
 * @param res - Response Object to reply to Client
 * @returns void
 */

const VerifyOTP = async (req: Request, res: Response) => {
  // Retrieve user type from request body
  const { userType, OTP, email } = req.body;
  const currentTime = new Date().getTime();

  if (userType === 'User') {
    try {
      const foundUser = await Users.findOne({ email: email });

      if (!foundUser) throw new Error('Invalid Request. User not found.');

      // Update the OTP Field For the User
      const { number, expiry } = foundUser.OTP!;

      //   Check if OTP has expired
      if (expiry! < currentTime) {
        return res.status(401).json({
          success: false,
          message: 'OTP has expired. Request a new one.',
        });
      }

      //   Check if OTP does not match
      if (+OTP !== number) {
        return res.status(403).json({
          success: false,
          message: 'Invalid OTP. Please confirm the code sent.',
        });
      }

      //   Update User's Document for Email Verified
      await Users.findOneAndUpdate(
        { email: email },
        { $set: { emailVerified: true } }
      );

      // Return Successful Notification
      return res.status(200).json({
        success: true,
        message: 'Account Verified. Welcome to Joobz.',
      });

      // Return Error
    } catch (error) {
      console.log('Error User: ', error);
      return res
        .status(404)
        .json({ success: false, message: 'Sorry, an Error Occured' });
    }
  } else {
    try {
      const foundUser = await Freelancers.findOne({ email: email });

      if (!foundUser) throw new Error('Invalid Request. User not found.');

      // Update the OTP Field For the User
      const { number, expiry } = foundUser.OTP!;

      //   Check if OTP has expired
      if (expiry! < currentTime) {
        return res.status(401).json({
          success: false,
          message: 'OTP has expired. Request a new one.',
        });
      }

      //   Check if OTP does not match
      if (+OTP !== number) {
        return res.status(403).json({
          success: false,
          message: 'Invalid OTP. Please confirm the code sent.',
        });
      }

      //   Update User's Document for Email Verified
      await Freelancers.findOneAndUpdate(
        { email: email },
        { $set: { emailVerified: true } }
      );

      // Return Successful Notification
      return res.status(200).json({
        success: true,
        message: 'Account Verified. Welcome to Joobz.',
      });

      // Return Error
    } catch (error) {
      console.log('Error Freelancer: ', error);
      return res
        .status(404)
        .json({ success: false, message: 'Sorry, an Error Occured' });
    }
  }
};

export default VerifyOTP;
