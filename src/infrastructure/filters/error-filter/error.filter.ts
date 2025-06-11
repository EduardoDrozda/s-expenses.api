import { IBaseResponse } from '@infrastructure/interfaces';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilterFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : (exception as any).status || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: IBaseResponse = {
      error: true,
      message: exception.message || 'Internal server error',
      result: null,
      statusCode: status,
      timestamp: new Date().toISOString(),
    }

    response.status(status).json(errorResponse);
  }
}
