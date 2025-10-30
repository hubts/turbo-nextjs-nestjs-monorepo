import { css, keyframes } from "@emotion/react";

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

export namespace DashboardStyle {
    export const Container = css({
        width: "100%",
        marginBottom: "20px",
        padding: "0px",
        animation: `${fadeInUp} 0.6s ease-out`,
    });

    export const Title = css({
        fontSize: "1.5rem",
        fontWeight: "600",
        fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
        color: "rgba(255, 215, 0, 0.8)",
        marginBottom: "20px",
        textAlign: "center",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        letterSpacing: "0.05em",
    });

    export const ChartGrid = css({
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    });

    export const TopChartSection = css({
        width: "100%",
        background:
            "linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        minHeight: "650px",
        "&:hover": {
            borderColor: "rgba(255, 215, 0, 0.4)",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
        },
    });

    export const BottomChartsGrid = css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
        },
    });

    export const ChartSection = css({
        background:
            "linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
            borderColor: "rgba(255, 215, 0, 0.4)",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
        },
    });

    export const ChartTitle = css({
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

    export const ChartContent = css({
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });

    export const TopChartContent = css({
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });
}
