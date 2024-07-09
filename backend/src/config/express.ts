import config from "./config";
import express, { Request, Response } from "express";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import indexRoutes from "../routes/index.routes";
const path = require('path');

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public start(callback: (app: express.Application) => void) {


        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(compress());
        this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
        // allow all
        this.app.use(cors({
            origin: [config.FRONTEND_URL, 'http://localhost:4200'],
            credentials: true
        }));

        this.app.get('/', (_req: Request, res: Response) => {
            res.send('Express + TypeScript Server');
        });

        this.app.use('/assets', [ express.static(path.join(__dirname, '../../assets'))]);
        this.app.use('/api', [indexRoutes]);
        this.app.listen(this.port, () => callback(this.app));
    }

    private setFrameAncestors() {
        return (_: Request, res: Response, next: any) => {
            res.setHeader("Content-Security-Policy", `frame-ancestors ${config.FRONTEND_URL}`);
            res.setHeader("X-Frame-Options", 'sameorigin');
            next();
        }
    }
}