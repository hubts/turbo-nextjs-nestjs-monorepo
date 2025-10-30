import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import { readdirSync, renameSync, statSync } from "fs";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async createVersion(version: string) {
        const existingPatch = await this.prisma.patch.findUnique({
            where: {
                version,
            },
        });
        if (existingPatch) {
            throw new BadRequestException("이미 존재하는 버전입니다.");
        }

        await this.prisma.patch.create({
            data: {
                version,
            },
        });
    }

    async getVersion() {
        const patch = await this.prisma.patch.findFirst({
            orderBy: [{ version: "desc" }],
        });
        if (!patch) {
            return "?";
        }
        return patch.version;
    }
}
