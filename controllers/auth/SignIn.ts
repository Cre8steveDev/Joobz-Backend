import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Freelancers, Users } from '../../models/models';
import {
  FreelanceUser,
  LoggedInFreelancer,
  LoggedInUser,
  LoginData,
  User,
} from '../../types/global';
import { COOKIE_SECRET } from '../../config';

const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginData;

  try {
    // Retrieve user from Database by the email address
    let validUser: User | FreelanceUser | null;

    // Find user from Users Collection
    validUser = await Users.findOne({ email });

    if (!validUser) {
      validUser = await Freelancers.findOne({ email });
    }

    // if Credentials is still not found then return 400
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Login Credentials.',
        auth: null,
        user: null,
      });
    }

    // Compare password from client with password stored in database
    const isPasswordMatch = bcryptjs.compareSync(password, validUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Login Credentials.',
        auth: null,
        user: null,
      });
    }
    // if they match, then create a jsonwebtoken and sign the user Id and send back
    const tokenExpiry = new Date().getTime() + 20 * 60 * 1000;
    const userToken = jwt.sign(
      { id: validUser._id, tokenExpiry },
      COOKIE_SECRET!
    );

    let userData: LoggedInUser | LoggedInFreelancer;

    console.log('Valid User for Freelancers: ', validUser);

    // Destructure values from the user
    // @ts-ignore
    if (validUser.ROLE === 'FREELANCER') {
      const {
        fullName,
        profilePicture,
        wallet,
        _id,
        // @ts-ignore
        displayName,
        // @ts-ignore
        emailVerified,
        ROLE,
        // @ts-ignore
        location,
      } = validUser;

      userData = {
        _id,
        fullName,
        displayName,
        profilePicture,
        wallet,
        emailVerified,
        ROLE,
        location,
      };
    } else {
      const {
        fullName,
        profilePicture,
        wallet,
        _id,
        // @ts-ignore
        emailVerified,
        ROLE,
        // @ts-ignore
        location,
      } = validUser;

      userData = {
        _id,
        fullName,
        profilePicture,
        wallet,
        ROLE,
        emailVerified,
        location,
      };
    }

    // Also send back other details needed on the front end
    return res.status(200).json({
      success: true,
      message: 'Logged in Successfully.',
      auth: { token: userToken, tokenExpiry },
      user: userData,
    });

    // Error handling
  } catch (error: any) {
    console.log('Error in Sign In: ', error);
    return res.status(500).json({
      success: false,
      message: 'Invalid Login Credentials.',
      auth: null,
      user: null,
    });
  }
};

export default SignIn;
