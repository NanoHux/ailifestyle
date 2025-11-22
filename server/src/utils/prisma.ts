import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ensure connections are released when the process exits (useful during dev reloads)
const cleanup = async (exitCode = 0) => {
  try {
    await prisma.$disconnect();
  } finally {
    if (exitCode !== undefined) {
      // Avoid terminating a process that is already exiting due to an error without exit code
      process.exit(exitCode);
    }
  }
};

process.on('beforeExit', () => { void prisma.$disconnect(); });
process.on('SIGINT', () => { void cleanup(0); });
process.on('SIGTERM', () => { void cleanup(0); });
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception, disconnecting Prisma:', err);
  void cleanup(1);
});

export default prisma;
