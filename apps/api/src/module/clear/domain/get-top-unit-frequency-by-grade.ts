import { Clear, Unit } from "@repo/database";
import { TopUnitGrade } from "@repo/shared";

export function getTopUnitFrequencyByGrade(
    clears: Pick<Clear, "unitIds">[],
    units: Pick<Unit, "id" | "grade">[]
): {
    grade: string;
    count: number;
}[] {
    const unitGradeCount: { [key in TopUnitGrade]: number } = {
        초월함: 0,
        불멸의: 0,
        영원한: 0,
        제한됨: 0,
        왜곡됨: 0,
        // 신비함: 0,
    };

    clears.forEach(clear => {
        clear.unitIds.forEach(unitId => {
            const unit = units.find(u => u.id === unitId);
            if (unit) {
                unitGradeCount[unit.grade as TopUnitGrade]++;
            }
        });
    });

    return Object.keys(unitGradeCount).map(grade => ({
        grade,
        count: unitGradeCount[grade as TopUnitGrade],
    }));
}
