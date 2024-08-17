import { Request, Response, NextFunction } from 'express';
import { Users, Jobs } from '../../models/models';

/**
 * Get Single Job Data
 * @param req Request Object
 * @param res Response Object
 * @returns Returns success: true && job data or success: false && job: null
 */
const getSingleJobData = async (req: Request, res: Response) => {
  const { jobId } = req.body;

  try {
    // Find all Jobs by the user
    const job = await Jobs.findById(jobId)
      .populate({
        path: 'client',
        select:
          'fullName profilePicture companyName industry socialMedia _id location averageRating',
      })
      .lean();

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(500).json({ success: false, job: null });
  }
};

export default getSingleJobData;
