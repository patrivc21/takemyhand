"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chatprivado_controller_1 = __importDefault(require("../controllers/chatprivado.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addChatPrivado', auth_guard_1.AuthGuard, [chatprivado_controller_1.default.addChatPrivado]);
router.post('/getOneChatPrivado', auth_guard_1.AuthGuard, [chatprivado_controller_1.default.getOneChatPrivado]);
router.post('/buscador', auth_guard_1.AuthGuard, [chatprivado_controller_1.default.buscadorC]);
exports.default = router;
//# sourceMappingURL=chatprivado.routes.js.map