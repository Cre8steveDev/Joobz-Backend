import { Request, Response, NextFunction } from 'express';
import { Freelancers } from '../models/models';

/**
 * Get Single Professional By ID
 * @param req Request Object
 * @param res Response Object
 * @returns Return All (Public viewable ) data for the user
 */
const getSingleProfessionalById = async (req: Request, res: Response) => {
  // Get the userID from the request body
  const { userId } = req.body;

  console.log('User ID: ', userId);

  // Retrieve the Data from Database
  try {
    const freelancer = await Freelancers.findById(userId).select(
      '_id fullName category averageRating location profilePicture dateJoined lastLogin isActive languages skills hourlyRate availability bio title education experience portfolio certifications socialMedia jobsCompleted currentJobs reviews '
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved top rated professionals',
      freelancer,
    });

    // Error handling
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'Unable to Retrieve Rated Professionals',
      freelancer: null,
    });
  }
};

export default getSingleProfessionalById;
