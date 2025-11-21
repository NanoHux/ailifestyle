"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tracking_controller_1 = require("../controllers/tracking.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.patch('/plan-block/:id', tracking_controller_1.trackingController.updateBlockStatus);
exports.default = router;
//# sourceMappingURL=tracking.routes.js.map