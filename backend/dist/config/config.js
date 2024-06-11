"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var Joi = require("joi");
var config = dotenv_1.default.config({ path: ".env" });
if (config.error) {
    throw new Error(config.error.message);
}
var envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    SECRET_KEY: Joi.string().required(),
}).unknown().required();
var _a = envSchema.validate(process.env), error = _a.error, value = _a.value;
if (error) {
    throw new Error("Config validation error: ".concat(error.message));
}
var configEnv = {
    ENV: value.NODE_ENV,
    PORT: value.PORT,
    db: {
        host: value.DB_HOST,
        port: value.DB_PORT,
        user: value.DB_USER,
        password: value.DB_PASSWORD,
    },
    FRONTEND_URL: value.FRONTEND_URL,
    SECRET_KEY: value.SECRET_KEY,
};
exports.default = configEnv;
//# sourceMappingURL=config.js.map