import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  OTP: { number: Number, expiry: Number },
  emailVerified: { type: Boolean, default: false },
  phoneNumber: { type: String, required: true },
  profilePicture: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg',
  },
  dateJoined: { type: Date, default: Date.now },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  location: {
    country: String,
    state: String,
  },
  languages: [String],
  companyName: String,
  industry: String,
  bio: String,
  socialMedia: {
    linkedin: String,
    behance: String,
    twitter: String,
    github: String,
    website: String,
  },
  paymentMethods: [
    {
      type: { type: String, enum: ['Paypal', 'Wallet'] },
      details: mongoose.Schema.Types.Mixed,
    },
  ],
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  averageRating: { type: Number, default: 0 },
});

export default UserSchema;
