import { Unit } from "@repo/database";

export function unitFullname(unit: Pick<Unit, "name" | "grade">): string {
    return `${unit.name} [${unit.grade}]`;
}
