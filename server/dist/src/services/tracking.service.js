"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingService = exports.TrackingService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class TrackingService {
    async updateBlockStatus(blockId, userId, status) {
        // Verify ownership via DayPlan
        const block = await prisma_1.default.planBlock.findUnique({
            where: { id: blockId },
            include: { dayPlan: true }
        });
        if (!block || block.dayPlan.userId !== userId) {
            throw new Error('Block not found or access denied');
        }
        const updatedBlock = await prisma_1.default.planBlock.update({
            where: { id: blockId },
            data: { status }
        });
        return updatedBlock;
    }
}
exports.TrackingService = TrackingService;
exports.trackingService = new TrackingService();
//# sourceMappingURL=tracking.service.js.map