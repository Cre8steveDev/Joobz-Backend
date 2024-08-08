import mongoose from 'mongoose';

// Job Schema
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  category: { type: String, required: true },
  subCategory: String,
  budget: {
    type: { type: String, enum: ['fixed', 'hourly'], required: true },
    amount: { type: Number, required: true },
  },
  skills: [String],
  datePosted: { type: Date, default: Date.now },
  deadline: Date,
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open',
  },
  proposals: [
    {
      freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancers' },
      coverLetter: String,
      proposedAmount: Number,
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      dateSubmitted: { type: Date, default: Date.now },
    },
  ],
  hiredFreelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancers' },
  completionDate: Date,
});

export default JobSchema;
