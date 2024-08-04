import { NextFunction, Request, Response, Router } from 'express';
import { Users, Wallets, Doctors } from '../models/models';
import { SignUp } from '../controllers/auth/SignUp';
import passport from 'passport';
import localStrategy from '../controllers/strategies/localstrategy';
import { TSignupForm } from '../types/types';

const router = Router();

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

// SignUp Route
router.post('/signup', SignUp);

// SignIn Route with PassportJS Authentication
passport.use(localStrategy);

router.post(
  '/signin',
  passport.authenticate('local'),
  loginErrorHandler,
  (request: Request, response: Response) => {
    return response.status(200).json(request.user);
  }
);

// Confirm Login Status
router.get('/status', (request, response) => {
  return request.user
    ? response.json({ authenticated: true })
    : response.json({ authenticated: false });
});

// Logout route
router.get('/logout', (request, response) => {
  // if (!request.user) return response.sendStatus(401);

  // Call the logout function on the request
  request.logout((err) => {
    if (err) return response.sendStatus(400);

    response.sendStatus(200);
  });
});

export default router;
