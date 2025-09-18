"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    sendSuccess(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }
    sendError(res, message = 'Internal Server Error', statusCode = 500, error = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map