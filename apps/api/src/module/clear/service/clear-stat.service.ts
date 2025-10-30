import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";
import { getTopUnitFrequencyByGrade } from "../domain/get-top-unit-frequency-by-grade";
import { getClearTypeCount } from "../domain/get-clear-type-count";
import { Clear, Prisma } from "@repo/database";
import { TopUnitGrades } from "@repo/shared";

@Injectable()
export class ClearStatService {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * 상위유닛별 빈도 순위(DESC)
     */
    async getUnitFrequencyRanking(): Promise<
        {
            unitName: string;
            unitGrade: string;
            totalCount: number;
            users: {
                userId: string;
                count: number;
            }[];
        }[]
    > {
        const allUnits = await this.prisma.unit.findMany({
            where: {
                grade: {
                    in: TopUnitGrades,
                },
            },
            select: {
                id: true,
                name: true,
                grade: true,
            },
        });
        const unitRanking = allUnits.map(
            (
                unit
            ): {
                unitId: string;
                unitName: string;
                unitGrade: string;
                totalCount: number;
                users: {
                    userId: string;
                    count: number;
                }[];
            } => {
                return {
                    unitId: unit.id,
                    unitName: unit.name,
                    unitGrade: unit.grade,
                    totalCount: 0,
                    users: [],
                };
            }
        );

        const allClears = await this.prisma.clear.findMany({
            select: {
                userId: true,
                unitIds: true,
            },
            orderBy: {
                User: {
                    order: "asc",
                },
            },
        });
        allClears.forEach(clear => {
            const userId = clear.userId;
            const unitIds = clear.unitIds;
            unitIds.forEach(unitId => {
                const unit = unitRanking.find(unit => unit.unitId === unitId);
                if (unit) {
                    const user = unit.users.find(
                        user => user.userId === userId
                    );
                    if (user) {
                        user.count++;
                    } else {
                        unit.users.push({
                            userId,
                            count: 1,
                        });
                    }
                    unit.totalCount++;
                }
            });
        });
        unitRanking.sort((a, b) => b.totalCount - a.totalCount);
        return unitRanking.map(u => ({
            unitName: u.unitName,
            unitGrade: u.unitGrade,
            totalCount: u.totalCount,
            users: u.users.map(user => ({
                userId: user.userId,
                count: user.count,
            })),
        }));
    }

    /**
     * 물딜/마딜 빈도
     */
    async getClearTypeStat(): Promise<{
        physical: number;
        magical: number;
    }> {
        const allClears = await this.prisma.clear.findMany({
            select: {
                type: true,
            },
        });
        return getClearTypeCount(allClears);
    }

    /**
     * 상위유닛 등급별 제작 빈도
     */
    async getUnitFrequencyByGrade(userId?: string): Promise<
        {
            grade: string;
            count: number;
        }[]
    > {
        const allClears = await this.prisma.clear.findMany({
            select: { unitIds: true },
            ...(userId && { where: { userId } }),
        });
        const topUnits = await this.prisma.unit.findMany({
            where: {
                grade: {
                    in: TopUnitGrades,
                },
            },
            select: {
                id: true,
                grade: true,
            },
        });
        return getTopUnitFrequencyByGrade(allClears, topUnits);
    }

    /**
     * 클리어 목록 조회
     */
    async getClears(query: {
        skip: number;
        take: number;
        userId?: string;
        search?: string;
    }): Promise<{
        total: number;
        list: Clear[];
    }> {
        const { skip, take, userId, search } = query;

        // 'search' 조건 있는 경우, Unit이름으로 일치하는 UnitIds를 구한 다음, 해당 UnitIds를 가진 Clear를 조회
        let unitIds: string[] = [];
        if (search) {
            const result = await this.prisma.unit.findMany({
                where: {
                    name: { contains: search },
                },
            });
            unitIds = result.map(unit => unit.id);
        }

        // Where 조건
        const where: Prisma.ClearWhereInput = {
            ...(userId && { userId }),
            ...(unitIds.length > 0 && {
                unitIds: { hasSome: unitIds },
            }),
        };

        // OrderBy 조건
        // - 만약, userId가 들어온다면 count(라운드) 내림차순
        // - 만약, userId가 없다면 createdAt 내림차순
        const orderBy: Prisma.ClearOrderByWithRelationInput = userId
            ? { count: "desc" }
            : { createdAt: "desc" };

        const [total, list] = await Promise.all([
            this.prisma.clear.count({ where }),
            this.prisma.clear.findMany({
                skip,
                take,
                orderBy,
                where,
            }),
        ]);

        return {
            total,
            list,
        };
    }
}
