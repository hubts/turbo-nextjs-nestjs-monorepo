import { Clear, Unit } from "@repo/database";
import { findMostFrequentElement, max } from "@repo/shared";
import { BadgeTitle } from "./badge-title";
import { Grade } from "@repo/shared";

export function validateBadge(
    units: Pick<Unit, "id" | "grade">[],
    clears: Pick<Clear, "count" | "unitIds" | "lineCount" | "unitScore">[],
    badgeTitle: BadgeTitle
): boolean {
    const trUnitIds = units.filter(u => u.grade === Grade.TR).map(u => u.id);
    const imUnitIds = units.filter(u => u.grade === Grade.IM).map(u => u.id);
    const etUnitIds = units.filter(u => u.grade === Grade.ET).map(u => u.id);
    const rsUnitIds = units.filter(u => u.grade === Grade.RS).map(u => u.id);
    // const roUnitIds = units.filter(u => u.grade === Grade.RO).map(u => u.id);

    switch (badgeTitle) {
        /**
         * 유닛 제작 계열
         */
        // 초월함, 불멸의, 영원함, 제한됨, 신비함 모두 제작 - 신비함 제외, 왜곡됨 추가
        case BadgeTitle.TR:
        case BadgeTitle.IM:
        case BadgeTitle.ET:
        case BadgeTitle.RS:
        case BadgeTitle.DI: {
            const grade = badgeTitle.split("_")[1];
            const unitIds = units.filter(u => u.grade === grade).map(u => u.id);
            const uniqueClearUnitIds = Array.from(
                new Set([...clears.map(c => c.unitIds).flat()])
            );
            return unitIds.every(id => uniqueClearUnitIds.includes(id));
        }

        /**
         * 로로
         */
        case BadgeTitle.NO_MAIN_UNIT:
        case BadgeTitle.NO_MAIN_UNIT_5: {
            const cut = +badgeTitle.split("_")[1];
            const noMainUnits = clears.filter(c => c.unitIds.length === 0);
            return noMainUnits.length >= cut;
        }

        /**
         * 유닛카운트 0
         */
        case BadgeTitle.LINE_COUNT_ZERO:
        case BadgeTitle.LINE_COUNT_ZERO5:
        case BadgeTitle.LINE_COUNT_ZERO10:
        case BadgeTitle.LINE_COUNT_ZERO20: {
            const cut = +badgeTitle.split("_")[1];
            const unitCounts = clears
                .map(c => c.lineCount)
                .filter(c => c === 0);
            return unitCounts.length >= cut;
        }

        /**
         * 전설급 제작
         */
        case BadgeTitle.UNIT_SCORE_12:
        case BadgeTitle.UNIT_SCORE_14:
        case BadgeTitle.UNIT_SCORE_17:
        case BadgeTitle.UNIT_SCORE_20: {
            const score = +badgeTitle.split("_")[1];
            const unitScores = clears
                .map(c => c.unitScore)
                .filter(c => c && c >= score);
            return unitScores.length >= 1;
        }

        /**
         * 특정유닛 제작 횟수
         */
        case BadgeTitle.ONE_UNIT_20:
        case BadgeTitle.ONE_UNIT_50: {
            const cut = +badgeTitle.split("_")[1];
            const mostFrequentUnit = findMostFrequentElement(
                clears.map(c => c.unitIds)
            );
            if (!mostFrequentUnit) return false;
            return mostFrequentUnit.maxCount >= cut;
        }

        /**
         * 모든유닛 제작 횟수
         */
        case BadgeTitle.ALL_UNIT_1: {
            const uniqueUnitIds = Array.from(
                new Set([...clears.map(c => c.unitIds).flat()])
            );
            return uniqueUnitIds.length === units.length;
        }

        /**
         * 클리어횟수
         */
        case BadgeTitle.CLEAR_100:
        case BadgeTitle.CLEAR_200:
        case BadgeTitle.CLEAR_300:
        case BadgeTitle.CLEAR_400:
        case BadgeTitle.CLEAR_500: {
            const cut = +badgeTitle.split("_")[1];
            const clearCount = max(clears.map(c => c.count));
            if (!clearCount) return false;
            return clearCount >= cut;
        }

        /**
         * 특수제작
         */
        case BadgeTitle.IM_UNIT_3: {
            const cut = +badgeTitle.split("_")[1];
            const result = clears.find(
                c =>
                    c.unitIds.length >= cut &&
                    c.unitIds.filter(id => imUnitIds.includes(id)).length >= cut
            );
            return !!result;
        }
        case BadgeTitle.RS_UNIT_4: {
            const cut = +badgeTitle.split("_")[1];
            const result = clears.find(
                c =>
                    c.unitIds.length >= cut &&
                    c.unitIds.filter(id => rsUnitIds.includes(id)).length >= cut
            );
            return !!result;
        }
        case BadgeTitle.RO_UNIT_3: {
            // const cut = +badgeTitle.split("_")[1];
            // const result = clears.find(
            //     c =>
            //         c.unitIds.length >= cut &&
            //         c.unitIds.filter(id => roUnitIds.includes(id)).length >= cut
            // );
            // return !!result;
            return false;
        }
        case BadgeTitle.TR_IM_ET_RS: {
            const result = clears.find(
                c =>
                    c.unitIds.length >= 4 &&
                    c.unitIds.some(id => trUnitIds.includes(id)) &&
                    c.unitIds.some(id => imUnitIds.includes(id)) &&
                    c.unitIds.some(id => etUnitIds.includes(id)) &&
                    c.unitIds.some(id => rsUnitIds.includes(id))
            );
            return !!result;
        }
    }
}
