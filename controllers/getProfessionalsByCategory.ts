import { Request, Response, NextFunction } from 'express';
import { Freelancers } from '../models/models';

// Define verifyUser Middleware for protected routes
const getProfessionalsByCategory = async (req: Request, res: Response) => {
  // Retreive top freelancers
  const { category, userLocation } = req.body;
  console.log('CATEGORY AND USER LOCATION: ', category, userLocation);

  try {
    const allFreelancers = await Freelancers.aggregate([
      // Match documents with the specified category
      { $match: { category } },

      // Add a field to check if the state matches
      {
        $addFields: {
          isMatchingState: { $eq: ['$location.state', userLocation] },
        },
      },

      // Sort first by the matching state, then by state name
      {
        $sort: {
          isMatchingState: -1,
          'location.state': 1,
        },
      },

      // Optional: remove the temporary field we added
      {
        $project: {
          _id: 1,
          fullName: 1,
          category: 1,
          averageRating: 1,
          location: 1,
          profilePicture: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved top rated professionals',
      allFreelancers,
    });

    // Error handling
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'Unable to Retrieve Rated Professionals',
      allFreelancers: [],
    });
  }
};

export default getProfessionalsByCategory;
