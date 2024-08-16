import { Request, Response, NextFunction } from 'express';
import { Users, Freelancers } from '../../models/models';

/**
 * Update Profile Photo for User or Freelancer
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateProfilePhoto = async (req: Request, res: Response) => {
  // Take update data from request object
  const { userId, type, picture } = req.body;

  try {
    if (type === 'User') {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $set: { profilePicture: picture } }
      );
    } else if (type === 'Freelancer') {
      await Freelancers.findOneAndUpdate(
        { _id: userId },
        { $set: { profilePicture: picture } }
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Profile photo updated successfully.',
    });
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update profile photo',
    });
  }
};

export default updateProfilePhoto;
