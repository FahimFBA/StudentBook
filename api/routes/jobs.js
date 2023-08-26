import express from 'express';
import { createJob } from '../controllers/job.js';

const router = express.Router();

// router.get("/get-all-jobs", getAllJobs);
router.post("/", createJob);

export default router;