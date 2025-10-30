import { Unit } from "@repo/database";
import { UnitOptionJson, UnitOptionType } from "@repo/shared";
import { NumberCommaUtil } from "./number-comma";

/**
 * 유닛 옵션들을 추출하여 JSON 형태로 합산
 * 해당 합산 값과 영향을 준 Unit들 저장
 */
export function groupUnitOptionJson(units: Unit[]): Partial<{
    [key in UnitOptionType]: {
        value: number;
        units: Unit[];
    };
}> {
    const result: Partial<{
        [key in UnitOptionType]: {
            value: number;
            units: Unit[];
        };
    }> = {};
    for (const unit of units) {
        if (unit.option) {
            const option = unit.option as UnitOptionJson;
            for (const key of Object.keys(option) as UnitOptionType[]) {
                result[key] = {
                    value:
                        Number(result[key]?.value || 0) +
                        Number(option[key] || 0),
                    units: [...(result[key]?.units || []), unit],
                };
            }
        }
    }
    return result;
}

/**
 * 유닛 추출 JSON을 정리하여 문자열 배열로 반환
 */
export const GroupUnitCategories = [
    "스턴",
    "이동속도감소",
    "방어력감소",
    "공격력 증가",
    "공격속도 증가",
    "비례데미지",
    "증폭/감소",
    "회복",
    "특수능력",
] as const;
export type GroupUnitCategory = (typeof GroupUnitCategories)[number];
export function groupUnitOptions(units: Unit[]): {
    category: GroupUnitCategory;
    data: {
        value: string;
        units: Unit[];
    }[];
}[] {
    const optionJson = groupUnitOptionJson(units);
    const result: {
        category: GroupUnitCategory;
        data: {
            value: string;
            units: Unit[];
        }[];
    }[] = [];
    for (const key of Object.keys(optionJson) as UnitOptionType[]) {
        switch (key) {
            case "물리데미지":
            case "마법데미지":
                break;
            case "방어력감소":
            case "발동방어력감소":
            case "대상방어력감소":
            case "아머브레이크":
            case "단일아머브레이크":
                const find = result.find(r => r.category === "방어력감소");
                if (find) {
                    find.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "방어력감소",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "마나회복":
                const find22 = result.find(r => r.category === "회복");
                if (find22) {
                    find22.data.push({
                        value: `단발 ${key} ${optionJson[key]?.value || 0}`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "회복",
                        data: [
                            {
                                value: `단발 ${key} ${optionJson[key]?.value || 0}`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "마나재생":
            case "발동마나재생":
            case "자신마나재생":
            case "자신제외마나재생":
            case "체력재생":
            case "발동체력재생":
            case "대상체력재생":
                const find2 = result.find(r => r.category === "회복");
                if (find2) {
                    find2.data.push({
                        value: `초당 ${key} ${optionJson[key]?.value || 0}`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "회복",
                        data: [
                            {
                                value: `초당 ${key} ${optionJson[key]?.value || 0}`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "단일스턴":
            case "범위스턴":
                const find3 = result.find(r => r.category === "스턴");
                if (find3) {
                    if (key === "범위스턴") {
                        find3.data.push({
                            value: `${key} ${optionJson[key]?.value.toFixed(2) || 0}개급`,
                            units: optionJson[key]?.units || [],
                        });
                    } else {
                        find3.data.push({
                            value: `${key} ${optionJson[key]?.value.toFixed(2) || 0}개급`,
                            units: optionJson[key]?.units || [],
                        });
                    }
                } else {
                    if (key === "범위스턴") {
                        result.push({
                            category: "스턴",
                            data: [
                                {
                                    value: `${key} ${optionJson[key]?.value.toFixed(2) || 0}개급`,
                                    units: optionJson[key]?.units || [],
                                },
                            ],
                        });
                    } else {
                        result.push({
                            category: "스턴",
                            data: [
                                {
                                    value: `${key} ${optionJson[key]?.value.toFixed(2) || 0}개급`,
                                    units: optionJson[key]?.units || [],
                                },
                            ],
                        });
                    }
                }
                break;

            case "라인몬스터삭제":
            case "보스대상":
            case "광폭화대상":
                const find4 = result.find(r => r.category === "특수능력");
                if (find4) {
                    find4.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "특수능력",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "이동속도감소":
            case "발동이동속도감소":
                const find5 = result.find(r => r.category === "이동속도감소");
                if (find5) {
                    find5.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}%`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "이동속도감소",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}%`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "단일마법데미지증폭":
            case "범위마법데미지증폭":
            case "폭발형데미지증폭":
            case "단일모든피해량증폭":
            case "마법방어력감소":
                const find6 = result.find(r => r.category === "증폭/감소");
                if (find6) {
                    find6.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}%`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "증폭/감소",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}%`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "자신공격속도증가":
            case "자신제외공격속도증가":
            case "대상공격속도증가":
            case "아군공격속도증가":
                const find7 = result.find(r => r.category === "공격속도 증가");
                if (find7) {
                    find7.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}%`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "공격속도 증가",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}%`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "자신공격력증가":
            case "자신공격력값증가":
            case "자신제외공격력증가":
            case "대상공격력증가":
            case "아군공격력증가":
            case "아군공격력값증가":
            case "발동공격력증가":
                const find8 = result.find(r => r.category === "공격력 증가");
                if (find8) {
                    find8.data.push({
                        value: `${key} ${NumberCommaUtil.normal(optionJson[key]?.value || 0)}${key.includes("값") ? "" : "%"}`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "공격력 증가",
                        data: [
                            {
                                value: `${key} ${NumberCommaUtil.normal(optionJson[key]?.value || 0)}${key.includes("값") ? "" : "%"}`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;

            case "현재체력마법데미지":
            case "전체체력마법데미지":
            case "현재체력폭발형데미지":
            case "전체체력폭발형데미지":
            case "잃은체력폭발형데미지":
            case "전체체력고정데미지":
            case "잃은체력고정데미지":
                const find9 = result.find(r => r.category === "비례데미지");
                if (find9) {
                    find9.data.push({
                        value: `${key} ${optionJson[key]?.value || 0}%`,
                        units: optionJson[key]?.units || [],
                    });
                } else {
                    result.push({
                        category: "비례데미지",
                        data: [
                            {
                                value: `${key} ${optionJson[key]?.value || 0}%`,
                                units: optionJson[key]?.units || [],
                            },
                        ],
                    });
                }
                break;
        }
    }
    // GroupUnitCategories 기반 순서 정렬
    return result.sort((a, b) => {
        const aIndex = GroupUnitCategories.indexOf(a.category);
        const bIndex = GroupUnitCategories.indexOf(b.category);
        return aIndex - bIndex;
    });
}
