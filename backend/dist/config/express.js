"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var index_routes_1 = __importDefault(require("../routes/index.routes"));
var path = require('path');
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.port = config_1.default.PORT;
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.start = function (callback) {
        var _this = this;
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
        // allow all
        this.app.use((0, cors_1.default)({
            origin: [config_1.default.FRONTEND_URL, 'http://localhost:4200'],
            credentials: true
        }));
        this.app.get('/', function (_req, res) {
            res.send('Express + TypeScript Server');
        });
        this.app.use('/assets', [express_1.default.static(path.join(__dirname, '../../assets'))]);
        this.app.use('/api', [this.setFrameAncestors(), index_routes_1.default]);
        this.app.listen(this.port, function () { return callback(_this.app); });
    };
    Server.prototype.setFrameAncestors = function () {
        return function (_, res, next) {
            res.setHeader("Content-Security-Policy", "frame-ancestors ".concat(config_1.default.FRONTEND_URL));
            res.setHeader("X-Frame-Options", 'sameorigin');
            next();
        };
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=express.js.map