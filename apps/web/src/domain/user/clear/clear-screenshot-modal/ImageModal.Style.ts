import { css } from "@emotion/react";

export const image = css({
    width: "100%",
    height: 200,
    position: "relative",
});

export const modal = css({
    position: "fixed",
    zIndex: 9999,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
});

export const close = css({
    zIndex: 10000,
    position: "absolute",
    top: 15,
    right: 35,
    color: "#f1f1f1",
    fontSize: 40,
    fontWeight: "bold",
    cursor: "pointer",

    "&:hover": {
        color: "#fff",
        textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    },
});

export const modalContent = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: "auto",
    position: "relative",
});
