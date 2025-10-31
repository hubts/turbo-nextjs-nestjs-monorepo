import { Injectable } from "@nestjs/common";
import { ConsoleLog, Prisma } from "@repo/database";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class CustomLoggerRepository {
    constructor(private prisma: PrismaService) {}

    async save(data: Prisma.ConsoleLogCreateInput): Promise<ConsoleLog> {
        return await this.prisma.consoleLog.create({
            data,
        });
    }
}
