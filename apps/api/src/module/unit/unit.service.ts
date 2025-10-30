import { Injectable } from "@nestjs/common";
import { Unit } from "@repo/database";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";
import { Grade, SubUnitGrades, TopUnitGrades, UnitApi } from "@repo/shared";
import { today } from "@repo/shared";

@Injectable()
export class UnitService implements UnitApi {
    constructor(private readonly prisma: PrismaService) {}

    // 모든 유닛 목록 조회
    async getUnits(): Promise<Unit[]> {
        const units = await this.prisma.unit.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return units;
    }

    // 모든 상위 유닛 목록 조회
    async getTopUnits(): Promise<Unit[]> {
        const units = await this.prisma.unit.findMany({
            where: {
                grade: { in: TopUnitGrades },
            },
            orderBy: {
                order: "asc",
            },
        });
        return units;
    }

    // 모든 하위 유닛 목록 조회
    async getSubUnits(): Promise<Unit[]> {
        const units = await this.prisma.unit.findMany({
            where: {
                grade: { in: SubUnitGrades },
            },
            orderBy: {
                order: "asc",
            },
        });
        return units;
    }

    // 특정 유닛 조회
    async getUnitById(unitId: string): Promise<Unit | null> {
        return await this.prisma.unit.findUnique({
            where: {
                id: unitId,
            },
        });
    }

    // 오늘의 상위유닛 랜덤 조회
    async getTodayRandomTopUnits(): Promise<Unit[]> {
        const units = await this.getUnits();
        const todayUnits = Object.values(Grade).map(grade => {
            return today(units.filter(unit => unit.grade === grade));
        });
        return todayUnits;
    }

    /**
     * 유닛 스코어 계산
     * @param unitIds - 계산하고자 하는 유닛 ID 배열
     * @returns 계산된 유닛 스코어 합계
     */
    async calculateUnitScore(unitIds: string[]): Promise<number> {
        const units = await this.prisma.unit.findMany({
            where: {
                id: { in: unitIds },
            },
        });
        const unitScore = units.reduce((acc, unit) => {
            return acc + (unit.score ?? 0);
        }, 0);
        return unitScore;
    }

    /**
     * 유닛 IDs Order 기반 정렬
     */
    async sortUnitIds(unitIds: string[]): Promise<string[]> {
        const units = await this.prisma.unit.findMany({
            where: {
                id: { in: unitIds },
            },
        });
        const inputUnits = unitIds.map(id =>
            units.find(unit => unit.id === id)
        );
        const sortedUnits = inputUnits.sort((a, b) => a.order - b.order);
        return sortedUnits.map(unit => unit.id);
    }
}
