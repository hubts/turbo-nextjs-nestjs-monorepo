import { css } from "@emotion/react";

export const mainDiv = css({
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,

    backgroundColor: "rgb(0, 0, 0, 0.4)",
    borderRadius: 4,
});

export const valueStyle = (fontSize?: number) =>
    css({
        fontSize: fontSize ?? 28,
        fontWeight: "bold",
        color: "rgba(255, 215, 0, 0.9)",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    });

export const titleStyle = (fontSize?: number) =>
    css({
        fontSize: fontSize ?? 16,
        color: "rgba(255, 255, 255, 0.8)",
    });
