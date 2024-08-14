import { Request, Response, NextFunction } from 'express';
import { Users, Jobs } from '../../models/models';

/**
 * Create a New Job tied to the User's account
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const createNewJob = async (req: Request, res: Response) => {
  const { job } = req.body;
  const { _id } = (req as Request & { user: any }).user;

  const skills = (job.skills as string).split(', ');

  try {
    // Create a new Job object with the data
    const newJob = new Jobs({
      title: job.title,
      description: job.description,
      client: _id,
      category: job.category,
      budget: job.budget,
      skills,
      state: job.state,
      pictures: job.pictures,
      datePosted: new Date().toISOString(),
      deadline: job.deadline,
    });

    // Save to DB
    await newJob.save();

    // Update the user with the id of the job
    await Users.findByIdAndUpdate(_id, {
      $addToSet: { jobsPosted: newJob._id },
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log('Error occured: ', error);
    return res.status(403).json({ success: false });
  }
};

export default createNewJob;
