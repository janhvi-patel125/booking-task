"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Apply validation middleware to signup route
router.post("/signup", async (req, res) => {
    await (0, authController_1.registerUser)(req, res);
});
router.post("/login", async (req, res) => {
    await (0, authController_1.loginUser)(req, res);
});
router.post("/verify-email", async (req, res) => {
    await (0, authController_1.verifyEmail)(req, res);
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map