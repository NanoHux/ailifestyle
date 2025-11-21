"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planningController = exports.PlanningController = void 0;
const planning_service_1 = require("../services/planning.service");
class PlanningController {
    async getDayPlan(req, res) {
        if (!req.user)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const { date } = req.query;
            if (!date || typeof date !== 'string') {
                return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
            }
            const plan = await planning_service_1.planningService.getDayPlan(req.user.id, date);
            res.json(plan);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch day plan' });
        }
    }
}
exports.PlanningController = PlanningController;
exports.planningController = new PlanningController();
//# sourceMappingURL=planning.controller.js.map