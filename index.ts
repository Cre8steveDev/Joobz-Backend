import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import env variables
import { PORT, COOKIE_SECRET, SESSION_SECRET } from './config';

// Helper Functions
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import connectDB from './mongoose';

// import Routers
// import authRouter from './routes/authRoute';

const app = express();
const port = PORT || 3000;
const secret = COOKIE_SECRET;
const session_secret = SESSION_SECRET;

// Register middlewares on the app instance
app.use(cors());
app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware on the app instance
app.use(
  session({
    secret: session_secret!,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000 * 7000 * 2 }, //almost 24 hours
  })
);

// Create health check route
app.get('/health', (req: Request, res: Response) => {
  res.send('Yuuup! Server still up and running 😄');
});

// Add route handlers as middleware
// app.use('/api/auth', authRouter);

/////////////////////////////////
// Connect the Database and Start The Server on Success
/////////////////////////////////

connectDB().then((response) => {
  if (response)
    return app.listen(PORT, () =>
      console.log('Serveris running on port: ', PORT)
    );

  // If database connection fails
  console.log('Error occured');
  process.exit();
});
