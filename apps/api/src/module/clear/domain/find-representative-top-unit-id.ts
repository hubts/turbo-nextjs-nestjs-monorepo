import { Clear } from "@repo/database";
import { avg } from "@repo/shared";

/**
 * 가장 많이 클리어한 횟수를 가지는 유닛들 중에서,
 * 가장 낮은 평균 유닛 카운트를 달성한 유닛을 구하는 함수
 */
export function findRepresentativeTopUnitId(
    clears: Pick<Clear, "unitIds" | "lineCount">[]
): {
    unitId: string;
    unitFrequency: number;
    unitAvgLineCount: number;
} | null {
    let lowestUnitId = "";
    let lowestAvgUnitCount = -1;
    let maxClearCount = 0;

    // 모든 유닛 목록 가져옴
    const allUnitIds = new Set([...clears.map(clear => clear.unitIds).flat()]);

    // 가장 많이 클리어한 유닛들만을 필터링
    const mostClearedUnitIds: string[] = [];
    allUnitIds.forEach(unitId => {
        const clearCount = clears.filter(c =>
            c.unitIds.includes(unitId)
        ).length;
        if (clearCount > maxClearCount) {
            maxClearCount = clearCount;
            mostClearedUnitIds.length = 0;
            mostClearedUnitIds.push(unitId);
        } else if (clearCount === maxClearCount) {
            mostClearedUnitIds.push(unitId);
        }
    });

    mostClearedUnitIds.forEach(unitId => {
        const unitCounts = clears
            .filter(c => c.unitIds.includes(unitId))
            .map(c => c.lineCount)
            .filter(u => u !== null);
        const avgUnitCount = avg(unitCounts);
        if (avgUnitCount) {
            if (
                lowestAvgUnitCount === -1 ||
                +avgUnitCount < lowestAvgUnitCount
            ) {
                lowestAvgUnitCount = +avgUnitCount;
                lowestUnitId = unitId;
            }
        }
    });

    return {
        unitId: lowestUnitId,
        unitFrequency: maxClearCount,
        unitAvgLineCount: lowestAvgUnitCount,
    };
}
