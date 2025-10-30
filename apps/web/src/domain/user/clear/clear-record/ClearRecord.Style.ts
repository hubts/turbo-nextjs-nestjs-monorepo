/* eslint-disable @typescript-eslint/no-namespace */

import { ClearType, COLOR, Grade } from "@repo/shared";
import { css } from "@emotion/react";

export namespace ClearRecordStyle {
    // 메인 카드 컨테이너
    export const cardContainer = css({
        width: "100%",
        display: "flex",
        gap: "16px",
        padding: "20px",
        backgroundColor: "rgba(26, 26, 46, 0.9)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease-in-out",

        ":hover": {
            transform: "translateY(-2px)",
        },
    });

    // 메인 섹션 (전체 너비 사용)
    export const mainSection = css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    });

    // 좌측 섹션 (클리어 정보 + 유닛들) - 하위 호환성
    export const leftSection = css({
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    });

    // 우측 섹션 (스탯 + 액션)
    export const rightSection = css({
        width: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    });

    // 헤더 정보 영역
    export const headerInfo = css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: "rgba(22, 33, 62, 0.8)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const clearInfo = css({
        display: "flex",
        gap: "12px",
        alignItems: "center",
    });

    export const clearCountBadge = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: "rgba(255, 215, 0, 0.15)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 215, 0, 0.3)",
    });

    export const crownIcon = css({
        width: "16px",
        height: "16px",
        color: "rgba(255, 215, 0, 0.9)",
    });

    export const clearCountText = css({
        fontSize: "16px",
        fontWeight: "bold",
        color: "rgba(255, 215, 0, 0.9)",
    });

    export const clearTypeBadge = (type: ClearType) =>
        css({
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            backgroundColor:
                type === "물딜"
                    ? "rgba(0, 150, 255, 0.15)"
                    : "rgba(255, 0, 150, 0.15)",
            borderRadius: "20px",
            border:
                type === "물딜"
                    ? "1px solid rgba(0, 150, 255, 0.3)"
                    : "1px solid rgba(255, 0, 150, 0.3)",
            color: type === "물딜" ? COLOR.물딜 : COLOR.마딜,
            fontSize: "14px",
            fontWeight: "bold",
        });

    export const typeIcon = css({
        width: "14px",
        height: "14px",
    });

    // 항법지침 태그 스타일
    export const navigationTag = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        color: "rgba(255, 215, 0, 0.9)",
        fontSize: "14px",
        fontWeight: "500",
    });

    export const navigationIcon = css({
        width: "14px",
        height: "14px",
        color: "rgba(255, 215, 0, 0.8)",
    });

    // 스탯 배지 (상단 헤더용)
    export const statsBadge = css({
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 8px",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        borderRadius: "6px",
        fontSize: "12px",
    });

    export const statsLabel = css({
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "11px",
        fontWeight: "500",
    });

    export const statsValue = css({
        color: "rgba(34, 197, 94, 0.9)",
        fontSize: "12px",
        fontWeight: "600",
    });

    // 유닛 스코어 태그 (깃발 - 골드 색상)
    export const unitScoreTag = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: "rgba(255, 193, 7, 0.15)",
        border: "1px solid rgba(255, 193, 7, 0.4)",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "rgba(255, 193, 7, 0.9)",
    });

    export const unitScoreIcon = css({
        width: "14px",
        height: "14px",
        color: "rgba(255, 193, 7, 0.8)",
    });

    // 유닛 카운트 태그 (계산기 - 시안 색상)
    export const unitCountTag = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: "rgba(6, 182, 212, 0.15)",
        border: "1px solid rgba(6, 182, 212, 0.4)",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "rgba(6, 182, 212, 0.9)",
    });

    export const unitCountIcon = css({
        width: "14px",
        height: "14px",
        color: "rgba(6, 182, 212, 0.8)",
    });

    // 헤더 우측 섹션 (시간 + 액션 버튼들)
    export const headerRightSection = css({
        display: "flex",
        alignItems: "center",
        gap: "16px",
    });

    export const timeInfo = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "14px",
    });

    export const headerActions = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
    });

    export const headerActionButton = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.2)",
            borderColor: "rgba(255, 215, 0, 0.4)",
            transform: "translateY(-1px)",
        },
    });

    export const headerActionButtonDisabled = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        cursor: "not-allowed",
        opacity: 0.5,
    });

    export const headerButtonIcon = css({
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        transition: "color 0.2s ease-in-out",

        "&:hover": {
            color: "rgba(255, 215, 0, 0.9)",
        },
    });

    export const clockIcon = css({
        width: "14px",
        height: "14px",
        color: "rgba(255, 255, 255, 0.6)",
    });

    export const timeText = css({
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.7)",
    });

    // 유닛 섹션
    export const unitsSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    });

    export const unitsHeader = css({
        padding: "8px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const unitsCountText = css({
        fontSize: "16px",
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.9)",
    });

    // 새로운 등급별 태그 스타일들
    export const unitsCountContainer = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
    });

    export const starIcon = css({
        width: "16px",
        height: "16px",
        color: "rgba(255, 215, 0, 0.8)",
        flexShrink: 0,
    });

    export const gradeTagsContainer = css({
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        alignItems: "center",
    });

    export const gradeTag = (grade: Grade, isTopUnit: boolean = false) =>
        css({
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            backgroundColor: `${COLOR[grade]}20`,
            borderRadius: "12px",
            border: `1px solid ${COLOR[grade]}60`,
            fontSize: "12px",
            fontWeight: "600",
            color: COLOR[grade],
            transition: "all 0.2s ease-in-out",
            cursor: "default",
            position: "relative",

            // 상위유닛인 경우 빛나는 효과 추가
            ...(isTopUnit && {
                boxShadow: `0 0 8px ${COLOR[grade]}40, 0 0 16px ${COLOR[grade]}20`,
                border: `1px solid ${COLOR[grade]}80`,
                backgroundColor: `${COLOR[grade]}25`,
            }),

            ":hover": {
                backgroundColor: `${COLOR[grade]}30`,
                transform: "translateY(-1px)",
                boxShadow: isTopUnit
                    ? `0 2px 12px ${COLOR[grade]}50, 0 4px 20px ${COLOR[grade]}30`
                    : `0 2px 8px ${COLOR[grade]}40`,
            },
        });

    export const gradeName = css({
        fontSize: "11px",
        fontWeight: "700",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const gradeCount = css({
        fontSize: "10px",
        fontWeight: "700",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "rgba(255, 255, 255, 0.9)",
        padding: "1px 4px",
        borderRadius: "6px",
        minWidth: "14px",
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const unitsGrid = css({
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "flex-start",
    });

    export const unitImage = css({
        borderRadius: "8px",
    });

    export const unitName = css({
        fontSize: "12px",
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    });

    export const unitGrade = css({
        fontSize: "10px",
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: "2px",
    });

    // 스탯 섹션
    export const statsSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        background:
            "linear-gradient(135deg, rgba(22, 33, 62, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",

        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
                "linear-gradient(90deg, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0.4) 50%, rgba(255, 215, 0, 0.8) 100%)",
        },
    });

    export const statsHeader = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 0",
        borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
        position: "relative",

        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-1px",
            left: 0,
            width: "30px",
            height: "2px",
            background: "rgba(255, 215, 0, 0.6)",
            borderRadius: "1px",
        },
    });

    export const statsTitle = css({
        fontSize: "18px",
        fontWeight: "bold",
        color: "rgba(255, 215, 0, 0.9)",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    });

    export const statsGrid = css({
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "8px 0",
    });

    export const statsIcon = css({
        width: "18px",
        height: "18px",
        color: "rgba(255, 215, 0, 0.8)",
    });

    export const statItem = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        padding: "10px 12px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        color: "white",
        fontSize: "14px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            borderColor: "rgba(255, 215, 0, 0.3)",
            transform: "translateY(-1px)",
        },
    });

    export const statTitle = css({
        fontSize: "14px",
        fontWeight: "500",
        color: "rgba(255, 255, 255, 0.9)",
    });

    export const statValue = css({
        fontSize: "18px",
        fontWeight: "bold",
        color: "rgba(255, 215, 0, 0.9)",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    });

    // 액션 섹션
    export const actionsSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        backgroundColor: "rgba(22, 33, 62, 0.8)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const actionsHeader = css({
        padding: "4px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const actionsTitle = css({
        fontSize: "16px",
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.9)",
    });

    export const actionsGrid = css({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    });

    export const actionButton = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        color: "white",
        fontSize: "14px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        position: "relative",
        overflow: "hidden",

        ":hover": {
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            borderColor: "rgba(255, 215, 0, 0.3)",
            transform: "translateY(-1px)",
        },
    });

    // 활성화된 버튼 스타일 (파일이 존재하는 경우)
    export const activeActionButton = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        backgroundColor: "rgba(255, 215, 0, 0.15)",
        border: "1px solid rgba(255, 215, 0, 0.4)",
        borderRadius: "8px",
        color: "rgba(255, 215, 0, 0.9)",
        fontSize: "14px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        position: "relative",
        overflow: "hidden",

        ":hover": {
            backgroundColor: "rgba(255, 215, 0, 0.25)",
            borderColor: "rgba(255, 215, 0, 0.6)",
            transform: "translateY(-1px)",
        },
    });

    // 업로드 진행률 표시 스타일
    export const uploadProgressOverlay = (progress: number) =>
        css({
            position: "absolute",
            top: 0,
            left: 0,
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "rgba(0, 150, 255, 0.3)",
            transition: "width 0.3s ease-in-out",
            zIndex: 1,
        });

    // 업로드 완료 스타일
    export const uploadCompleteOverlay = css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        zIndex: 1,
    });

    export const buttonIcon = css({
        width: "16px",
        height: "16px",
        color: "rgba(255, 255, 255, 0.8)",
    });

    export const buttonText = css({
        fontSize: "14px",
        fontWeight: "500",
        color: "rgba(255, 255, 255, 0.9)",
    });

    // 비활성화된 버튼 스타일
    export const disabledActionButton = css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        color: "rgba(255, 255, 255, 0.3)",
        fontSize: "14px",
        cursor: "not-allowed",
        transition: "all 0.2s ease-in-out",
        position: "relative",
        overflow: "hidden",
    });

    // 기존 스타일들 (FlipCard용)
    export const nameStyle = (fontSize?: number, grade?: string) =>
        css({
            fontSize: fontSize ?? 12,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: grade ? COLOR[grade as Grade] : "white",
        });

    export const cardBackStyle = (input: {
        fontSize?: number;
        grade?: string;
    }) =>
        css({
            fontSize: input.fontSize ?? 12,
            backgroundColor: input.grade
                ? COLOR[input.grade as Grade]
                : "black",
            color: "white",
            wordBreak: "keep-all",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
        });

    // 유닛 옵션 메인 섹션 (상단 헤더 아래)
    export const unitOptionsMainSection = css({
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        backgroundColor: "rgba(22, 33, 62, 0.8)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        marginBottom: "16px",
    });

    export const unitOptionsContent = css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
    });

    // 유닛 옵션 섹션 (우측용 - 삭제 예정)
    export const unitOptionsSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
        backgroundColor: "rgba(22, 33, 62, 0.6)",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const unitOptionsHeader = css({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        paddingBottom: "6px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    });

    export const unitOptionsTitle = css({
        fontSize: "12px",
        fontWeight: "600",
        color: "rgba(255, 215, 0, 0.9)",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    });

    export const unitOptionsList = css({
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        maxHeight: "150px",
        overflowY: "auto",

        "&::-webkit-scrollbar": {
            width: "3px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "2px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 215, 0, 0.4)",
            borderRadius: "2px",
        },
    });

    // 카테고리별 스타일 (액션 영역과 비슷한 디자인)
    export const unitOptionCategory = css({
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "12px",
    });

    export const unitOptionCategoryTitle = css({
        fontSize: "14px",
        fontWeight: "600",
        color: "rgba(255, 215, 0, 0.9)",
        textAlign: "left",
        paddingBottom: "4px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    });

    export const unitOptionCategoryItems = css({
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    });

    export const unitOptionItem = css({
        padding: "6px 8px",
        fontSize: "13px",
        color: "rgba(255, 255, 255, 0.9)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "6px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.2s ease-in-out",
        lineHeight: "1.4",

        "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            borderColor: "rgba(255, 215, 0, 0.3)",
            color: "rgba(255, 255, 255, 1)",
        },
    });

    // 기존 스타일들 (하위 호환성용)
    export const mainDiv = cardContainer;
    export const clearCountDiv = clearCountBadge;
    export const clearCountStyle = clearCountText;
    export const clearTypeStyle = clearTypeBadge;
    export const clearTopUnitScoreTextStyle = unitsCountText;
    export const clearDayStyle = timeText;
    export const clearUnitsDiv = unitsGrid;
    export const clearStatsDiv = statsGrid;
    export const clearModifyDiv = actionsGrid;
    export const modifyButtonStyle = actionButton;
}
