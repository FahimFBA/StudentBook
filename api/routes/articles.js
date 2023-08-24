import express from "express";
import { createArticle } from "../controllers/article.js";


const router = express.Router()


// router.get("/", getPosts)
router.post("/", createArticle)
// router.delete("/:id", deletePost)

export default router;