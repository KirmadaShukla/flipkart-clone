"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jwt_1 = require("./jwt");
const sendToken = (user, statusCode, res) => {
    const token = (0, jwt_1.generateToken)(user);
    const options = {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE || '7') * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };
    const userObject = user.toObject();
    delete userObject.password;
    return res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        data: {
            user: userObject
        }
    });
};
exports.sendToken = sendToken;
//# sourceMappingURL=sendToken.js.map