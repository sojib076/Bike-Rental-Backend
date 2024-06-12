/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../error/AppError';
import handleCastError from '../error/handleCastError';
import handleValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';
import { TErrorSources } from '../Interface/Error';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSource;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }


  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

