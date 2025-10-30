import { css } from "@emotion/react";

// Body하위 최상위 영역
export const mainDiv = css({
    width: 1200,
    minHeight: "100vh",
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
});

// 세로 상위 영역 DIV
export const boundaryDiv = css({
    width: "100%",
    margin: "8px 0px",

    backgroundColor: "rgb(50, 50, 50, 0.3)",
    background: "linear-gradient(90deg, rgb(50,50,50,0.75), rgb(0,0,0,0.75))",
    borderRadius: 8,
});
