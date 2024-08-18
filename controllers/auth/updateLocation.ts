import { Request, Response, NextFunction } from 'express';
import { Freelancers, Users } from '../../models/models';

/**
 * Update User's Location for both Freelancer and Normal User
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateUserLocation = async (req: Request, res: Response) => {
  // Take update data from request object
  const { userId, longitude, latitude } = req.body;

  let user: any;
  try {
    user = await Users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'location.longitude': longitude,
          'location.latitude': latitude,
        },
      },
      { new: true }
    ).select(
      '_id fullName profilePicture wallet email emailVerified accountVerified profileComplete ROLE location'
    );

    if (!user) {
      user = await Freelancers.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            'location.longitude': longitude,
            'location.latitude': latitude,
          },
        },
        { new: true }
      ).select(
        '_id fullName displayName profilePicture wallet email emailVerified accountVerified category credits profileComplete ROLE location'
      );

      if (!user) throw new Error('Unable to update location.');
    }

    return res.status(200).json({
      success: true,
      message: 'Location update Successfull.',
      user,
    });
    // Error handling
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(401).json({
      success: false,
      message: 'Unable to update location.',
      user: null,
    });
  }
};

export default updateUserLocation;
