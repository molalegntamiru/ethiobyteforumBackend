import express from "express";
import {
  displayUser,
  login,
  registeruser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/display", displayUser);
router.post("/register", registeruser);
router.post("/login", login);
export default router;
