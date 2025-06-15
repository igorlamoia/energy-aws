import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let errors = {};

    // Handle Zod validation errors
    if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST;
      errors = exception.issues.reduce((acc, issue) => {
        const { code, message } = issue;
        const path = issue.path.join('.') || 'root';
        if (!acc[path]) acc[path] = [];
        acc[path].push({ code, message });
        return acc;
      }, {});

      message = 'Validation failed';
    }
    // Handle HttpExceptions like BadRequestException, NotFoundException, etc.
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message;
    }

    // Handle any other thrown errors
    else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
