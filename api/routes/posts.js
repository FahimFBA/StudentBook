import express from "express";
import { getPosts, addPost } from "../controllers/post.js";

const router = express.Router()


router.get("/", getPosts)
router.post("/", addPost)

export default router;