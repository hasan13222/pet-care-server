"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAuthResponse = exports.sendResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse = (res, data) => {
    data.status = data.status || http_status_codes_1.StatusCodes.OK;
    data.success = data.success || true;
    data.message = data.message || 'Your operation is successful';
    if (data.data === null) {
        data.message = 'Data not Found';
    }
    if (Array.isArray(data.data) && data.data.length === 0) {
        data.message = 'Data not Found';
    }
    return res.status(data.status).json({
        success: data.success,
        statusCode: data.status,
        message: data.message,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
const sendAuthResponse = (res, data) => {
    data.status = data.status || http_status_codes_1.StatusCodes.OK;
    data.success = data.success || true;
    data.message = data.message || 'Your operation is successful';
    return res.status(data.status).json({
        success: data.success,
        statusCode: data.status,
        message: data.message,
        token: data.token,
        data: data.data
    });
};
exports.sendAuthResponse = sendAuthResponse;
