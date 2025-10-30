import { Injectable } from "@nestjs/common";
import {
    MainBadgeAndStats,
    MainBadgeSetInput,
    UserAndBadge,
    UserApi,
    UserBadgeStat,
    UserIdInput,
} from "@repo/shared";
import { UserQueryService } from "./service/user-query.service";
import { UnitService } from "../unit/unit.service";
import { UserBadgeService } from "./service/user-badge.service";
import { ClearUserService } from "../clear/service/clear-user.service";
import { findMostClearedTopUnitId } from "../clear/domain/find-most-cleared-top-unit-id";
import { avg } from "@repo/shared";
import { getClearTypeCount } from "../clear/domain/get-clear-type-count";
import { getClearCountByTopUnitCount } from "../clear/domain/get-clear-count-by-top-unit-count";
import { getTopUnitFrequencyByGrade } from "../clear/domain/get-top-unit-frequency-by-grade";
import { getTopUnitFrequency } from "../clear/domain/get-top-unit-frequency";
import { findRepresentativeTopUnitId } from "../clear/domain/find-representative-top-unit-id";

@Injectable()
export class UserService implements UserApi {
    constructor(
        private readonly userQueryService: UserQueryService,
        private readonly userBadgeService: UserBadgeService,
        private readonly clearUserService: ClearUserService,
        private readonly unitService: UnitService
    ) {}

    async getUsers(): Promise<UserAndBadge[]> {
        return await this.userQueryService.getUserAndBadges();
    }

    async getMainBadgeAndStats(userId: string): Promise<MainBadgeAndStats> {
        const mainBadge = await this.userBadgeService.getMainBadge(userId);
        const allUnits = await this.unitService.getUnits();
        const allClears = await this.clearUserService.getClearsByUserId(userId);

        // 대표 유닛 (설정에 따라)
        const mainTopUnitStat = findRepresentativeTopUnitId(allClears);
        const mainTopUnitReason = !mainTopUnitStat.unitId
            ? null
            : `${mainTopUnitStat.unitFrequency}회 제작, 평균 ${mainTopUnitStat.unitAvgLineCount} 유닛카운트 달성`;
        const mainTopUnit = allUnits.find(u => u.id === mainTopUnitStat.unitId);

        // 가장 많이 제작한 상위유닛
        const mostClearedTopUnitId = findMostClearedTopUnitId(allClears);
        const mostClearedTopUnit = allUnits.find(
            u => u.id === mostClearedTopUnitId?.mostFrequentElement
        );
        const totalClearCount = allClears.length;
        const lastClearCount = allClears.length ? allClears[0].count : 0;
        const averageLineCount = avg(allClears.map(clear => clear.lineCount));
        const averageUnitScore = avg(allClears.map(clear => clear.unitScore));
        const averageTopUnitFrequency = avg(
            allClears.map(clear => clear.unitIds.length)
        );
        const zeroLineCountClearCount = allClears.filter(
            clear => clear.lineCount === 0
        ).length;

        const clearCountByTopUnitCount = getClearCountByTopUnitCount(
            5,
            allClears
        );
        const clearTypeStat = getClearTypeCount(allClears);
        const topUnitFrequencyByGrade = getTopUnitFrequencyByGrade(
            allClears,
            allUnits
        );
        const topUnitFrequency = getTopUnitFrequency(allClears, allUnits);

        // Return
        return {
            mainBadge,
            clearStat: {
                representativeTopUnit:
                    !mainTopUnitStat.unitId ||
                    !mainTopUnit ||
                    !mainTopUnitReason
                        ? null
                        : {
                              unit: mainTopUnit,
                              reason: mainTopUnitReason,
                          },
                mostClearedTopUnit:
                    !mostClearedTopUnitId || !mostClearedTopUnit
                        ? null
                        : {
                              unit: mostClearedTopUnit,
                              count: mostClearedTopUnitId.maxCount,
                          },
                totalClearCount,
                lastClearCount,
                averageLineCount: averageLineCount ? +averageLineCount : null,
                averageUnitScore: averageUnitScore ? +averageUnitScore : null,
                averageTopUnitFrequency: averageTopUnitFrequency
                    ? +averageTopUnitFrequency
                    : null,
                zeroLineCountClearCount,
                clearCountByTopUnitCount,
                clearTypeStat,
                topUnitFrequencyByGrade,
                topUnitFrequency,
            },
        };
    }

    async getBadgesByUserId(userId: string): Promise<UserBadgeStat> {
        const badgeAndUserBadges =
            await this.userBadgeService.getBadgeWithUserBadge(userId);
        return {
            badges: badgeAndUserBadges.map(badgeAndUserBadge => {
                return {
                    ...badgeAndUserBadge.badge,
                    acquired: !!badgeAndUserBadge.userBadge,
                    acquiredAt: badgeAndUserBadge.userBadge?.createdAt ?? null,
                };
            }),
        };
    }

    async setMainBadge(input: MainBadgeSetInput): Promise<void> {
        await this.userBadgeService.setMainBadge(input.userId, input.badgeId);
    }

    async refreshBadge(input: UserIdInput): Promise<void> {
        await this.userBadgeService.validateUserBadges(input.userId);
    }
}
