"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var recursos_controller_1 = __importDefault(require("../controllers/recursos.controller"));
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.get('/getAllRecursos', [recursos_controller_1.default.getAllRecursos]); //AuthGuard,
exports.default = router;
//# sourceMappingURL=recursos.routes.js.map