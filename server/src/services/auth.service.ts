import prisma from '../utils/prisma';

export class AuthService {
  async updateProfile(userId: number, data: {
    displayName?: string;
    timezone?: string;
    pacePreference?: string;
    stylePreference?: string;
  }) {
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  }
}

export const authService = new AuthService();