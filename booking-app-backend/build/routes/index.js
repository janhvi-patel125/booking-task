"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index route
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const bookingRoute_1 = __importDefault(require("./bookingRoute"));
const router = express_1.default.Router();
router.use("/auth", authRoutes_1.default);
router.use("/booking", bookingRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map