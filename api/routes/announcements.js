import express from "express";
import {createAnnouncement, getAllAnnouncements, deleteOneAnnouncement} from "../controllers/announcement.js";

const router = express.Router()


router.get("/get-all-announcements", getAllAnnouncements)
router.post("/", createAnnouncement)
router.delete("/:id", deleteOneAnnouncement)


export default router;