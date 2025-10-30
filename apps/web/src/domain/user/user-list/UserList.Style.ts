import { css, keyframes } from "@emotion/react";

// 애니메이션 키프레임
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const tabGlow = keyframes`
    0%, 100% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    }
`;

const waveFloat = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-3px);
    }
`;

const waveRipple = keyframes`
    0% {
        transform: translateX(-100%) translateY(0px);
        opacity: 0.8;
    }
    50% {
        transform: translateX(0%) translateY(-2px);
        opacity: 1;
    }
    100% {
        transform: translateX(100%) translateY(0px);
        opacity: 0.8;
    }
`;

const waveBubble = keyframes`
    0%, 100% {
        transform: translateY(0px) scale(1);
        opacity: 0.6;
    }
    25% {
        transform: translateY(-4px) scale(1.1);
        opacity: 0.8;
    }
    50% {
        transform: translateY(-2px) scale(1.05);
        opacity: 1;
    }
    75% {
        transform: translateY(-6px) scale(1.15);
        opacity: 0.7;
    }
`;

/**
 * 유저 선택 영역 (하위 전체 포함)
 */
export const userListDiv = css({
    width: "100%",
    padding: "40px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    animation: `${fadeInUp} 0.8s ease-out`,
});

/**
 * 클리어 기록 타이틀
 */
export const userListTitleStyle = css({
    fontSize: "2rem",
    fontWeight: "700",
    fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
    color: "rgba(255, 215, 0, 0.9)",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    letterSpacing: "0.1em",
    position: "relative",
    marginBottom: "8px",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80px",
        height: "3px",
        background:
            "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent)",
        borderRadius: "2px",
    },
    "&::before": {
        content: '""',
        position: "absolute",
        top: "-20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "40px",
        height: "40px",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255, 215, 0, 0.6)'%3E%3Cpath d='M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z'/%3E%3C/svg%3E")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        animation: `${waveFloat} 3s ease-in-out infinite`,
    },
});

/**
 * 유저 선택 버튼 영역
 */
export const userButtonListDiv = css({
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px",
    background:
        "linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background:
            "linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.05) 50%, transparent 70%)",
        borderRadius: "20px",
        animation: `${waveFloat} 4s ease-in-out infinite`,
        pointerEvents: "none",
    },
});

/**
 * 유저 선택 버튼 스타일
 */
export const userButtonStyle = (userColor: string, selected: boolean) =>
    css({
        flex: "1",
        minHeight: "60px",
        padding: "16px 12px",
        fontSize: "1.1rem",
        fontWeight: selected ? "700" : "600",
        fontFamily: "'Pretendard-Regular', sans-serif",
        color: "rgba(255, 255, 255, 0.8)",
        background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
        border: selected
            ? `2px solid ${userColor}`
            : "1px solid rgba(255, 215, 0, 0.1)",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        textShadow: selected ? "0 1px 2px rgba(0, 0, 0, 0.5)" : "none",
        animation: selected ? `${tabGlow} 2s ease-in-out infinite` : "none",
        "&::before": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            transition: "left 0.5s ease",
        },
        "&::after": selected
            ? {
                  content: '""',
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "3px",
                  background: `linear-gradient(90deg, transparent, ${userColor}, transparent)`,
                  animation: `${waveRipple} 3s ease-in-out infinite`,
                  borderRadius: "0 0 16px 16px",
              }
            : {},
        ...(selected && {
            "& .water-bubble-1": {
                position: "absolute",
                top: "20%",
                left: "15%",
                width: "6px",
                height: "6px",
                background: `radial-gradient(circle, ${userColor}60, transparent)`,
                borderRadius: "50%",
                animation: `${waveBubble} 4s ease-in-out infinite`,
                animationDelay: "0s",
            },
            "& .water-bubble-2": {
                position: "absolute",
                top: "60%",
                right: "20%",
                width: "4px",
                height: "4px",
                background: `radial-gradient(circle, ${userColor}40, transparent)`,
                borderRadius: "50%",
                animation: `${waveBubble} 3.5s ease-in-out infinite`,
                animationDelay: "1s",
            },
            "& .water-bubble-3": {
                position: "absolute",
                top: "40%",
                left: "70%",
                width: "5px",
                height: "5px",
                background: `radial-gradient(circle, ${userColor}50, transparent)`,
                borderRadius: "50%",
                animation: `${waveBubble} 4.5s ease-in-out infinite`,
                animationDelay: "2s",
            },
        }),
        "&:hover": {
            background: selected
                ? `linear-gradient(135deg, ${userColor}12 0%, ${userColor}06 100%)`
                : "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
            borderColor: selected ? userColor : "rgba(255, 215, 0, 0.4)",
            transform: "translateY(-2px)",
            boxShadow: selected
                ? `0 8px 25px ${userColor}50`
                : "0 4px 15px rgba(255, 215, 0, 0.2)",
            "&::before": {
                left: "100%",
            },
            "&::after": selected
                ? {
                      animation: `${waveRipple} 1.5s ease-in-out infinite`,
                  }
                : {},
        },
        "&:active": {
            transform: "translateY(0px)",
            transition: "transform 0.1s ease",
        },
        "@media (max-width: 768px)": {
            fontSize: "0.9rem",
            padding: "12px 8px",
            minHeight: "50px",
        },
    });
