"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
const planning_routes_1 = __importDefault(require("./planning.routes"));
const tracking_routes_1 = __importDefault(require("./tracking.routes"));
const reflection_routes_1 = __importDefault(require("./reflection.routes"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'API Root' });
});
router.use('/auth', auth_routes_1.default);
router.use('/chat', chat_routes_1.default);
router.use('/planning', planning_routes_1.default);
router.use('/tracking', tracking_routes_1.default);
router.use('/reflection', reflection_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map