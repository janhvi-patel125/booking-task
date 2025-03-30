// index route
import express from "express";
import authRoutes from "./authRoutes";
import bookingRoutes from "./bookingRoute";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/booking", bookingRoutes);
export default router;

