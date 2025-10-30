import { NumberCommaUtil } from "@/src/libs/number-comma";
import { COLOR, TotalClearStats } from "@repo/shared";
import { css } from "@emotion/react";

export function ClearTypePctChart(input: {
    clearType: TotalClearStats["clearTypeStat"];
    options?: {
        width: string;
        height: string;
        titleFontSize?: number;
        legendFontSize?: number;
        backgroundColor?: string;
    };
}) {
    const { clearType, options } = input;

    const physical = NumberCommaUtil.normal(clearType.physical);
    const magical = NumberCommaUtil.normal(clearType.magical);

    const pctPhysical = (
        (clearType.physical / (clearType.physical + clearType.magical)) *
        100
    ).toFixed(2);
    const pctMagical = (100 - +pctPhysical).toFixed(2);

    return (
        <div css={mainDiv(options?.backgroundColor)}>
            {clearType.physical + clearType.magical > 0 ? (
                <div css={chartContainerDiv(options?.width)}>
                    {/* 바 영역 */}
                    <div css={barContainerDiv}>
                        <div
                            css={barStyle(
                                COLOR.물딜,
                                options?.height,
                                "left",
                                pctPhysical + "%"
                            )}
                        >
                            {"물딜"}
                        </div>
                        <div
                            css={barStyle(
                                COLOR.마딜,
                                options?.height,
                                "right",
                                pctMagical + "%"
                            )}
                        >
                            {"마딜"}
                        </div>
                    </div>

                    {/* 텍스트 영역 (항상 50:50) */}
                    <div css={textContainerDiv}>
                        <div css={textDiv("left", options?.legendFontSize)}>
                            <span>{pctPhysical}%</span>
                            <span>물딜 {physical}회 클리어</span>
                        </div>
                        <div css={textDiv("right", options?.legendFontSize)}>
                            <span>{pctMagical}%</span>
                            <span>마딜 {magical}회 클리어</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>클리어 기록이 없습니다.</p>
            )}
        </div>
    );
}

const mainDiv = (backgroundColor?: string) =>
    css({
        width: "100%",
        height: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        backgroundColor: backgroundColor ?? "transparent",
    });

const chartContainerDiv = (width?: string) =>
    css({
        width: width ?? "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    });

const barContainerDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "40px", // 바 높이 고정
});

const barStyle = (
    backgroundColor: string,
    height?: string,
    direction?: "left" | "right",
    width?: string
) =>
    css({
        width: width || "0%",
        height: height ?? "40px",
        backgroundColor,
        color: "transparent",
        border: "3px solid transparent",
        display: width === "0.00%" ? "none" : "block",
        ...(direction && {
            borderRadius: direction === "left" ? "8px 0 0 8px" : "0 8px 8px 0",
        }),
    });

const textContainerDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 8,
});

const textDiv = (align: "left" | "right" | "center", fontSize?: number) =>
    css({
        width: "50%", // 항상 50:50으로 고정
        display: "flex",
        flexDirection: "column",
        alignItems:
            align === "left"
                ? "flex-start"
                : align === "right"
                  ? "flex-end"
                  : "center",
        justifyContent: "center",
        fontSize: fontSize ?? 16,
        fontWeight: "bold",
        fontFamily: "'Pretendard-Regular', sans-serif",
        color: "white",
        gap: 4,
        textAlign: align,
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
    });
