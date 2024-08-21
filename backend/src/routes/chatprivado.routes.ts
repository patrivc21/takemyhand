import express from 'express';
import chatController from '../controllers/chatprivado.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addChatPrivado', [chatController.addChatPrivado]); //AuthGuard,
router.post('/getOneChatPrivado', [chatController.getOneChatPrivado]);

export default router;