import dotenv from "dotenv";

const Joi = require("joi");

const config = dotenv.config({ path: ".env" });

if (config.error) {
    throw new Error(config.error.message);
}

const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    SECRET_KEY: Joi.string().required(),
}).unknown().required();

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const configEnv = {
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

export default configEnv;

