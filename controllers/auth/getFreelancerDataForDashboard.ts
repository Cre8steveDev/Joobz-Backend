import type { Request, Response } from 'express';

import { Freelancers } from '../../models/models';

/**
 * Get Freelancer Data for Dashboard on Profile
 * @param req Request object
 * @param res Response Object
 * @returns a filtered freelancer object or error message object and null
 */
const getFreelancerDataForDashboard = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    // Retrieve Freelancer from Database by _id
    // Find Freelancer from Freelancers Collection
    const validUser = await Freelancers.findById(userId)
      .select('-password -__v -OTP')
      .populate('jobsPosted')
      .populate('wallet')
      .populate('reviews')
      .populate('invitations')
      .populate('paymentMethods')
      .lean();

    // If user is not found return and log out on FE
    if (!validUser) {
      return res.status(404).json({
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

export default getFreelancerDataForDashboard;
