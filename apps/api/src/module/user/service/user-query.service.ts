import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";
import { UserAndBadge } from "@repo/shared";

@Injectable()
export class UserQueryService {
    constructor(private readonly prisma: PrismaService) {}

    // USER: 모든 유저를 조회
    async getUserAndBadges(): Promise<UserAndBadge[]> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                mainBadgeId: true,
                nickname: true,
                color: true,
            },
            orderBy: {
                order: "asc",
            },
        });
        return users.map(user => ({
            userId: user.id,
            mainBadgeId: user.mainBadgeId,
            nickname: user.nickname,
            color: user.color,
        }));
    }
}
