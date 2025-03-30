"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidations = void 0;
const zod_1 = require("zod");
const createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().optional(),
        image_attachments: zod_1.z.array(zod_1.z.string()).optional(),
        type: zod_1.z.string().optional(),
        category: zod_1.z.string(),
        status: zod_1.z.enum(["active", "blocked"]).optional()
    }),
});
const updatePostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().optional(),
        image_attachments: zod_1.z.array(zod_1.z.string()).optional().optional(),
        type: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        status: zod_1.z.enum(["active", "blocked"]).optional()
    }),
});
exports.PostValidations = {
    createPostValidationSchema,
    updatePostValidationSchema,
};
