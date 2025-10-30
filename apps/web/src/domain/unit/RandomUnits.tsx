/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from "@emotion/react";

export function RandomUnits(input: { children: any }) {
    const { children } = input;

    return (
        <div css={mainDiv}>
            <div css={titleStyle}>{"오늘의 상위유닛은?"}</div>
            <div css={unitsDiv}>{children}</div>
        </div>
    );
}

const mainDiv = css({
    width: "100%",
    padding: "32px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    backgroundColor: "rgb(50, 50, 50, 0.3)",
    borderRadius: 8,
});

const titleStyle = css({
    fontSize: 24,
    fontWeight: "bold",
    color: "lightcyan",
});

const unitsDiv = css({
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
});
