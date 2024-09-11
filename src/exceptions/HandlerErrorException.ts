import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

const INTERNAL_ERROR = "Internal server error"

@Catch(MongoError)
export class ErrorHandlerException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception?.code === 11000) {
      const duplicateKeyField = Object.values(exception.keyValue)
      if (duplicateKeyField) {
        const errorMessage = `El campo ${duplicateKeyField} ya se encuentra en al base de datos. Utiliza uno distinto`;
        response
          .status(HttpStatus.CONFLICT)
          .json({
            statusCode: HttpStatus.CONFLICT,
            message: errorMessage,
          });
        return
      }
    }
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: INTERNAL_ERROR,
      });

  }
}