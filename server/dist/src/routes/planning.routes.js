"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planning_controller_1 = require("../controllers/planning.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/day-plan', planning_controller_1.planningController.getDayPlan);
exports.default = router;
//# sourceMappingURL=planning.routes.js.map