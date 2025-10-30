import { COLOR } from "@repo/shared";
import { css } from "@emotion/react";
import { Clear } from "@repo/database";
import Chart from "react-google-charts";

export function ClearTypePieChart(input: {
    clears: Clear[];
    options?: {
        titleFontSize?: number;
        labelFontSize?: number;
        legendFontSize?: number;
    };
}) {
    const { clears, options } = input;

    return (
        <div css={mainDiv}>
            <div css={titleStyle(options?.titleFontSize)}>
                {"물딜 / 마딜 비율(%)"}
            </div>
            <Chart
                chartType="PieChart"
                data={[
                    ["ClearType", "Count"],
                    ["물딜", clears.filter(c => c.type === "물딜").length],
                    ["마딜", clears.filter(c => c.type === "마딜").length],
                ]}
                options={{
                    animation: {
                        duration: 1000,
                        easing: "out",
                        startup: true,
                    },
                    fontSize: options?.labelFontSize ?? 16,
                    pieHole: 0.3,
                    backgroundColor: "transparent",
                    colors: [COLOR.물딜, COLOR.마딜],
                    chartArea: {
                        left: "10%",
                        width: "99%",
                        height: "99%",
                    },
                    legend: {
                        alignment: "center",
                        textStyle: {
                            color: "white",
                            fontSize: options?.legendFontSize ?? 16,
                        },
                    },
                }}
                width={"100%"}
                height={"100%"}
            />
        </div>
    );
}

const mainDiv = css({
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,

    backgroundColor: "rgb(50, 50, 50, 0.3)",
    borderRadius: 8,
});

const titleStyle = (fontSize?: number) =>
    css({
        fontSize: fontSize ?? 24,
        fontWeight: "bold",
        color: "lightcyan",
    });
