"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'demo@example.com';
    const password = process.env.DEMO_PASSWORD || 'password123';
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                profile: {
                    create: {
                        displayName: 'Demo User',
                        timezone: 'Asia/Shanghai',
                        pacePreference: 'medium',
                        stylePreference: 'coach',
                    },
                },
            },
        });
        console.log('Created demo user:', user);
    }
    else {
        // Ensure the demo user has a usable password
        if (!existingUser.passwordHash || existingUser.passwordHash === 'mock_hash') {
            await prisma.user.update({
                where: { email },
                data: { passwordHash },
            });
            console.log('Updated demo user password to default.');
        }
        console.log('Demo user already exists');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map