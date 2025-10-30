/* eslint-disable @typescript-eslint/no-namespace */
import { css, keyframes } from "@emotion/react";

// 애니메이션 키프레임
const versionPulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

// 네비게이션 스타일
export namespace NavigationStyle {
    export const Container = css({
        width: "100%",
        padding: "20px 0",
        background:
            "linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)",
        borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
    });

    export const NavigationContent = css({
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        gap: "20px",
    });

    export const LinkSection = css({
        display: "flex",
        alignItems: "center",
    });

    export const LinkGroup = css({
        display: "flex",
        alignItems: "center",
        gap: "12px",
    });

    export const NavigationLink = css({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        color: "rgba(255, 255, 255, 0.9)",
        textDecoration: "none",
        fontFamily: "'Pretendard-Regular', sans-serif",
        fontSize: "0.9rem",
        fontWeight: "500",
        letterSpacing: "0.05em",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
                "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)",
            transition: "left 0.5s ease",
        },
        "&:hover": {
            background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
            borderColor: "rgba(255, 215, 0, 0.4)",
            color: "rgba(255, 215, 0, 0.9)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.2)",
            "&::before": {
                left: "100%",
            },
        },
        "&:active": {
            transform: "translateY(0px)",
        },
    });

    export const LinkIcon = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
    });

    export const IconSvg = css({
        width: "14px",
        height: "14px",
        color: "rgba(255, 215, 0, 0.8)",
        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
    });

    export const LinkText = css({
        fontWeight: "600",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const ExternalIcon = css({
        width: "12px",
        height: "12px",
        color: "rgba(255, 215, 0, 0.6)",
        transition: "all 0.3s ease",
        ".NavigationLink:hover &": {
            color: "rgba(255, 215, 0, 0.9)",
            transform: "scale(1.1)",
        },
    });

    export const VersionSection = css({
        display: "flex",
        alignItems: "center",
    });

    export const VersionBadge = css({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        background:
            "linear-gradient(135deg, rgba(255, 69, 0, 0.15) 0%, rgba(255, 69, 0, 0.05) 100%)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 69, 0, 0.3)",
        color: "rgba(255, 69, 0, 0.9)",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        fontSize: "0.85rem",
        fontWeight: "600",
        letterSpacing: "0.1em",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        position: "relative",
        animation: `${versionPulse} 3s ease-in-out infinite`,
    });

    export const VersionIcon = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg, rgba(255, 69, 0, 0.3) 0%, rgba(255, 69, 0, 0.1) 100%)",
        border: "1px solid rgba(255, 69, 0, 0.4)",
    });

    export const VersionIconSvg = css({
        width: "12px",
        height: "12px",
        color: "rgba(255, 69, 0, 0.9)",
        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
    });

    export const VersionText = css({
        fontWeight: "700",
        textTransform: "uppercase",
    });

    export const VersionIndicator = css({
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "rgba(255, 69, 0, 0.8)",
        boxShadow: "0 0 8px rgba(255, 69, 0, 0.6)",
        animation: `${versionPulse} 2s ease-in-out infinite`,
    });
}
