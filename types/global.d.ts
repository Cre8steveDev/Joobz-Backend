import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface User extends Document {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  OTP: { number: number; expiry: Date };
  phoneNumber: string;
  profilePicture: string;
  emailVerified: boolean;
  accountVerified: boolean;
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
  phoneNumber: string;
  profilePicture: string;
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
  skills: string[];
  hourlyRate: number;
  availability: string;
  bio: string;
  title: string;
  education: [
    {
      institution: string;
      degree: string;
      fieldOfStudy: string;
      from: Date;
      to: Date;
    }
  ];
  experience: [
    {
      title: string;
      company: string;
      from: Date;
      to: Date;
      description: string;
    }
  ];

  portfolio: [
    {
      title: string;
      description: string;
      link: string;
      images: string[];
    }
  ];
  certifications: [
    {
      name: string;
      issuer: string;
      dateObtained: Date;
      link: Date;
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

  emailVerified: boolean;
  accountVerified: boolean;
  ROLE: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type LoggedInFreelancer = {
  _id: ObjectId;
  fullName: string;
  displayName: string;
  profilePicture: string;
  emailVerified: boolean;
  accountVerified: boolean;
  wallet: ObjectId;
  ROLE: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};
