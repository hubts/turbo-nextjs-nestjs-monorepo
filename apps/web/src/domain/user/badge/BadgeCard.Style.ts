import { css } from "@emotion/react";

// 뱃지 카드 영역
export const badgeDiv = (color?: string | null) =>
    css({
        position: "relative",
        width: 200,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,

        border: "1px solid transparent",
        borderRadius: 8,
        backgroundColor: color ? `${color}3f` : "rgba(0, 0, 0, 0.5)",

        ...(color && {
            ":hover": {
                border: "1px solid white",
                cursor: "pointer",
            },
        }),
    });

export const badgeIconStyle = css({
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 20,
});

export const badgeNameStyle = (color?: string | null) =>
    css({
        fontSize: 24,
        color: color ?? "gray",
    });

export const badgeDescriptionStyle = (color?: string | null) =>
    css({
        height: 120,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        color: color ?? "gray",
        wordBreak: "keep-all",
    });

// 뱃지 마크 영역
export const badgeGetDiv = css({
    gap: 8,
});

export const badgeGetIconStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

export const badgeGetTimeStyle = (color?: string | null) =>
    css({
        color: color ?? "white",
    });
