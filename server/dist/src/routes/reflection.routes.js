"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reflection_controller_1 = require("../controllers/reflection.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.post('/finish', reflection_controller_1.reflectionController.submitReflection);
exports.default = router;
//# sourceMappingURL=reflection.routes.js.map