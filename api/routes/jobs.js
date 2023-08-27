import express from 'express';
import { createJob, getAllJobs, deleteOneJob } from '../controllers/job.js';

const router = express.Router();

router.get("/get-all-jobs", getAllJobs);
router.post("/", createJob);
router.delete("/:id", deleteOneJob);

export default router;