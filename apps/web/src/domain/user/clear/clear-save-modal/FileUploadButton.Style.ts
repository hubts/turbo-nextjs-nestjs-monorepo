import { css } from "@emotion/react";

/**
 * 파일 업로드 버튼
 */
export const fileUploadButton = css({
    width: 250,
    marginTop: 8,
    padding: "8px 16px",
    border: "1px solid gray",
    borderRadius: 8,
    backgroundColor: "gray",

    fontSize: 14,
    color: "white",

    ":hover": {
        border: "1px solid black",
        backgroundColor: "black",
        cursor: "pointer",
    },
});
