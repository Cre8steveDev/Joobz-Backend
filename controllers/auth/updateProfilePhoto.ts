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

  let user: any;

  try {
    if (type === 'User') {
      user = await Users.findOneAndUpdate(
        { _id: userId },
        { $set: { profilePicture: picture } },
        { new: true }
      ).select(
        '_id fullName profilePicture wallet email emailVerified accountVerified profileComplete ROLE location'
      );
    } else if (type === 'Freelancer') {
      user = await Freelancers.findOneAndUpdate(
        { _id: userId },
        { $set: { profilePicture: picture } },
        { new: true }
      ).select(
        '_id fullName profilePicture wallet email emailVerified accountVerified profileComplete ROLE location'
      );
    } else throw new Error();

    return res.status(201).json({
      success: true,
      message: 'Profile photo updated successfully.',
      user,
    });
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update profile photo',
      user: null,
    });
  }
};

export default updateProfilePhoto;
