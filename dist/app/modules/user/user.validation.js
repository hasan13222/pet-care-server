"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_contsts_1 = require("./user.contsts");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profile_picture: zod_1.z.string().optional(),
        role: zod_1.z.enum(Object.values(user_contsts_1.USER_ROLE)).optional(),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profile_picture: zod_1.z.string().optional()
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    loginUserValidationSchema,
    updateUserValidationSchema,
};
