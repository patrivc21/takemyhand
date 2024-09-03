import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
    nombre: Joi.string().min(3).required(),
    apellidos: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(9).required(),
    rol: Joi.number().required(),
    username: Joi.string().required(),
    activo: Joi.boolean().default(true),
    rolpaciente: Joi.number(),
    ciudad: Joi.string().optional().allow('').empty('').default(null),
    direccion: Joi.string().optional().allow('').empty('').default(null),
    latitud: Joi.number().optional().allow(null).default(null),
    longitud: Joi.number().optional().allow(null).default(null),
    resultado_formulario: Joi.number().optional().allow(null).default(null),
  });
  
export const UserValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(400).json({ msg: error.details[0].message });
    } else {
        next();
    }
}

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserLoginValidator = (req: any, res: any, next: any) => {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        console.log(error);
        res.json({ cod:400, msg: error.details[0].message });
    } else {
        next();
    }
}
