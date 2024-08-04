import { NextFunction, Request, Response } from 'express';

const loginErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(403).json({ message: 'Invalid Login Details' });
  }

  next();
};

export default loginErrorHandler;
