import express from 'express';
import { 
  markCourseComplete, 
  markCertificateGenerated, 
  getCompletedCourses,
  checkCourseCompletion 
} from '../controllers/completionController.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

// Mark course as completed
router.post('/complete', isAuth, markCourseComplete);

// Mark certificate as generated
router.post('/certificate-generated', isAuth, markCertificateGenerated);

// Get user's completed courses
router.get('/completed-courses', isAuth, getCompletedCourses);

// Check if specific course is completed
router.get('/check/:courseId', isAuth, checkCourseCompletion);

export default router;