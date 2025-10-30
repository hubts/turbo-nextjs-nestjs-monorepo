import { Clear } from "@repo/database";

export function getClearCountByTopUnitCount(
    level: number,
    clears: Pick<Clear, "unitIds">[]
): {
    topUnitCount: number;
    count: number;
}[] {
    return Array.from({
        length: level,
    }).map(
        (
            _,
            index
        ): {
            topUnitCount: number;
            count: number;
        } => {
            return {
                topUnitCount: index,
                count: clears.filter(clear =>
                    index === level - 1
                        ? clear.unitIds.length >= level - 1
                        : clear.unitIds.length === index
                ).length,
            };
        }
    );
}
