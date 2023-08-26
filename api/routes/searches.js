import express from "express";
import { searchByUserName } from "../controllers/search.js";



const router = express.Router()

router.get("/:search", searchByUserName)

export default router;