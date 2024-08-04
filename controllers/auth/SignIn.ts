import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Users } from '../../models/models';
import { LoginData } from '../../types/global';
import { COOKIE_SECRET } from '../../config';

const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginData;

  try {
    // Retrieve user from Database by the email address
    const validUser = await Users.findOne({ email });

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

    // Destructure values from the user
    const { fullName, profilePicture, wallet, _id } = validUser;
    const userData = {
      _id,
      fullName,
      profilePicture,
      wallet,
    };

    // Also send back other details needed on the front end
    return res.status(200).json({
      success: true,
      message: 'Logged in Successfully.',
      auth: { id: userToken, tokenExpiry },
      user: userData,
    });

    // Error handling
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Login Credentials.',
      auth: null,
      user: null,
    });
  }
};

export default SignIn;
