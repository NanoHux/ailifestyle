"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/sessions', chat_controller_1.chatController.getSessions);
router.post('/sessions', chat_controller_1.chatController.createSession);
router.get('/sessions/:id/messages', chat_controller_1.chatController.getMessages);
router.post('/send', chat_controller_1.chatController.sendMessage);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map