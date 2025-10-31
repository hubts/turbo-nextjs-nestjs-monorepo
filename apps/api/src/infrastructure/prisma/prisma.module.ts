import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { TransactionManager } from "./transaction.manager";

@Global()
@Module({
    providers: [PrismaService, TransactionManager],
    exports: [PrismaService, TransactionManager],
})
export class PrismaModule {}
