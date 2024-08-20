import { Request, Response, NextFunction } from 'express';
import { Freelancers } from '../../models/models';

/**
 * Update Freelancer's Profile Based on the type sent from Front end
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateFreelancerProfile = async (req: Request, res: Response) => {
  // Take update data from request object
  const { userId, type, data } = req.body;

  console.log('THE REQUEST BODY: ', req.body);

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
          bio: data.bio,
          title: data.title,
          languages: langs,
          skills: data.skills,
          availability: data.availability,
          paymentInfo: {
            paypalEmail: data.paypalEmail,
            bankInfo: {
              accountNumber: data.accountNumber,
              bankName: data.bankName,
            },
          },
        },
      };
    } else if (type === 'Account-Info') {
      updateOperation = {
        $set: {
          phoneNumber: data.phoneNumber,
          password: data.password,
          email: data.email,
          contactAddress: data.contactAddress,
        },
      };
    } else {
      throw new Error('Invalid Operations type');
    }

    // Carry out the update operation
    const updatedUser = await Freelancers.findOneAndUpdate(
      { _id: userId },
      updateOperation,
      {
        new: true,
      }
    )
      .select('-password -__v -OTP')
      .populate('currentJobs')
      .populate('jobsCompleted')
      .populate('jobsAppliedFor')
      .populate('wallet')
      .populate('reviews')
      .populate('invitations');

    return res.status(201).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(403).json({ success: false, user: null });
  }
};

export default updateFreelancerProfile;
