import { Router } from 'express';
import verifyUser from '../middleware/verifyUser';
import createNewJob from '../controllers/jobs/createNewJob';
import getAllJobsByUser from '../controllers/jobs/getAllJobsByUser';
import getSingleJobData from '../controllers/jobs/getSingleJobData';

const router = Router();

router.post('/create-new-job', verifyUser, createNewJob);
router.get('/all-by-user', verifyUser, getAllJobsByUser);
router.post('/job-data', verifyUser, getSingleJobData);

// Export Router
export default router;
