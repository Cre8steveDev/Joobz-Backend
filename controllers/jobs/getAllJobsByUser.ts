import { Request, Response, NextFunction } from 'express';
import { Users, Jobs } from '../../models/models';

/**
 * Get All Jobs Created by User
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const getAllJobsByUser = async (req: Request, res: Response) => {
  const { _id } = (req as Request & { user: any }).user;

  console.log('GET ALL JOBS BY USER ENDPOINT HIT.');

  try {
    // Find all Jobs by the user
    const allUserJobs = await Jobs.find({ client: _id })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(201).json({ success: true, jobs: allUserJobs });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(500).json({ success: false, jobs: null });
  }
};

export default getAllJobsByUser;
