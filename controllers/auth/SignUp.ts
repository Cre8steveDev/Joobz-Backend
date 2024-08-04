import { TSignupForm } from '../../types/types';
import type { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { Schema } from 'mongoose';
import { Users, Wallets } from '../../models/models';

const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  const {
    full_name,
    email,
    date_of_birth,
    blood_group,
    genotype,
    gender,
    phone_number,
    password,
  } = req.body as TSignupForm;

  try {
    // Create New Wallet for the user
    const newWallet = new Wallets();
    await newWallet.save();

    if (!newWallet) throw new Error('Error Initiating SignUp Process.');

    console.log('=======New Wallet');
    console.log(newWallet);

    // hash password before saving to db
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Create New User
    const newUser = new Users({
      full_name,
      email,
      date_of_birth,
      blood_group,
      genotype,
      gender,
      phone_number,
      password: hashedPassword,
      walletId: newWallet._id,
    });

    // Try Saving the user, if it fails, delete the created wallet
    // Then throw another error to be caught by the outer catch
    try {
      await newUser.save();
    } catch (error) {
      await Wallets.findByIdAndDelete(newWallet._id);
      throw new Error('Error Creating New User!');
    }

    // Catch any error that may have occured
  } catch (error: any) {
    return res.status(403).json({ message: error!.message });
  }

  return res
    .status(201)
    .json({ message: 'Received your Response! As you were!' });
};

export { SignUp };
