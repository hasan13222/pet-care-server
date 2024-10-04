import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    description: z.string(),
    image_attachments: z.array(z.string()).optional(),
    type: z.string().optional(),
    category: z.string(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    image_attachments: z.array(z.string()).optional().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
