export declare class AuthService {
    updateProfile(userId: number, data: {
        displayName?: string;
        timezone?: string;
        pacePreference?: string;
        stylePreference?: string;
    }): Promise<{
        id: number;
        userId: number;
        displayName: string | null;
        timezone: string | null;
        wakeTime: Date | null;
        sleepTime: Date | null;
        workStartTime: Date | null;
        workEndTime: Date | null;
        pacePreference: string | null;
        stylePreference: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map