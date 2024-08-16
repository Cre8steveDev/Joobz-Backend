import { Request, Response, NextFunction } from 'express';
import { Freelancers } from '../models/models';

// Define verifyUser Middleware for protected routes
const getProfessionalsMarkerByLocation = async (
  req: Request,
  res: Response
) => {
  // Retreive top freelancers
  const { userLocation } = req.body;

  try {
    const allFreelancers = await Freelancers.aggregate([
      // Match documents with the specified category
      { $match: { 'location.state': userLocation } },

      {
        $addFields: {
          longitude: '$location.longitude',
          latitude: '$location.latitude',
          state: '$location.state',
        },
      },

      // Pick out desired fields
      {
        $project: {
          _id: 1,
          fullName: 1,
          category: 1,
          // location: 1,
          longitude: 1,
          latitude: 1,
          state: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved marker data for all freelancers',
      allFreelancers,
    });

    // Error handling
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'Unable to Retrieve Marker Data',
      allFreelancers: [],
    });
  }
};

export default getProfessionalsMarkerByLocation;
