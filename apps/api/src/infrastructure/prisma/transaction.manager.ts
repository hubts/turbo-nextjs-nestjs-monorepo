import {
    HttpException,
    Injectable,
    ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Prisma } from "@repo/database";

@Injectable()
export class TransactionManager {
    constructor(private readonly prisma: PrismaService) {}

    handlePrismaError(e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ServiceUnavailableException(
                `Transaction failed: [${e.code}] ${e.message}`,
                {
                    cause: e,
                }
            );
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            throw new ServiceUnavailableException(
                `Transaction failed: ${e.message}`,
                {
                    cause: e,
                }
            );
        }
        throw new ServiceUnavailableException(
            `Unknown error in transaction: ${e}`,
            {
                cause: e,
            }
        );
    }

    async transaction<R>(callback: () => Promise<R>): Promise<R> {
        return await this.prisma.$transaction(
            async tx => {
                try {
                    this.prisma.beginTransaction(tx);
                    return await callback();
                } catch (e) {
                    this.handlePrismaError(e);
                    throw e;
                } finally {
                    this.prisma.endTransaction();
                }
            },
            {
                timeout: 30000,
            }
        );
    }
}
