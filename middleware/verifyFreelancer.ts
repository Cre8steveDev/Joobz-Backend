import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_SECRET } from '../config';
import { Freelancers } from '../models/models';

// Define verifyFreelancer Middleware for protected routes
const verifyFreelancer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAuthorization = req.headers.authorization?.split(' ')[1];

  //  If there's no authorization in the header return error
  if (!userAuthorization) {
    return res.status(401).json({
      success: false,
      message: 'User not authorized. Please Sign In.',
    });
  }

  //   Try to verify the authorization that was given
  jwt.verify(userAuthorization, COOKIE_SECRET!, async (err: any, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized. Please Sign In.',
      });
    }

    // if the token has expired, return unauthorized
    const currentTime = Date.now();
    // @ts-ignore
    if (payload && currentTime > payload.tokenExpiry) {
      return res.status(401).json({
        success: false,
        message: 'Session has expired',
      });
    }

    // Verify that the user id is a valid registered user
    try {
      const { id } = payload as jwt.JwtPayload;
      const isValidUser = await Freelancers.findById(id);

      if (isValidUser) {
        // @ts-ignore
        req.tokenData = payload;
        // @ts-ignore
        req.user = isValidUser;
        return next();
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid User Credentials provided. Please try again.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'An error occured.',
      });
    }
  });
};

export default verifyFreelancer;
