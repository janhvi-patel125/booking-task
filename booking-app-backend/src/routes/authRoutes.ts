import express from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/authController";
const router = express.Router();

router.post("/signup", async (req, res) => {
    await registerUser(req, res);
});
router.post("/login", async (req, res) => {
    await loginUser(req, res);
});
router.post("/verify-email", async (req, res) => {
    await verifyEmail(req, res);
});

export default router;
