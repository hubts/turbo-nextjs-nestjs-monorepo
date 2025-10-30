import { css } from "@emotion/react";
import Chart from "react-google-charts";
import { Unit } from "@repo/database";
import { COLOR, Grade } from "@repo/shared";
import { unitFullname } from "@/src/libs/unit-fullname";
import { getBarChartTicks } from "@/src/libs/get-bar-chart-ticks";

/**
 * @deprecated
 */
export function UnitCountBarChart(input: {
    unitFrequency: {
        unit: Unit;
        count: number;
    }[];
    options?: {
        titleFontSize?: number;
        labelFontSize?: number;
        backgroundColor?: string;
    };
}) {
    const { unitFrequency, options } = input;

    const dataList = unitFrequency.map(elem => [
        unitFullname(elem.unit),
        elem.count,
        `color: ${COLOR[elem.unit.grade as Grade]}`,
    ]);

    const hAxis = getBarChartTicks(unitFrequency.map(elem => elem.count));

    return (
        <div css={mainDiv(options?.backgroundColor)}>
            <div css={titleStyle(options?.titleFontSize)}>
                {"상위유닛 클리어 빈도"}
            </div>
            <Chart
                chartType="BarChart"
                data={[["UnitName", "Count", { role: "style" }], ...dataList]}
                options={{
                    fontSize: options?.labelFontSize ?? 16,
                    backgroundColor: "transparent",
                    chartArea: {
                        left: "35%",
                        width: "55%",
                        height: "95%",
                    },
                    hAxis: {
                        ticks: hAxis.ticks,
                        maxValue: hAxis.maxValue,
                        textStyle: {
                            color: "white",
                        },
                    },
                    vAxis: {
                        textStyle: {
                            color: "white",
                        },
                    },
                    legend: "none",
                }}
                width={"100%"}
                height={"1300px"}
            />
        </div>
    );
}

const mainDiv = (backgroundColor?: string) =>
    css({
        width: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,

        backgroundColor: backgroundColor ?? "rgb(50, 50, 50, 0.3)",
        borderRadius: 8,
    });

const titleStyle = (fontSize?: number) =>
    css({
        fontSize: fontSize ?? 24,
        fontWeight: "bold",
        color: "lightcyan",
    });
