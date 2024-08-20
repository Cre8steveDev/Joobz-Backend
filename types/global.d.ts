import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface User extends Document {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  OTP: { number: number; expiry: Date };
  phoneNumber: string;
  contactAddress: string;
  profilePicture: string;
  emailVerified: boolean;
  accountVerified: boolean;
  profileComplete: boolean;
  ROLE: string;
  dateJoined: Date;
  lastLogin: Date;
  isActive: boolean;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  languages: string[];
  companyName?: string;
  industry: string;
  bio: string;
  socialMedia: {
    linkedin: string;
    behance: string;
    twitter: string;
    github: string;
    website: string;
  };
  paymentMethods: { type: string; details: any };
  jobsPosted: any[];
  wallet: ObjectId;
  reviews: any[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface FreelanceUser extends Document {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  OTP: { number: number; expiry: Date };
  emailVerified: boolean;
  accountVerified: boolean;
  profileComplete: boolean;
  phoneNumber: string;
  contactAddress: string;
  displayName: string;
  category: string;
  profilePicture: string;
  ROLE: string;
  dateJoined: Date;
  lastLogin: Date;
  isActive: boolean;
  credits: number;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  languages: string[];
  skills: string[];
  hourlyRate: number;
  availability: string;
  bio: string;
  title: string;

  curriculumVitae: string;

  portfolio: [
    {
      title: string;
      description: string;
      link: string;
      images: string[];
    }
  ];

  socialMedia: {
    linkedin: string;
    behance: string;
    twitter: string;
    github: string;
    website: string;
  };
  paymentInfo: {
    payPalEmail: string;
    bankInfo: { accountNumber: number; bankName: string };
  };
  jobsCompleted: any[];
  currentJobs: any[];
  invitations: any[];
  wallet: ObjectId;
  reviews: any[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type RegisterData = {
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  phoneNumber: string;
  category: string;
  state: string;
  country: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoggedInUser = {
  _id: ObjectId;
  fullName: string;
  profilePicture: string;
  wallet: ObjectId;
  email: string;
  emailVerified: boolean;
  accountVerified: boolean;
  profileComplete: boolean;
  ROLE: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
  };
};

export type LoggedInFreelancer = {
  _id: ObjectId;
  fullName: string;
  displayName: string;
  email: string;
  profilePicture: string;
  emailVerified: boolean;
  accountVerified: boolean;
  profileComplete: boolean;
  wallet: ObjectId;
  credits: number;
  ROLE: string;
  category: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
  };
};

// Type for Create and Edit Job
export type CreateJob = {
  title: string;
  description: string;
  client: string;
  category: string;
  budget: { type: 'Fixed' | 'Salary'; amount: string };
  skills: string;
  state: string;
  pictures: string[];
  status: 'Open' | 'In-Progress' | 'Completed' | 'Cancelled';
  deadline: string;
  escrow: boolean;
};
