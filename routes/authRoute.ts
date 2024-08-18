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
import updateUserLocation from '../controllers/auth/updateLocation';
import updateUserProfile from '../controllers/auth/updateUserProfile';
import getFreelancerDataForDashboard from '../controllers/auth/getFreelancerDataForDashboard';
import updateFreelancerLocation from '../controllers/auth/updateFreelancerLocation';
import verifyFreelancer from '../middleware/verifyFreelancer';
import updateProfilePhoto from '../controllers/auth/updateProfilePhoto';

//  Instantiate Auth Router
const router = Router();

// AUTHORIZATION RELATED ROUTES
router.post('/signup/user', UserSignUp);
router.post('/signup/freelancer', FreelanceSignUp);
router.post('/signin', SignIn);
router.post('/verify-otp', VerifyOTP);
router.post('/renew-otp', RenewOTP);
router.get('/refresh-token', verifyUser, refreshToken);

// Get user and freelancer profile Data.
router.get('/get-user-profile-data', verifyUser, getUserDataForDashboard);
router.get(
  '/get-freelancer-profile-data',
  verifyFreelancer,
  getFreelancerDataForDashboard
);

// Update user Location
router.post('/update-location', updateUserLocation);
router.post('/update-freelancer-location', updateFreelancerLocation);

// Update User Profile
router.post('/update-user-profile', verifyUser, updateUserProfile);
router.post('/update-freelancer-profile', verifyFreelancer, updateUserProfile);
router.post('/update-profile-photo', updateProfilePhoto);

// Wallets
router.get('/get-wallet', verifyUser, getWallet);
router.post('/update-wallet', verifyUser, updateWallet);

// Return API Key for Paystack Payment
router.get('/get-api-key', verifyUser, (req, res) => {
  return res.status(200).json({ apiKey: process.env.PAYSTACK_KEY });
});

export default router;
