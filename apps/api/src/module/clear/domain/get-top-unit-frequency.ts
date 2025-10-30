import { Clear, Unit } from "@repo/database";

export function getTopUnitFrequency(
    clears: Pick<Clear, "unitIds">[],
    units: Unit[]
): {
    unit: Unit;
    count: number;
}[] {
    return units.map(unit => ({
        unit,
        count: clears.filter(clear => clear.unitIds.includes(unit.id)).length,
    }));
}
