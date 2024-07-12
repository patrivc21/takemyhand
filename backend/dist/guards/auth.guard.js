"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = exports.AuthGuard = void 0;
var auth_helper_1 = require("../helpers/auth.helper");
var AuthGuard = function (req, res, next) {
    var token = req.headers['authorization'];
    // console.log(req.headers)
    if (token) {
        token = token.replace('Bearer ', '').trim();
        if ((0, auth_helper_1.validateToken)(token)) {
            var user_token = (0, auth_helper_1.decodeToken)(token);
            res.locals.user = user_token.user;
            next();
        }
        else {
            return res.json({ cod: 401, msg: "Invalid token" });
        }
    }
    else
        return res.json({ cod: 401, msg: "No token provided" });
};
exports.AuthGuard = AuthGuard;
var AdminGuard = function (req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        token = token.replace('Bearer ', '').trim();
        if ((0, auth_helper_1.validateToken)(token)) {
            var user = (0, auth_helper_1.decodeToken)(token);
            if (user.role === 'admin')
                next();
            else
                res.json({ cod: 401, msg: "You are not authorized" });
        }
        else {
            res.json({ cod: 401, msg: "Invalid token" });
        }
    }
    else
        res.json({ cod: 401, msg: "No token provided" });
};
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=auth.guard.js.map