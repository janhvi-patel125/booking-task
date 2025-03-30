"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.verifyEmail = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const verification_1 = __importDefault(require("../models/verification"));
dotenv_1.default.config();
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await user_1.default.findOne({ where: { email } });
    if (user)
        return res.status(400).json({ message: "User already exists" });
    const newUser = await user_1.default.create({ first_name, last_name, email, password_hash: hashedPassword });
    // rangorm 6 digit random otp
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // We can send this otp via email using nodemailer, but currently we are using a static otp for testing purpose
    const otp = "123456";
    const expires_at = new Date(Date.now() + 1000 * 60 * 5);
    // We can send the otp to the user's email.
    await verification_1.default.create({ user_id: newUser.dataValues.id, verification_code: otp, expires_at });
    res.status(201).json({ message: "User created successfully" });
};
exports.registerUser = registerUser;
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    const user = await user_1.default.findOne({ where: { email } });
    if (!user)
        return res.status(400).json({ message: "User not found" });
    if (user.dataValues.is_verified)
        return res.status(400).json({ message: "User already verified" });
    const verification = await verification_1.default.findOne({ where: { user_id: user.dataValues.id } });
    if (!verification)
        return res.status(400).json({ message: "Verification code not found" });
    if (verification.dataValues.verification_code !== otp)
        return res.status(400).json({ message: "Invalid OTP" });
    if (verification.dataValues.expires_at < new Date())
        return res.status(400).json({ message: "OTP expired" });
    // update the user's is_verified to true
    await user_1.default.update({ is_verified: true }, { where: { id: user.dataValues.id } });
    await verification_1.default.destroy({ where: { user_id: user.dataValues.id } });
    res.status(200).json({ message: "Email verified successfully" });
};
exports.verifyEmail = verifyEmail;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await bcryptjs_1.default.compare(password, user.dataValues.password_hash);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        else {
            const response = {
                message: "Login successful",
                user_id: user.dataValues.id,
                email: user.dataValues.emil,
                first_name: user.dataValues.first_name,
                last_name: user.dataValues.last_name,
                is_verified: user.dataValues.is_verified,
            };
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map