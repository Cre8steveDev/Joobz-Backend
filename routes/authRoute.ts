import { Router } from 'express';
import UserSignUp from '../controllers/auth/UserSignUp';
import FreelanceSignUp from '../controllers/auth/FreelanceSignUp';
import SignIn from '../controllers/auth/SignIn';
import verifyUser from '../middleware/verifyUser';

// Extended Request Interface
import refreshToken from '../controllers/auth/RefreshToken';
import getWallet from '../controllers/auth/getWallet';
import updateWallet from '../controllers/auth/updateWallet';
import VerifyOTP from '../controllers/auth/VerifyOTP';
import RenewOTP from '../controllers/auth/RenewOTP';
import getUserDataForDashboard from '../controllers/auth/getUserDataForDashboard';

//  Instantiate Auth Router
const router = Router();

// AUTHORIZATION RELATED ROUTES
router.post('/signup/user', UserSignUp);
router.post('/signup/freelancer', FreelanceSignUp);
router.post('/verify-otp', VerifyOTP);
router.post('/renew-otp', RenewOTP);

// Get user profile Data.
router.post('/get-user-profile-data', getUserDataForDashboard);

router.post('/signin', SignIn);
router.get('/refresh-token', verifyUser, refreshToken);
router.get('/get-wallet', verifyUser, getWallet);
router.post('/update-wallet', verifyUser, updateWallet);

// Return API Key for Paystack Payment
router.get('/get-api-key', verifyUser, (req, res) => {
  return res.status(200).json({ apiKey: process.env.PAYSTACK_KEY });
});

export default router;
