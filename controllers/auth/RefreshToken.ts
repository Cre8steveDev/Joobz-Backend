import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_SECRET } from '../../config';

// Define verifyUser Middleware for protected routes
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get user id from req.user
  // @ts-ignore
  const { _id } = req.user;

  const tokenExpiry = new Date().getTime() + 20 * 60 * 1000;
  const userToken = jwt.sign({ id: _id, tokenExpiry }, COOKIE_SECRET!);

  //   Send back the refreshed token to the front end
  return res.status(200).json({
    success: true,
    message: 'Successfully refreshed token',
    auth: userToken,
    tokenExpiry: tokenExpiry,
  });
};

export default refreshToken;
