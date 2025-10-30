import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
        // 연결 풀링 최적화 설정
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });

// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prisma = prisma;
// } else {
// 프로덕션에서는 연결 종료 시 정리
process.on("beforeExit", async () => {
    await prisma.$disconnect();
});
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
// }
