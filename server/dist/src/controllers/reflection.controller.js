"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionController = exports.ReflectionController = void 0;
const reflection_service_1 = require("../services/reflection.service");
class ReflectionController {
    async submitReflection(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const { date, selfRating, userNotes } = req.body;
            if (!date || typeof selfRating !== 'number') {
                return res.status(400).json({ error: 'Date and selfRating are required' });
            }
            const result = await reflection_service_1.reflectionService.submitReflection(req.user.id, date, {
                selfRating,
                userNotes: userNotes || ''
            });
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to submit reflection' });
        }
    }
}
exports.ReflectionController = ReflectionController;
exports.reflectionController = new ReflectionController();
//# sourceMappingURL=reflection.controller.js.map