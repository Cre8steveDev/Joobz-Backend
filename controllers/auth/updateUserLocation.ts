import { Request, Response, NextFunction } from 'express';
import { Users } from '../../models/models';

/**
 * Update User's Location
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const updateUserLocation = async (req: Request, res: Response) => {
  // Take update data from request object
  const { userId, longitude, latitude } = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          'location.longitude': longitude,
          'location.latitude': latitude,
        },
      },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
      });
    } else {
      throw new Error('Unable to update location.');
    }
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(401).json({
      success: false,
      message: 'Unable to update location.',
    });
  }
};

export default updateUserLocation;
