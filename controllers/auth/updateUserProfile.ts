import { Request, Response, NextFunction } from 'express';
import { Users } from '../../models/models';

/**
 * Update User's Profile Based on the type sent from Front end
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateUserProfile = async (req: Request, res: Response) => {
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

      // Personal Data update
    } else if (type === 'Personal-Data') {
      updateOperation = {
        $set: {
          languages: langs,
          companyName: data.companyName,
          industry: data.industry,
          bio: data.bio,
        },
      };

      // Account Information
    } else if (type === 'Account-Info') {
      updateOperation = {
        $set: {
          phoneNumber: data.phoneNumber,
          password: data.password,
          email: data.email,
          contactAddress: data.contactAddress,
        },
      };

      // Unknown operation. Throw error
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

export default updateUserProfile;
