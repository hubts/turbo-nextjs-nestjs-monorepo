/* eslint-disable @typescript-eslint/no-namespace */

import { css } from "@emotion/react";

/**
 * 메인 영역 (가로 한 줄)
 */

export namespace ClearRecordStyle {
    export const container = css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    });

    export const header = css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
        "@media (max-width: 768px)": {
            flexDirection: "column",
            alignItems: "stretch",
        },
    });

    export const searchForm = css({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: "1",
    });

    export const searchContainer = css({
        position: "relative",
        flex: "1",
        display: "flex",
        alignItems: "center",
    });

    export const searchIcon = css({
        position: "absolute",
        left: "12px",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "16px",
        zIndex: 1,
    });

    export const searchInput = css({
        width: "100%",
        padding: "12px 12px 12px 40px",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.9)",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "8px",
        outline: "none",
        transition: "all 0.2s ease",

        "&::placeholder": {
            color: "rgba(255, 255, 255, 0.5)",
        },

        "&:focus": {
            borderColor: "rgba(255, 215, 0, 0.5)",
            background: "rgba(0, 0, 0, 0.4)",
        },
    });

    export const searchButton = css({
        padding: "12px 20px",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.9)",
        background: "rgba(255, 215, 0, 0.1)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s ease",

        "&:hover": {
            background: "rgba(255, 215, 0, 0.2)",
            borderColor: "rgba(255, 215, 0, 0.5)",
        },
    });

    export const paginationContainer = css({
        display: "flex",
        alignItems: "center",
        gap: "12px",
    });

    export const paginationButton = css({
        padding: "8px 12px",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.9)",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s ease",

        "&:hover:not(:disabled)": {
            background: "rgba(255, 215, 0, 0.1)",
            borderColor: "rgba(255, 215, 0, 0.4)",
        },

        "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
        },
    });

    export const pageInfo = css({
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: "500",
        minWidth: "60px",
        textAlign: "center",
    });

    export const listDiv = css({
        display: "flex",
        flexDirection: "column",
        minHeight: "400px", // 최소 높이 설정으로 레이아웃 안정화
    });

    export const loadingText = css({
        textAlign: "center",
        marginTop: "40px",
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "16px",
    });

    export const emptyText = css({
        textAlign: "center",
        marginTop: "40px",
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "16px",
    });

    // 스켈레톤 로딩 스타일
    export const skeletonContainer = css({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minHeight: "400px",
    });

    export const skeletonItem = css({
        height: "80px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        animation: "pulse 1.5s ease-in-out infinite",
    });

    // 페이드 인 애니메이션
    export const fadeIn = css({
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        animation: "fadeIn 0.3s ease-in-out",
    });
}
