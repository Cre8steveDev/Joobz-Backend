import mongoose from 'mongoose';

const FreelancerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    displayName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactAddress: String,
    emailVerified: { type: Boolean, default: false },
    accountVerified: { type: Boolean, default: false },
    profileComplete: { type: Boolean, default: false },
    category: { type: String },
    OTP: { number: Number, expiry: Number },
    phoneNumber: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg',
    },
    dateJoined: { type: Date, default: Date.now },
    ROLE: { type: String, default: 'FREELANCER' },
    lastLogin: Date,
    isActive: { type: Boolean, default: true },
    location: {
      country: String,
      state: String,
      latitude: { type: Number, default: 0.0 },
      longitude: { type: Number, default: 0.0 },
    },
    languages: [String],
    skills: [String],
    hourlyRate: { type: Number, default: 0.0 },
    availability: [String],
    bio: String,
    title: String,

    portfolio: [
      {
        title: String,
        description: String,
        link: String,
        images: [String],
      },
    ],

    curriculumVitae: String,

    socialMedia: {
      linkedin: String,
      behance: String,
      twitter: String,
      github: String,
      website: String,
    },

    paymentInfo: {
      paypalEmail: String,
      bankInfo: mongoose.Schema.Types.Mixed,
    },
    credits: { type: Number, default: 10 },
    jobsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    jobsAppliedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    currentJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallets' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    averageRating: { type: Number, default: 0 },
    invitations: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'JobInvitations' },
    ],
  },
  { timestamps: true }
);

export default FreelancerSchema;
