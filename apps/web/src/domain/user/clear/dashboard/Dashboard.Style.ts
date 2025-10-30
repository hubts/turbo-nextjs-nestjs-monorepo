/* eslint-disable @typescript-eslint/no-namespace */
import { css } from "@emotion/react";

// 대시보드 전체 (세로 방향)
export const mainDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
});

// 프로필 영역
export const profileDiv = css({
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

// 클리어 영역
export const clearDiv = css({
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
});

export namespace ProfileStyle {
    // 메인 대시보드 카드
    export const dashboardCard = css({
        width: "100%",
        background:
            "linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "16px",
        padding: "24px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    });

    // 2분할 레이아웃 컨테이너
    export const twoColumnLayout = css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        alignItems: "flex-start",
        "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
            gap: "16px",
        },
    });

    // 좌측 영역 (유저 정보)
    export const leftSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    });

    // 우측 영역 (통계 카드들)
    export const rightSection = css({
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    });

    // 헤더 영역 (닉네임 + 버튼)
    export const headerSection = css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
    });

    export const nicknameAndUnitDiv = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
    });

    export const nicknameStyle = (color?: string | null) =>
        css({
            fontSize: "28px",
            color: color ?? "#ffffff",
            fontWeight: "bold",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        });

    export const badgeDescriptionStyle = css({
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.7)",
        fontStyle: "italic",
    });

    export const modifyButtonsDiv = css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
    });

    export const modifyButtonStyle = css({
        padding: "10px 16px",
        fontSize: "14px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",

        color: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
        borderRadius: "8px",
        transition: "all 0.3s ease",

        ":hover": {
            borderColor: "rgba(255, 215, 0, 0.5)",
            background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
            cursor: "pointer",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.2)",
        },
    });

    // 통계 카드 (클리어 통계와 상위유닛별 클리어 빈도 통일)
    export const statsCard = css({
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
    });

    export const statsTitle = css({
        fontSize: "18px",
        color: "rgba(255, 215, 0, 0.9)",
        fontWeight: "bold",
        marginBottom: "16px",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    });

    export const statsGrid = css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px",
    });

    // 상위유닛 클리어 빈도 섹션
    export const frequencySection = css({
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
    });

    export const frequencyTitle = css({
        fontSize: "18px",
        color: "rgba(255, 215, 0, 0.9)",
        fontWeight: "bold",
        marginBottom: "16px",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    });

    export const frequencyGrid = css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
    });

    export const frequencyItem = css({
        padding: "16px 12px",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    });

    export const iconContainer = css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8px",
        fontSize: "20px",
    });

    export const frequencyValue = css({
        color: "rgba(255, 215, 0, 0.9)",
        fontWeight: "bold",
        fontSize: "16px",
    });

    export const representativeTextStyle = css({
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: "500",
        lineHeight: "1.3",
        wordBreak: "keep-all",
        minHeight: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });
}
