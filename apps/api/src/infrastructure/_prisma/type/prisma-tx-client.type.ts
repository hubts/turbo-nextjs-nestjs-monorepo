import { PrismaClient } from "@repo/database";

export type PrismaTxClient = Parameters<
    Parameters<PrismaClient["$transaction"]>[0]
>[0];
