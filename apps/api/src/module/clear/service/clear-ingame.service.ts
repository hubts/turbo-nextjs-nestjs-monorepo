import { Injectable } from "@nestjs/common";
import { Navigation } from "@repo/database";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";

@Injectable()
export class ClearIngameService {
    constructor(private readonly prisma: PrismaService) {}

    // 항법지침 목록 조회
    async getNavigationList(): Promise<Navigation[]> {
        return await this.prisma.navigation.findMany();
    }
}
