import { Request, Response, NextFunction } from 'express';
import { Jobs } from '../../models/models';
import { CreateJob } from '../../types/global';

/**
 * Update Job Data made By User
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const editJobData = async (req: Request, res: Response) => {
  // Take update data from request object
  const { jobId, job } = req.body as { jobId: any; job: CreateJob };
  const { _id } = (req as Request & { user: any }).user;

  try {
    const skills = (job.skills as string).split(', ');
    // Find the job and confirm that the client is the current user
    const findJob = await Jobs.findById(jobId).lean();

    if (!findJob) throw new Error();

    if (findJob.client.toString() !== _id.toString())
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Action. You cannot modify this job.',
        job: null,
      });

    // Now find the job and update it
    const updatedJob = await Jobs.findByIdAndUpdate(
      jobId,
      {
        $set: {
          title: job.title,
          description: job.description,
          client: job.client,
          category: job.category,
          budget: job.budget,
          skills,
          state: job.state,
          pictures: job.pictures,
          status: job.status,
          deadline: job.deadline,
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
    return res.status(404).json({
      success: false,
      message: 'Unable to update Job.',
      job: null,
    });
  }
};

export default editJobData;
