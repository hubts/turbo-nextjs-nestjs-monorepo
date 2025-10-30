export const BadgeTitle = {
    // 등급
    TR: "제작_초월함",
    IM: "제작_불멸의",
    ET: "제작_영원함",
    RS: "제작_제한됨",
    RO: "제작_신비함",
    DI: "제작_왜곡됨",

    // 로로
    NO_MAIN_UNIT: "0상위_1",
    NO_MAIN_UNIT_5: "0상위_5",

    // 유닛카운트 0 달성 횟수
    LINE_COUNT_ZERO: "유카0_1",
    LINE_COUNT_ZERO5: "유카0_5",
    LINE_COUNT_ZERO10: "유카0_10",
    LINE_COUNT_ZERO20: "유카0_20",

    // 전설급 제작 개수 달성
    UNIT_SCORE_12: "전설제작_12",
    UNIT_SCORE_14: "전설제작_14",
    UNIT_SCORE_17: "전설제작_17",
    UNIT_SCORE_20: "전설제작_20",

    // 특정유닛 제작 횟수 달성
    ONE_UNIT_20: "특정유닛_20",
    ONE_UNIT_50: "특정유닛_50",

    // 모든유닛 제작 횟수 달성
    ALL_UNIT_1: "모든유닛_1",

    // 클리어횟수
    CLEAR_100: "클리어_100",
    CLEAR_200: "클리어_200",
    CLEAR_300: "클리어_300",
    CLEAR_400: "클리어_400",
    CLEAR_500: "클리어_500",

    // 특수제작
    IM_UNIT_3: "불멸의_3",
    RS_UNIT_4: "제한됨_4",
    RO_UNIT_3: "신비함_3",
    TR_IM_ET_RS: "초불영제",
} as const;
export type BadgeTitle = (typeof BadgeTitle)[keyof typeof BadgeTitle];
