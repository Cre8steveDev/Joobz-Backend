import { Request, Response, NextFunction } from 'express';
import { Freelancers, Jobs } from '../../models/models';

/**
 * Handle Proposal related Actions to a given Job identified
 * By its Id. Then return the updated Job data
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const submitProposal = async (req: Request, res: Response) => {
  // Take update data from request object
  const { jobId, proposal, type, userId } = req.body;
  let updatedJob: any;
  let updateFreelanceOp: any;

  try {
    if (type === 'NEW') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId },
        { $addToSet: { proposals: proposal } },
        { new: true }
      );

      // Add the jobId to the jobs Freelancer has applied to
      updateFreelanceOp = { $addToSet: { jobsAppliedFor: jobId } };

      // Handle Editing of Proposal by Authored Freelancer
    } else if (type === 'EDIT') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId, 'proposals.freelancer': proposal.freelancer },
        { $set: { 'proposals.$': proposal } },
        { new: true }
      );

      // Handle Delete Proposal by Authored Freelancer
    } else if (type === 'DELETE') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId },
        { $pull: { proposals: { freelancer: proposal.freelancer } } },
        { new: true }
      );

      // Remove the job from the user as part of jobs applied for.
      updateFreelanceOp = { $pull: { jobsAppliedFor: jobId } };

      // Handle Decline Proposal Option
    } else if (type === 'DECLINED') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId, 'proposals.freelancer': proposal.freelancer },
        { $set: { 'proposals.$.status': 'Declined' } },
        { new: true }
      );

      // When Job Poster accepts the proposal
      // Update the Job's field of hiredFreelancer and Status
    } else if (type === 'ACCEPT') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId, 'proposals.freelancer': proposal.freelancer },
        {
          $set: {
            'proposals.$.status': 'Accepted',
            hiredFreelancer: proposal.freelancer,
            status: 'In-Progress',
          },
        },
        { new: true }
      );

      // Remove the job from the user as part of jobs applied for.
      // Add the job to the currentJob
      updateFreelanceOp = {
        $pull: { jobsAppliedFor: jobId },
        $addToset: { currentJobs: jobId },
      };
    } else {
      throw new Error();
    }

    if (!updatedJob) throw new Error('COULD NOT FIND ANY MATCHING JOBS.');

    // Add the job to the user as part of jobs applied for.
    if (type === 'ACCEPT' || type === 'NEW' || type === 'DELETE') {
      const submittedUser = await Freelancers.findOneAndUpdate(
        { _id: proposal.freelancer },
        updateFreelanceOp
      );

      if (!submittedUser) throw new Error('INVALID USER ID.');
    }

    // Populate and convert to plain JavaScript object after the update
    updatedJob = await Jobs.populate(updatedJob, {
      path: 'client',
      select:
        'fullName profilePicture companyName industry socialMedia _id location averageRating',
    });
    updatedJob = updatedJob.toObject();

    // Return Success status and the updated job
    return res.status(201).json({
      success: true,
      message: 'Proposal Submitted successfully.',
      job: updatedJob,
    });

    // Error Handling
  } catch (error) {
    console.error(
      'ERROR RELATED TO PROPOSAL HANDLING OPERATIONS:\n',
      error,
      '\n'
    );
    return res.status(403).json({
      success: false,
      message: 'An Error occured. We are unable to update Job..',
      job: null,
    });
  }
};

export default submitProposal;
