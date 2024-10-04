import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error.interface';

const handleZodError = (error: ZodError): TErrorSource => {
  const errorMessages: TErrorSource = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return errorMessages;
};

export default handleZodError;
