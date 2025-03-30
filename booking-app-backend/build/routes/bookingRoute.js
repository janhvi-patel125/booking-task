"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const router = express_1.default.Router();
// Apply validation middleware to signup route
router.post("/create-booking", async (req, res) => {
    await (0, bookingController_1.booking)(req, res);
});
exports.default = router;
//# sourceMappingURL=bookingRoute.js.map