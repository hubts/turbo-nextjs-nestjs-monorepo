import { css } from "@emotion/react";

// 백그라운드 영역
export const backgroundDiv = css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
});

// 모달 영역
export const modalDiv = css({
    position: "relative",

    width: 800,
    maxHeight: "90%",
    padding: "32px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    overflowY: "auto",

    backgroundColor: "#1a1d2c",
    border: "1px solid gray",
    borderRadius: 8,
});

// // 닫기 버튼
// export const closeButtonStyle = css({
//     position: "absolute",
//     top: 32,
//     width: 32,
//     height: 32,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "1px solid white",
//     borderRadius: 8,
//     backgroundColor: "black",

//     fontSize: 20,
//     color: "white",

//     ":hover": {
//         border: "1px solid transparent",
//         cursor: "pointer",
//     },
// });

// 뱃지 목록 영역
export const badgeListDiv = css({
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
});

export const titleDiv = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
});

export const titleStyle = css({
    fontSize: 24,
    fontWeight: "bold",
});

export const refreshButtonStyle = css({
    // position: "absolute",
    // top: 32,
    // width: 32,
    // height: 32,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
    borderRadius: 8,
    backgroundColor: "rgb(0, 0, 0, 0.4)",
    //
    fontSize: 20,
    color: "white",

    ":hover": {
        border: "1px solid transparent",
        cursor: "pointer",
    },
});
