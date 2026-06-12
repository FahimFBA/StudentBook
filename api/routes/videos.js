import express from "express";
import { createVideo, deleteOneVideo, getAllVideos } from "../controllers/video.js";

const router = express.Router();

router.get("/get-all-videos", getAllVideos);
router.post("/", createVideo);
router.delete("/:id", deleteOneVideo);

export default router;
