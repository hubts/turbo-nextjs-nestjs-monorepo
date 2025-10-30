import { BadgeTitle } from "./badge-title";

const BADGES: {
    title: BadgeTitle;
    name: string;
    description: string;
    color: string;
}[] = [
    {
        title: BadgeTitle.TR,
        name: "초월한",
        description: "모든 초월함 유닛을 제작",
        color: "#3B44F6",
    },
    {
        title: BadgeTitle.IM,
        name: "불멸의",
        description: "모든 불멸의 유닛을 제작",
        color: "#FF004D",
    },
    {
        title: BadgeTitle.ET,
        name: "영원한",
        description: "모든 영원함 유닛을 제작",
        color: "#F72798",
    },
    {
        title: BadgeTitle.RS,
        name: "제한된",
        description: "모든 제한됨 유닛을 제작",
        color: "#FF6D28",
    },
    {
        title: BadgeTitle.RO,
        name: "신비한",
        description: "모든 신비함 유닛을 제작",
        color: "#37E2D5",
    },
    {
        title: BadgeTitle.NO_MAIN_UNIT,
        name: "로로초보",
        description: "0 상위 클리어 달성",
        color: "#FFE700",
    },
    {
        title: BadgeTitle.NO_MAIN_UNIT_5,
        name: "로로중수",
        description: "0 상위 클리어 5회 달성",
        color: "#FFA500",
    },
    {
        title: BadgeTitle.LINE_COUNT_ZERO,
        name: "쓱싹",
        description: "유닛카운트 0을 달성",
        color: "#FAF6E3",
    },
    {
        title: BadgeTitle.LINE_COUNT_ZERO5,
        name: "뽀드득",
        description: "유닛카운트 0을 5회 달성",
        color: "#B6FFA1",
    },
    {
        title: BadgeTitle.LINE_COUNT_ZERO10,
        name: "청소부",
        description: "유닛카운트 0을 10회 달성",
        color: "#00FF9C",
    },
    {
        title: BadgeTitle.LINE_COUNT_ZERO20,
        name: "파괴자",
        description: "유닛카운트 0을 20회 달성",
        color: "#00FF9C",
    },
    {
        title: BadgeTitle.UNIT_SCORE_12,
        name: "랜송이",
        description: "전설급 12개 제작 달성",
        color: "#FABC3F",
    },
    {
        title: BadgeTitle.UNIT_SCORE_14,
        name: "랜디의왕",
        description: "전설급 14개 제작 달성",
        color: "#E85C0D",
    },
    {
        title: BadgeTitle.UNIT_SCORE_17,
        name: "랜디황제",
        description: "전설급 17개 제작 달성",
        color: "#C7253E",
    },
    {
        title: BadgeTitle.UNIT_SCORE_20,
        name: "랜디의신",
        description: "전설급 20개 제작 달성",
        color: "#821131",
    },
    {
        title: BadgeTitle.ONE_UNIT_20,
        name: "집착",
        description: "특정 상위유닛 20회 제작",
        color: "#4C1F7A",
    },
    {
        title: BadgeTitle.ONE_UNIT_50,
        name: "달인",
        description: "특정 상위유닛 50회 제작",
        color: "#4C1F7A",
    },
    {
        title: BadgeTitle.ALL_UNIT_1,
        name: "완성",
        description: "모든 유닛 1회 이상 제작",
        color: "#FEEC37",
    },
    {
        title: BadgeTitle.CLEAR_100,
        name: "칠무해",
        description: "100회 클리어 달성",
        color: "#FFD700",
    },
    {
        title: BadgeTitle.CLEAR_200,
        name: "사황",
        description: "200회 클리어 달성",
        color: "#FFA500",
    },
    {
        title: BadgeTitle.CLEAR_300,
        name: "해군대장",
        description: "300회 클리어 달성",
        color: "#FF4500",
    },
    {
        title: BadgeTitle.CLEAR_400,
        name: "오로성",
        description: "400회 클리어 달성",
        color: "#FF0000",
    },
    {
        title: BadgeTitle.CLEAR_500,
        name: "D",
        description: "500회 클리어 달성",
        color: "#FF0000",
    },
    {
        title: BadgeTitle.IM_UNIT_3,
        name: "불불불멸",
        description: "불멸의 3상위 제작 달성",
        color: "#FF004D",
    },
    {
        title: BadgeTitle.RS_UNIT_4,
        name: "제한없는",
        description: "제한된 4상위 제작 달성",
        color: "#FF6D28",
    },
    {
        title: BadgeTitle.RO_UNIT_3,
        name: "신비로운",
        description: "신비한 3상위 제작 달성",
        color: "#37E2D5",
    },
    {
        title: BadgeTitle.TR_IM_ET_RS,
        name: "초불영제",
        description: "초월함, 불멸의, 영원함, 제한됨 제작 달성",
        color: "#3B44F6",
    },
];

export const badges = BADGES.map((badge, index) => ({
    ...badge,
    order: index + 1,
}));
