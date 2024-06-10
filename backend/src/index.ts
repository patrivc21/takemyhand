import 'reflect-metadata'
import Server from './config/express';
import config from './config/config';
import { initOrm } from './config/typeorm';
import express from 'express';
import usuariosRoutes from './routes/usuarios.routes';

const server: Server = new Server();
const app = express();

server.start(async () => {
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
    await initOrm();
});