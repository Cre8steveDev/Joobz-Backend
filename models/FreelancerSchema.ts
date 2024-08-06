import mongoose from 'mongoose';

const FreelancerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  displayName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
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
    city: String,
    latitude: { type: Number, default: 0.0 },
    longitude: { type: Number, default: 0.0 },
    latitudeDelta: { type: Number, default: 0.0 },
    longitudeDelta: { type: Number, default: 0.0 },
  },
  languages: [String],
  skills: [String],
  hourlyRate: Number,
  availability: String,
  bio: String,
  title: String, // e.g., "Senior Web Developer"
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      from: Date,
      to: Date,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      from: Date,
      to: Date,
      description: String,
    },
  ],
  portfolio: [
    {
      title: String,
      description: String,
      link: String,
      images: [String],
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      dateObtained: Date,
      link: String,
    },
  ],
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
  jobsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  currentJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  averageRating: { type: Number, default: 0 },
});

export default FreelancerSchema;
