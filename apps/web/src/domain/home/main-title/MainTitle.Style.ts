/* eslint-disable @typescript-eslint/no-namespace */
import { css, keyframes } from "@emotion/react";

// 애니메이션 키프레임
const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3),
                0 0 40px rgba(255, 215, 0, 0.2),
                0 0 60px rgba(255, 215, 0, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5),
                0 0 60px rgba(255, 215, 0, 0.3),
                0 0 90px rgba(255, 215, 0, 0.2);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: translateY(0px) scaleY(1);
  }
  25% {
    transform: translateY(-15px) scaleY(1.2);
  }
  50% {
    transform: translateY(-5px) scaleY(0.8);
  }
  75% {
    transform: translateY(-20px) scaleY(1.3);
  }
  100% {
    transform: translateY(0px) scaleY(1);
  }
`;

const waveFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// 메인타이틀 스타일
export namespace MainTitleStyle {
    export const Container = css({
        width: "100%",
        minHeight: "200px",
        background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 80%, #006994 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        padding: "20px 0",
    });

    export const GlowEffect = css({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        height: "300px",
        background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: `${glowPulse} 3s ease-in-out infinite`,
        pointerEvents: "none",
    });

    export const WaveEffect = css({
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
        overflow: "hidden",
        zIndex: 1,
        "&::before": {
            content: '""',
            position: "absolute",
            bottom: "-20px",
            left: 0,
            width: "200%",
            height: "100%",
            background: "rgba(0, 150, 255, 0.4)",
            clipPath:
                "polygon(0% 100%, 10% 85%, 20% 70%, 30% 85%, 40% 60%, 50% 80%, 60% 65%, 70% 90%, 80% 75%, 90% 85%, 100% 70%, 100% 100%)",
            animation: `${waveAnimation} 8s linear infinite`,
        },
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-15px",
            left: 0,
            width: "200%",
            height: "90%",
            background: "rgba(0, 100, 200, 0.3)",
            clipPath:
                "polygon(0% 100%, 15% 80%, 25% 65%, 35% 85%, 45% 70%, 55% 90%, 65% 75%, 75% 85%, 85% 70%, 95% 80%, 100% 65%, 100% 100%)",
            animation: `${waveAnimation} 6s linear infinite reverse`,
        },
    });

    export const WaveEffect2 = css({
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "80px",
        overflow: "hidden",
        zIndex: 1,
        "&::before": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: 0,
            width: "200%",
            height: "70%",
            background: "rgba(0, 200, 255, 0.2)",
            clipPath:
                "polygon(0% 100%, 12% 85%, 22% 70%, 32% 90%, 42% 75%, 52% 85%, 62% 70%, 72% 95%, 82% 80%, 92% 85%, 100% 70%, 100% 100%)",
            animation: `${waveAnimation} 10s linear infinite`,
        },
    });

    export const Content = css({
        display: "flex",
        alignItems: "center",
        gap: "40px",
        zIndex: 2,
        animation: `${fadeInUp} 1s ease-out`,
        paddingLeft: "20px",
        paddingBottom: "20px",
    });

    export const IconContainer = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });

    export const GameIcon = css({
        width: "90px",
        height: "90px",
        background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
        borderRadius: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        animation: `${waveFloat} 4s ease-in-out infinite`,
        "&::before": {
            content: '""',
            position: "absolute",
            top: "-2px",
            left: "-2px",
            right: "-2px",
            bottom: "-2px",
            background: "linear-gradient(45deg, #ffd700, #ff6b35, #ffd700)",
            borderRadius: "24px",
            zIndex: -1,
            opacity: 0.7,
        },
    });

    export const IconSvg = css({
        width: "55px",
        height: "55px",
        color: "#1a1a2e",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
    });

    export const TextContainer = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
    });

    export const MainTitle = css({
        margin: 0,
        fontSize: "3.8rem",
        fontWeight: "900",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        letterSpacing: "0.1em",
        lineHeight: 1,
    });

    export const TitleGlow = css({
        background:
            "linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow:
            "0 0 15px rgba(255, 215, 0, 0.3), 2px 2px 0px rgba(139, 69, 19, 0.6), 4px 4px 0px rgba(139, 69, 19, 0.4)",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
        position: "relative",
        "&::before": {
            content: "attr(data-text)",
            position: "absolute",
            top: "2px",
            left: "2px",
            background: "linear-gradient(135deg, #8B4513, #A0522D)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.2,
            zIndex: -1,
        },
    });

    export const SubtitleContainer = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
        marginBottom: "8px",
    });

    export const Subtitle = css({
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: "400",
        fontFamily: "'Pretendard-Regular', sans-serif",
        color: "rgba(255, 255, 255, 0.9)",
        letterSpacing: "0.05em",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    });

    export const SubtitleAccent = css({
        margin: 0,
        fontSize: "0.9rem",
        fontWeight: "600",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        color: "rgba(255, 215, 0, 0.8)",
        letterSpacing: "0.1em",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        textTransform: "uppercase",
    });

    export const DecorativeLine = css({
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        height: "3px",
        background:
            "linear-gradient(90deg, transparent 0%, #ffd700 50%, transparent 100%)",
        borderRadius: "2px",
    });
}
