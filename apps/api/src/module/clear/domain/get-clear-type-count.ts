import { Clear } from "@repo/database";

export function getClearTypeCount(clears: Pick<Clear, "type">[]): {
    physical: number;
    magical: number;
} {
    return {
        physical: clears.filter(c => c.type === "물딜").length,
        magical: clears.filter(c => c.type === "마딜").length,
    };
}
