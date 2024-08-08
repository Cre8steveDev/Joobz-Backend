import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

// Chat Schema
const ChatSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'Users' },
    freelancerId: { type: ObjectId, ref: 'Freelancers' },
    title: String,
    freelancerProfilePhoto: String,
    messages: [{ role: String, message: String, date: String, photo: String }],
    invitations: [{ type: ObjectId, ref: 'JobInvitations' }],
  },
  { timestamps: true }
);

export default ChatSchema;
