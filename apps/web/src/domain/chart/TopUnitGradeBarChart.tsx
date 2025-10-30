import { getBarChartTicks } from "@/src/libs/get-bar-chart-ticks";
import { COLOR, Grade, TotalClearStats } from "@repo/shared";
import { css } from "@emotion/react";
import Chart from "react-google-charts";

export function TopUnitGradeBarChart(input: {
    frequencies: TotalClearStats["topUnitFrequencyByGrade"];
    options?: {
        width?: number | string;
        titleFontSize?: number;
        labelFontSize?: number;
        legendFontSize?: number;
        backgroundColor?: string;
        chartArea?: {
            left?: string;
            width?: string;
            height?: string;
            groupWidth?: string;
        };
    };
}) {
    const { frequencies, options } = input;

    // 범례, 빈도수, 색상, 주석
    const dataList = frequencies.map(
        (freq): [string, number, string, string] => [
            freq.grade,
            freq.count,
            `color: ${COLOR[freq.grade as Grade]}`,
            `${freq.count}회`,
        ]
    );

    const hAxis = getBarChartTicks(frequencies.map(f => f.count));

    // const maxCount = Math.max(...frequencies.map(f => f.count));
    // const hAxisMaxValue = Math.ceil(maxCount / 100) * 100;
    // const hAxisTicks = Array.from(
    //     { length: hAxisMaxValue / 50 + 1 },
    //     (_, i) => i * 50
    // );

    return (
        <div css={mainDiv(options?.width, options?.backgroundColor)}>
            <Chart
                chartType="BarChart"
                data={[
                    [
                        "UnitGrade",
                        "Count",
                        { role: "style" },
                        {
                            role: "annotation",
                            type: "string",
                        },
                    ],
                    ...dataList,
                ]}
                options={{
                    fontSize: options?.labelFontSize ?? 16,
                    backgroundColor: "transparent",
                    chartArea: {
                        left: options?.chartArea?.left ?? "20%",
                        width: options?.chartArea?.width ?? "70%",
                        height: options?.chartArea?.height ?? "75%",
                    },
                    hAxis: {
                        ticks: hAxis.ticks,
                        maxValue: hAxis.maxValue,
                        textStyle: {
                            fontName: "Pretendard-Regular",
                            fontSize: 13,
                            color: "white",
                            bold: true,
                        },
                        gridlines: {
                            color: "rgba(255, 255, 255, 0.2)",
                        },
                    },
                    vAxis: {
                        textStyle: {
                            fontName: "Pretendard-Regular",
                            fontSize: 13,
                            color: "white",
                            bold: true,
                        },
                    },
                    bar: {
                        groupWidth: options?.chartArea?.groupWidth ?? "75%",
                    },
                    legend: "none",
                    annotations: {
                        textStyle: {
                            fontName: "Pretendard-Regular",
                            fontSize: 12,
                            color: "white",
                            bold: true,
                        },
                    },
                }}
                width={"100%"}
                height={"100%"}
            />
        </div>
    );
}

const mainDiv = (width?: number | string, backgroundColor?: string) =>
    css({
        width: width ?? "100%",
        height: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        backgroundColor: backgroundColor ?? "transparent",
    });
