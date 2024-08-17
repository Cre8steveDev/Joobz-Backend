import { Request, Response, NextFunction } from 'express';
import { Jobs, Users } from '../../models/models';

/**
 * Update User's Location
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const changeJobStatus = async (req: Request, res: Response) => {
  // Take update data from request object
  const { jobId, update } = req.body;
  // const { _id } = (req as Request & { user: any }).user;

  try {
    const updatedJob = await Jobs.findOneAndUpdate(
      { _id: jobId },
      {
        $set: {
          status: update,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: 'client',
        select:
          'fullName profilePicture companyName industry socialMedia _id state averageRating',
      })
      .lean();

    if (!updatedJob) throw new Error();

    return res.status(201).json({
      success: true,
      message: 'Job Updated Successfully.',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(401).json({
      success: false,
      message: 'Unable to update Job.',
      job: null,
    });
  }
};

export default changeJobStatus;
