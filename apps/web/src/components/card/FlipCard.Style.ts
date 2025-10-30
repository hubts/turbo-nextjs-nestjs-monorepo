import { css } from "@emotion/react";
import { COLOR } from "@repo/shared";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace FlipCardStyle {
    // CSS 애니메이션 정의
    const globalStyles = css`
        @keyframes breathe {
            0%,
            100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.03);
            }
        }

        @keyframes shadowPulse {
            0%,
            100% {
                opacity: 0.4;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.08);
            }
        }
    `;
    export const mainDiv = (input?: {
        width?: number | string;
        height?: number | string;
    }) => css`
        ${globalStyles}
        background-color: transparent;
        width: ${input?.width ?? 300}px;
        height: ${input?.height ?? 200}px;
        perspective: 1000px;
        border-radius: 8px;

        &:hover > div {
            transform: rotateY(180deg);
        }
    `;

    export const innerDiv = css({
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: "transform 0.8s",
        transformStyle: "preserve-3d",
    });

    export const frontDiv = (border?: string, isTopUnit?: boolean) =>
        css({
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            //
            backgroundColor: "white",
            borderRadius: 8,
            border: border ?? "none",
            ...(isTopUnit && {
                animation: "breathe 2s ease-in-out infinite",
                willChange: "transform",
                transformOrigin: "center center",
            }),
        });

    export const backDiv = (border?: string) =>
        css({
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            //
            backgroundColor: "dodgerblue",
            color: "white",
            transform: "rotateY(180deg)",
            borderRadius: 8,
            //
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: border ?? "none",
        });

    // 상위유닛 그림자 효과
    export const topUnitShadow = (grade?: string) =>
        css({
            position: "absolute",
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
            borderRadius: "12px",
            background: grade
                ? `${COLOR[grade as keyof typeof COLOR]}60`
                : "rgba(255, 215, 0, 0.6)",
            filter: "blur(12px)",
            zIndex: -1,
            animation: "shadowPulse 3s ease-in-out infinite",
            willChange: "transform, opacity",
        });
}
