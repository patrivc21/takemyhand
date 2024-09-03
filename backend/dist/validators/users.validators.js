"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginValidator = exports.UserValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var userSchema = joi_1.default.object({
    nombre: joi_1.default.string().min(3).required(),
    apellidos: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(9).required(),
    rol: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    activo: joi_1.default.boolean().default(true),
    rolpaciente: joi_1.default.number(),
    ciudad: joi_1.default.string().optional().allow('').empty('').default(null),
    direccion: joi_1.default.string().optional().allow('').empty('').default(null),
    latitud: joi_1.default.number().optional().allow(null).default(null),
    longitud: joi_1.default.number().optional().allow(null).default(null),
    resultado_formulario: joi_1.default.number().optional().allow(null).default(null),
});
var UserValidator = function (req, res, next) {
    var error = userSchema.validate(req.body).error;
    if (error) {
        console.log(error);
        res.status(400).json({ msg: error.details[0].message });
    }
    else {
        next();
    }
};
exports.UserValidator = UserValidator;
var userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
var UserLoginValidator = function (req, res, next) {
    var error = userLoginSchema.validate(req.body).error;
    if (error) {
        console.log(error);
        res.json({ cod: 400, msg: error.details[0].message });
    }
    else {
        next();
    }
};
exports.UserLoginValidator = UserLoginValidator;
//# sourceMappingURL=users.validators.js.map