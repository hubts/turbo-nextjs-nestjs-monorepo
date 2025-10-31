import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException,
    ServiceUnavailableException,
} from "@nestjs/common";
import { CustomLogger } from "../logger/custom.logger";
import { Request, Response } from "express";
import { AssertionError } from "assert";
import { Prisma } from "@repo/database";
import { asErrorResponse } from "../response/as-error-response";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: CustomLogger) {}

    asHttpException(error: any): HttpException {
        // HTTP Exception
        if (error instanceof HttpException) {
            return error;
        }
        // Prisma Exception
        if (
            error instanceof Prisma.PrismaClientKnownRequestError ||
            error instanceof Prisma.PrismaClientValidationError
        ) {
            const message = error.message.replaceAll("\n", " ");
            return new ServiceUnavailableException(message, { cause: error });
        }
        // Assertion Error
        if (error instanceof AssertionError) {
            return new BadRequestException(error.message, { cause: error });
        }
        // Unknown Error
        return new InternalServerErrorException(error.message, {
            cause: error,
        });
    }

    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        // Convert to HttpException
        const exception = this.asHttpException(error);

        // Request & Response data
        const path = `${req.method} ${req.url}`;
        const token = req.headers.authorization;
        const body = req.body;
        const response = asErrorResponse(
            exception.message,
            exception.cause as object
        );

        // Response data
        const status = exception.getStatus();

        // Return
        res.status(status).json({
            ...response,
            extension: {
                timestamp: new Date().toISOString(),
                request: {
                    path,
                    token,
                    body,
                },
            },
        });
    }
}
