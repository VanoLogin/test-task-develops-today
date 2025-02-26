import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";

interface PostgresError extends Error {
  code?: string;
}

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const driverError = exception.driverError as PostgresError;
    const status =
      driverError.code === "23505"
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message:
        driverError.code === "23505"
          ? "Duplicate entry: Username or email already exists"
          : driverError.code === "23503"
            ? "Foreign key constraint violated"
            : "Database error",
      error: exception.message,
    });
  }
}
