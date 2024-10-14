"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    if (err) {
        let statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        let message = err.message || 'Something went wrong';
        let errorSources = [
            {
                path: '',
                message: 'Something went wrong',
            },
        ];
        if (err instanceof zod_1.ZodError) {
            errorSources = (0, handleZodError_1.default)(err);
            message = 'Validation Error';
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        }
        if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
            errorSources = (0, handleValidationError_1.default)(err);
            message = 'Validation Error';
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        }
        if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
            errorSources = (0, handleCastError_1.default)(err);
            message = 'Invalid Id';
            statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        }
        return res.status(statusCode).json({
            success: false,
            message,
            errorSources,
            stack: config_1.default.node_env === 'Development' ? err.stack : null,
        });
    }
    else {
        next();
    }
};
exports.globalErrorHandler = globalErrorHandler;
