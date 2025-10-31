import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Logger,
} from "@nestjs/common";
import { PrismaTxClient } from "./prisma.type";
import { PrismaClient } from "@repo/database";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(PrismaService.name);
    private tx: PrismaTxClient | null = null;

    constructor() {
        super({
            // log: ["query", "info", "warn", "error"],
            errorFormat: "minimal",
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log("Successfully connected to the database");
        } catch (error) {
            this.logger.error(
                `Failed to connect to the database: ${(error as Error).message}`
            );
            // Don't throw the error to allow the application to start even if DB is not available
            // This is useful for development but you might want to handle this differently in production
            if (process.env.ENV === "production") {
                throw error;
            }
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    beginTransaction(tx: PrismaTxClient) {
        this.tx = tx;
    }

    endTransaction() {
        this.tx = null; // null로 설정하여 기본 클라이언트 사용
    }

    getTransaction(): PrismaTxClient | this {
        return this.tx ?? this; // 트랜잭션이 없으면 기본 클라이언트(this) 반환
    }
}
