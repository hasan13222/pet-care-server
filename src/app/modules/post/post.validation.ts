import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    description: z.string().optional(),
    image_attachments: z.array(z.string()).optional(),
    type: z.string().optional(),
    category: z.string(),
    status: z.enum(["active", "blocked"]).optional()
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    image_attachments: z.array(z.string()).optional().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    status: z.enum(["active", "blocked"]).optional()
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
