/* eslint-disable @typescript-eslint/no-namespace */
import { css, keyframes } from "@emotion/react";

// 애니메이션 키프레임
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// 최신 클리어 스타일
export namespace RecentClearsStyle {
    export const Container = css({
        width: "100%",
        background:
            "linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    });

    export const Title = css({
        fontSize: "1.5rem",
        fontWeight: "700",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        color: "rgba(255, 215, 0, 0.9)",
        marginBottom: "20px",
        textAlign: "center",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        letterSpacing: "0.1em",
        position: "relative",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "2px",
            background:
                "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.6), transparent)",
            borderRadius: "1px",
        },
    });

    export const Content = css({
        minHeight: "200px",
    });

    export const Loading = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "1.1rem",
        fontFamily: "'Pretendard-Regular', sans-serif",
        animation: `${pulse} 2s ease-in-out infinite`,
    });

    export const EmptyMessage = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "1.1rem",
        fontFamily: "'Pretendard-Regular', sans-serif",
        fontStyle: "italic",
    });

    export const ClearList = css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    });

    export const ClearItem = css({
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 215, 0, 0.1)",
        transition: "all 0.3s ease",
        animation: `${slideIn} 0.5s ease-out`,
        "&:hover": {
            background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
            borderColor: "rgba(255, 215, 0, 0.3)",
            transform: "translateX(4px)",
            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.1)",
        },
    });

    export const ClearNumber = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "40px",
        height: "40px",
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
        borderRadius: "50%",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        color: "rgba(255, 215, 0, 0.9)",
        fontSize: "0.9rem",
        fontWeight: "700",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const ClearMessage = css({
        flex: 1,
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: "0.95rem",
        fontFamily: "'Pretendard-Regular', sans-serif",
        lineHeight: 1.5,
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        wordBreak: "keep-all",
        margin: 0,
        padding: 0,
    });

    export const ClearTime = css({
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "0.8rem",
        fontFamily: "'Pretendard-Regular', sans-serif",
        whiteSpace: "nowrap",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const NormalText = css({
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: "0.95rem",
        fontFamily: "'Pretendard-Regular', sans-serif",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const HighlightedText = (color: string) =>
        css({
            color: color,
            fontSize: "0.95rem",
            fontWeight: "700",
            fontFamily: "'Pretendard-Regular', sans-serif",
            textShadow: `0 1px 2px rgba(0, 0, 0, 0.8), 0 0 8px ${color}40`,
        });

    export const UnitText = css({
        color: "rgba(255, 215, 0, 0.9)",
        fontSize: "0.95rem",
        fontWeight: "600",
        fontFamily: "'Pretendard-Regular', sans-serif",
        textShadow:
            "0 1px 2px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 215, 0, 0.3)",
    });

    export const MessageLine1 = css({
        display: "block",
        marginBottom: "4px",
        lineHeight: "1.5",
    });

    export const MessageLine2 = css({
        display: "block",
        paddingLeft: "16px",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: "0.9rem",
        position: "relative",
        lineHeight: "1.5",
    });

    export const UnitIcon = css({
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "12px",
        height: "12px",
        color: "rgba(255, 215, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });
}
