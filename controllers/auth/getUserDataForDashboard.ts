import type { Request, Response } from 'express';

import { Users } from '../../models/models';

/**
 * Get User Data for Dashboard on Profile
 * @param req Request object
 * @param res Response Object
 * @returns a filtered user object or error message object and null
 */
const getUserDataForDashboard = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: any }).user;

  try {
    // Retrieve user from Database by _id
    // Find user from Users Collection
    const validUser = await Users.findById(_id)
      .select('-password -__v -OTP')
      .populate('jobsPosted')
      .populate('wallet')
      .populate('reviews')
      .populate('invitations')
      .populate('paymentMethods')
      .lean();

    // If user is not found return and log out on FE
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Unable to get user data.',
        user: null,
      });
    }

    // Also send back other details needed on the front end
    return res.status(200).json({
      success: true,
      message: 'Logged in Successfully.',
      user: validUser,
    });

    // Error handling
  } catch (error: any) {
    console.log('Error in Sign In: ', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to get user data.',
      user: null,
    });
  }
};

export default getUserDataForDashboard;
