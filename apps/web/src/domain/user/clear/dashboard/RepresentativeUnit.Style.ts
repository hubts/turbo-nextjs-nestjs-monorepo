import { css } from "@emotion/react";

export namespace RepresentativeUnitStyle {
    export const container = css({
        position: "relative",
        padding: "0",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        overflow: "hidden",
        minHeight: "240px",
        display: "flex",
        flexDirection: "column",
    });

    export const header = css({
        position: "absolute",
        top: "16px",
        left: "16px",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
    });

    export const title = css({
        fontSize: "16px",
        color: "rgba(255, 215, 0, 0.9)",
        fontWeight: "bold",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    });

    export const imageContainer = css({
        position: "relative",
        width: "100%",
        height: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
                "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.6) 100%)",
            zIndex: 1,
        },
    });

    export const unitImage = css({
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        filter: "brightness(0.8) contrast(1.1)",
    });

    export const infoContainer = css({
        position: "relative",
        zIndex: 2,
        padding: "16px",
        background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        textAlign: "center",
    });

    export const unitName = css({
        fontSize: "24px",
        color: "rgba(255, 255, 255, 0.95)",
        fontWeight: "bold",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        letterSpacing: "0.5px",
    });

    export const reason = css({
        fontSize: "16px",
        color: "rgba(255, 215, 0, 0.9)",
        fontWeight: "600",
        fontStyle: "italic",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        padding: "4px 8px",
        background: "rgba(255, 215, 0, 0.1)",
        borderRadius: "6px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
    });
}
