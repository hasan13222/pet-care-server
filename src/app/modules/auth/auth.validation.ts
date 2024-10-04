import { z } from 'zod';

const changePasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string(),
  }),
});

export const AuthValidations = {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
