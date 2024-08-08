import mongoose from 'mongoose';

// import the schemas
import UserSchema from './UserSchema';
import FreelancerSchema from './FreelancerSchema';
import JobSchema from './JobSchema';
import ReviewSchema from './ReviewSchema';
import WalletSchema from './WalletSchema';
import ChatSchema from './ChatSchema';
import JobInvitationSchema from './JobInvitationSchema';

// Create all Models from the Schemas
const Users = mongoose.model('Users', UserSchema);
const Freelancers = mongoose.model('Freelancers', FreelancerSchema);
const Jobs = mongoose.model('Jobs', JobSchema);
const Reviews = mongoose.model('Reviews', ReviewSchema);
const Wallets = mongoose.model('Wallets', WalletSchema);
const Chats = mongoose.model('Chats', ChatSchema);
const JobInvitation = mongoose.model('JobInvitations', JobInvitationSchema);

// Export the models
export { Users, Freelancers, Jobs, Reviews, Wallets, Chats, JobInvitation };
