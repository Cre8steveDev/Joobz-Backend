import mongoose from 'mongoose';

// Job Schema
const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    category: { type: String, required: true },
    budget: {
      type: { type: String, enum: ['Fixed', 'Hourly'], required: true },
      amount: { type: Number, required: true },
    },
    skills: [String],
    state: String,
    pictures: [String],
    datePosted: { type: Date, default: Date.now },
    deadline: String,
    status: {
      type: String,
      enum: ['Open', 'In-Progress', 'Completed', 'Cancelled'],
      default: 'Open',
    },
    proposals: [
      {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Freelancers',
        },
        proposedAmount: Number,
        status: {
          type: String,
          enum: ['Pending', 'Accepted', 'Rejected'],
          default: 'Pending',
        },
        dateSubmitted: { type: Date, default: Date.now },
      },
    ],
    hiredFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Freelancers',
    },
    completionDate: Date,
  },
  { timestamps: true }
);

export default JobSchema;
