"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingController = exports.TrackingController = void 0;
const tracking_service_1 = require("../services/tracking.service");
class TrackingController {
    async updateBlockStatus(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const blockId = parseInt(req.params.id || '');
            const { status } = req.body;
            if (isNaN(blockId) || !status) {
                return res.status(400).json({ error: 'Invalid block ID or status' });
            }
            const updatedBlock = await tracking_service_1.trackingService.updateBlockStatus(blockId, req.user.id, status);
            res.json(updatedBlock);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update block status' });
        }
    }
}
exports.TrackingController = TrackingController;
exports.trackingController = new TrackingController();
//# sourceMappingURL=tracking.controller.js.map