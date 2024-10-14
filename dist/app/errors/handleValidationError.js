"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorMessages = Object.values(err.errors).map((item) => {
        return {
            path: item === null || item === void 0 ? void 0 : item.path,
            message: item === null || item === void 0 ? void 0 : item.message,
        };
    });
    return errorMessages;
};
exports.default = handleValidationError;
