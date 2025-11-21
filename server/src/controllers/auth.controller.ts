import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../utils/prisma';
import { authService } from '../services/auth.service';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthController {
  async login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const { email, password } = parsed.data;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!user || !user.passwordHash) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.profile?.displayName,
          ...user.profile
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMe(req: Request, res: Response) {
      if (!req.user) {
          return res.status(401).json({ error: 'Not authenticated' });
      }
      
      const user = await prisma.user.findUnique({
          where: { id: req.user.id },
          include: { profile: true }
      });

      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json({
          id: user.id,
          email: user.email,
          name: user.profile?.displayName,
          ...user.profile
      });
  }

  async updateProfile(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const updatedProfile = await authService.updateProfile(req.user.id, req.body);
      res.json(updatedProfile);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
}

export const authController = new AuthController();
