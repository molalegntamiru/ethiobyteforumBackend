import express from "express";
import {
  displayQuestion,
  registerQuestion,
} from "../controllers/questionController.js";
const router = express.Router();
router.get("/display", displayQuestion);
router.post("/register", registerQuestion);
export default router;
