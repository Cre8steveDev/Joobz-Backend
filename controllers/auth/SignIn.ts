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

    // Update Last Login Field
    if (validUser)
      validUser = await Users.findOneAndUpdate(
        { email },
        {
          $set: {
            lastLogin: new Date().toISOString(),
          },
        },
        { new: true }
      );

    if (!validUser) {
      validUser = await Freelancers.findOne({ email }).lean();

      // Update Last Login Field
      if (validUser)
        validUser = await Freelancers.findOneAndUpdate(
          { email },
          {
            $set: {
              lastLogin: new Date().toISOString(),
            },
          },
          { new: true }
        );
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
    const isPasswordMatch = bcryptjs.compareSync(
      password.trim(),
      validUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Login Credentials.',
        auth: null,
        user: null,
      });
    }

    // If they match, then create a jsonwebtoken
    // and sign the user Id and send back
    const tokenExpiry = Date.now() + 20 * 60 * 1000;
    const userToken = jwt.sign(
      { id: validUser._id, tokenExpiry },
      COOKIE_SECRET!
    );

    let userData: LoggedInUser | LoggedInFreelancer;

    // Destructure values from the user

    if (validUser.ROLE === 'FREELANCER') {
      const {
        fullName,
        profilePicture,
        wallet,
        _id,
        displayName,
        emailVerified,
        accountVerified,
        profileComplete,
        category,
        ROLE,
        credits,
        email,
        location,
      } = validUser as FreelanceUser;

      userData = {
        _id,
        fullName,
        displayName,
        profilePicture,
        wallet,
        emailVerified,
        accountVerified,
        profileComplete,
        email,
        category,
        ROLE,
        credits,
        location,
      };
    } else {
      const {
        fullName,
        profilePicture,
        wallet,
        _id,
        emailVerified,
        accountVerified,
        profileComplete,
        ROLE,
        email,
        location,
      } = validUser;

      userData = {
        _id,
        fullName,
        profilePicture,
        wallet,
        ROLE,
        email,
        emailVerified,
        accountVerified,
        profileComplete,
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
