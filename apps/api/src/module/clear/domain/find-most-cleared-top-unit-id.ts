import { Clear } from "@repo/database";
import { findMostFrequentElement } from "@repo/shared";

export function findMostClearedTopUnitId(clears: Pick<Clear, "unitIds">[]) {
    return findMostFrequentElement(clears.map(c => c.unitIds));
}
