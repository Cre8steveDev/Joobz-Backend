import { Request, Response, NextFunction } from 'express';
import { Jobs } from '../../models/models';

/**
 * Submit Proposal to a given Job identified
 * By its Id. Then return the updated Job data
 * @param req Request Object
 * @param res Response Object
 * @returns Returns Success True or False
 */
const submitProposal = async (req: Request, res: Response) => {
  // Take update data from request object
  const { jobId, proposal, type } = req.body;
  let updatedJob: any;

  console.log('JOBID: ', jobId);
  console.log('PROPOSAL SUBMITTED: ', proposal);
  console.log('TYPE OF SUBMISSION: ', type);
  
  try {
    if (type === 'NEW') {
      updatedJob = await Jobs.findOneAndUpdate(
        { _id: jobId },
        {
          $addToSet: {
            proposals: proposal,
          },
        },
        {
          new: true,
        }
      )
        .populate({
          path: 'client',
          select:
            'fullName profilePicture companyName industry socialMedia _id location averageRating',
        })
        .lean();
    } else if (type === 'EDIT') {
      updatedJob = await Jobs.findOneAndUpdate(
        {
          _id: jobId,
          'proposals.freelancer': proposal.freelancer,
        },
        {
          $set: {
            'proposals.$': proposal,
          },
        },
        {
          new: true,
        }
      )
        .populate({
          path: 'client',
          select:
            'fullName profilePicture companyName industry socialMedia _id location averageRating',
        })
        .lean();
    } else {
      throw new Error();
    }

    if (!updatedJob) throw new Error();

    return res.status(201).json({
      success: true,
      message: 'Proposal Submitted successfully.',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Error updating user location:', error);
    return res.status(401).json({
      success: false,
      message: 'There was an error submitting proposal.',
      job: null,
    });
  }
};

export default submitProposal;
