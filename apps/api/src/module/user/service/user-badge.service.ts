import { Injectable } from "@nestjs/common";
import { Badge, UserBadge } from "@repo/database";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";
import { UnitService } from "../../unit/unit.service";
import { BadgeTitle } from "../domain/badge-title";
import { validateBadge } from "../domain/validate-badge";

@Injectable()
export class UserBadgeService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly unitService: UnitService
    ) {}

    // 유저의 메인 뱃지 조회
    async getMainBadge(userId: string): Promise<Badge | null> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.mainBadgeId) {
            return null;
        }
        return await this.prisma.badge.findUnique({
            where: {
                id: user.mainBadgeId,
            },
        });
    }

    // 유저 메인 뱃지 설정/해제
    async setMainBadge(userId: string, badgeId: string | null): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                mainBadgeId: badgeId,
            },
        });
    }

    // 모든 뱃지 목록 조회
    async getBadges(): Promise<Badge[]> {
        return await this.prisma.badge.findMany({
            orderBy: {
                order: "asc",
            },
        });
    }

    // 유저가 소유한 뱃지 관계를 조회
    async getUserBadgesByUserId(userId: string): Promise<UserBadge[]> {
        return await this.prisma.userBadge.findMany({
            where: {
                userId: userId,
            },
        });
    }

    // 모든 뱃지에 대한 유저의 소유를 조회
    async getBadgeWithUserBadge(userId: string): Promise<
        {
            badge: Badge;
            userBadge: UserBadge | null;
        }[]
    > {
        const badges = await this.getBadges();
        const userBadges = await this.getUserBadgesByUserId(userId);
        return badges.map(badge => {
            const userBadge = userBadges.find(
                userBadge => userBadge.badgeId === badge.id
            );
            return {
                badge,
                userBadge: userBadge ?? null,
            };
        });
    }

    // 유저의 뱃지를 갱신(최신화)
    async validateUserBadges(userId: string): Promise<void> {
        const user = await this.prisma.user.findUnique({
            select: {
                id: true,
                mainBadgeId: true,
            },
            where: {
                id: userId,
            },
        });
        if (!user) return;

        const clears = await this.prisma.clear.findMany({
            select: {
                unitIds: true,
                lineCount: true,
                unitScore: true,
                count: true,
            },
            where: {
                userId,
            },
            orderBy: {
                count: "desc",
            },
        });
        if (!clears.length) return;

        const units = await this.unitService.getUnits();
        const badgeAndUserBadges = await this.getBadgeWithUserBadge(userId);
        badgeAndUserBadges.forEach(async ({ badge, userBadge }) => {
            const isValidated = validateBadge(
                units,
                clears,
                badge.title as BadgeTitle
            );
            if (isValidated && !userBadge) {
                await this.prisma.userBadge.create({
                    data: {
                        badgeId: badge.id,
                        userId: user.id,
                    },
                });
            } else if (!isValidated && userBadge) {
                await this.prisma.userBadge.delete({
                    where: {
                        userId_badgeId: {
                            badgeId: badge.id,
                            userId: user.id,
                        },
                    },
                });
                // 유저 메인 뱃지 또한 회수
                if (user.mainBadgeId === badge.id) {
                    await this.prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            mainBadgeId: null,
                        },
                    });
                }
            }
        });
    }
}
