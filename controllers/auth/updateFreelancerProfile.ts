import { Request, Response, NextFunction } from 'express';
import { Users } from '../../models/models';

/**
 * Update User's Profile Based on the type sent from Front end
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateFreelancerProfile = async (req: Request, res: Response) => {
  // Take update data from request object
  const { userId, type, data } = req.body;

  const langs = String(data.languages)
    .trim()
    .toUpperCase()
    .split(', ')
    .slice(0, 3);

  let updateOperation: any;

  try {
    // Update Operation for  Socials
    if (type === 'Socials') {
      updateOperation = { $set: { socialMedia: data } };
    } else if (type === 'Personal-Data') {
      updateOperation = {
        $set: {
          languages: langs,
          companyName: data.companyName,
          industry: data.industry,
          email: data.email,
          phoneNumber: data.phoneNumber,
          bio: data.bio,
        },
      };
    } else {
      throw new Error('Invalid Operations type');
    }

    // Carry out the update operation
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      updateOperation,
      {
        new: true,
      }
    )
      .select('-password -__v -OTP')
      .populate('jobsPosted')
      .populate('wallet')
      .populate('reviews')
      .populate('invitations')
      .populate('paymentMethods');

    return res.status(201).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(403).json({ success: false, user: null });
  }
};

export default updateFreelancerProfile;
