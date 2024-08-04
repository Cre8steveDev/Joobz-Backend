import mongoose from 'mongoose';

// Job Review Schema
const ReviewSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'reviewerType',
    required: true,
  },
  reviewerType: {
    type: String,
    enum: ['User', 'Freelancer'],
    required: true,
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'revieweeType',
    required: true,
  },
  revieweeType: {
    type: String,
    enum: ['User', 'Freelancer'],
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  datePosted: { type: Date, default: Date.now },
});

export default ReviewSchema;
