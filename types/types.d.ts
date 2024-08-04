import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  full_name: string;
  email: string;
  date_of_birth: string;
  blood_group: string;
  genotype: string;
  phone_number: number;
  password: string;
  gender: string;
  profile_photo: string;
  walletId: ObjectId;
  appointments: ObjectId[];
  chats: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}


export type TSignupForm = {
  full_name: string;
  email: string;
  date_of_birth: string;
  blood_group?: string;
  genotype?: string;
  phone_number: string;
  password: string;
  gender: string;
};
