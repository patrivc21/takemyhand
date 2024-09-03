import bcrypt from 'bcrypt'
import { Usuarios } from '../entities/Usuarios';
import jwt from 'jsonwebtoken'
import configEnv from '../config/config';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export const generateToken = (user: Usuarios, duration: `${number}h` = "8h"): string => {
    return jwt.sign({ user }, configEnv.SECRET_KEY, { expiresIn: duration });
}

export const validateToken = (token: string): any => {
    let decode;
    try {
        decode = jwt.verify(token, configEnv.SECRET_KEY);
    }
    catch (e) {
        return false;
    }
    return decode;
}

export const decodeToken = (token: string): any => {
    let decode;
    try {
        decode = jwt.decode(token, configEnv.SECRET_KEY);
    }
    catch (e) {
        return null;
    }
    return decode;
}


export default {
    hashPassword,
    validatePassword,
    generateToken,
    validateToken,
    decodeToken
}