import express from "express";
import { booking } from "../controllers/bookingController";
const router = express.Router();

router.post("/create-booking", async (req, res) => {
    await booking(req, res);
});

export default router;
