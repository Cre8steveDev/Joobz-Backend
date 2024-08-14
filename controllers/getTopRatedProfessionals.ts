import { Request, Response, NextFunction } from 'express';
import { Freelancers } from '../models/models';

// Define verifyUser Middleware for protected routes
const getTopRatedProfessionals = async (req: Request, res: Response) => {
  // Retreive top freelancers
  try {
    const topFreelancers = await Freelancers.find({
      averageRating: { $exists: true, $gte: 4 },
    })
      .sort({ averageRating: -1 })
      .limit(3)
      .select('_id fullName category averageRating location profilePicture')
      .lean();

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved top rated professionals',
      topRatedPros: topFreelancers,
    });

    // Error handling
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'Unable to Retrieve Rated Professionals',
      topRatedPros: null,
    });
  }
};

export default getTopRatedProfessionals;
