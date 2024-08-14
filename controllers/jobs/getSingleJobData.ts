import { Request, Response, NextFunction } from 'express';
import { Users, Jobs } from '../../models/models';

/**
 * Get Single Job Data
 * @param req Request Object
 * @param res Response Object
 * @returns Returns success: true && job data or success: false && job: null
 */
const getSingleJobData = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: any }).user;

  const { jobId } = req.body;

  try {
    // Find all Jobs by the user
    const allUserJobs = await Jobs.findById(jobId).lean();

    return res.status(201).json({ success: true, jobs: allUserJobs });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(500).json({ success: false, jobs: null });
  }
};

export default getSingleJobData;
