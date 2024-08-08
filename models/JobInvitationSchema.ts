import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

// Job Invitation Schema
const JobInvitationSchema = new Schema(
  {
    chatId: { type: ObjectId, ref: 'Chats' },
    userId: { type: ObjectId, ref: 'Users' },
    freelancerId: { type: ObjectId, ref: 'Freelancers' },
    jobId: { type: ObjectId, ref: 'Jobs' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
  },
  { timestamps: true }
);

export default JobInvitationSchema;
