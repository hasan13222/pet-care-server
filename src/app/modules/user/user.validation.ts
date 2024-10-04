import { z } from 'zod';
import { USER_ROLE } from './user.contsts';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile_picture: z.string().optional(),
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).optional(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile_picture: z.string().optional()
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema,
};
