"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chatprivado_controller_1 = __importDefault(require("../controllers/chatprivado.controller"));
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addChatPrivado', [chatprivado_controller_1.default.addChatPrivado]); //AuthGuard,
router.post('/getOneChatPrivado', [chatprivado_controller_1.default.getOneChatPrivado]);
exports.default = router;
//# sourceMappingURL=chatprivado.routes.js.map