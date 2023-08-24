import express from "express";
import { createArticle, getAllArticles } from "../controllers/article.js";


const router = express.Router()


router.get("/get-all-articles", getAllArticles)
router.post("/", createArticle)
// router.delete("/:id", deletePost)

export default router;