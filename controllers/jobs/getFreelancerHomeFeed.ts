import { Request, Response } from 'express';
import { Jobs } from '../../models/models';
import { FreelanceUser } from '../../types/global';

/**
 * Get Jobs for the Freelancer's Home screen
 * Based on the Filter Type provided in the
 * URL Parameter
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const getFreelancerHomeFeed: (req: any, res: any) => any = async (
  req: Request,
  res: Response
) => {
  const { _id, location, category } = (req as Request & { user: FreelanceUser })
    .user;

  // Parameters
  const { filter } = req.query;

  let operation: any;

  // Compose Filter option based on query type.
  if (filter === 'state') {
    operation = { state: location.state };
  } else if (filter === 'category') {
    operation = { category, state: location.state };
  } else {
    operation = {};
  }

  try {
    const allUserJobs = await Jobs.find(operation)
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({ success: true, jobs: allUserJobs });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(500).json({ success: false, jobs: null });
  }
};

export default getFreelancerHomeFeed;
