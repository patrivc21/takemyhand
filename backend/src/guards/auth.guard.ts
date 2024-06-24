import { Request, Response, NextFunction } from 'express';
import { validateToken, decodeToken} from '../helpers/auth.helper';

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    console.log(req.headers)
    if (token) {
        token = token.replace('Bearer ', '').trim();
        if (validateToken(token)) {
            const user_token = decodeToken(token);
            res.locals.user = user_token.user;
            next();
        }
        else {
            return res.json({ cod: 401, msg: "Invalid token" });
        }
    } else
        return res.json({ cod: 401, msg: "No token provided" });
};

export const AdminGuard = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.replace('Bearer ', '').trim();
        if (validateToken(token)) {
            const user = decodeToken(token);
            console.log('aquiii',user)
            if (user.role === 'admin')
                next();
            else
                res.json({ cod: 401, msg: "You are not authorized" });
        } else {
            res.json({ cod: 401, msg: "Invalid token" });
        }
    } else
        res.json({ cod: 401, msg: "No token provided" });
}