"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const auth_service_1 = require("../services/auth.service");
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
class AuthController {
    async login(req, res) {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const { email, password } = parsed.data;
        try {
            const user = await prisma_1.default.user.findUnique({
                where: { email },
                include: { profile: true },
            });
            if (!user || !user.passwordHash) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.profile?.displayName,
                    ...user.profile
                },
                token
            });
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getMe(req, res) {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user.id },
            include: { profile: true }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({
            id: user.id,
            email: user.email,
            name: user.profile?.displayName,
            ...user.profile
        });
    }
    async updateProfile(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const updatedProfile = await auth_service_1.authService.updateProfile(req.user.id, req.body);
            res.json(updatedProfile);
        }
        catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map