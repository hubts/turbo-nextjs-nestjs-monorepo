import { NumberCommaUtil } from "@/src/libs/number-comma";
import { COLOR } from "@repo/shared";
import { css } from "@emotion/react";
import Chart from "react-google-charts";

export function UnitGradePieChart(input: {
    frequencies: {
        grade: string;
        count: number;
    }[];
    options?: {
        width?: number;
        titleFontSize?: number;
        labelFontSize?: number;
        legendFontSize?: number;
    };
}) {
    const { frequencies, options } = input;

    const dataList = frequencies.map((freq): [string, number] => [
        `${freq.grade} : ${NumberCommaUtil.normal(freq.count)}회`,
        freq.count,
    ]);

    return (
        <div css={mainDiv(options?.width)}>
            <div css={titleStyle(options?.titleFontSize)}>
                {"상위유닛 등급 클리어 빈도"}
            </div>
            <Chart
                css={chartStyle}
                chartType="PieChart"
                data={[["UnitGrade", "Count"], ...dataList]}
                options={{
                    fontSize: options?.labelFontSize ?? 16,
                    pieHole: 0.2,
                    backgroundColor: "transparent",
                    colors: [
                        COLOR.초월함,
                        COLOR.불멸의,
                        COLOR.영원한,
                        COLOR.제한됨,
                        COLOR.신비함,
                    ],
                    chartArea: {
                        left: "10%",
                        width: "95%",
                        height: "95%",
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

const titleStyle = (fontSize?: number) =>
    css({
        fontSize: fontSize ?? 24,
        fontWeight: "bold",
        color: "lightcyan",
        marginBottom: 16,
    });

const mainDiv = (width?: number) =>
    css({
        width: width ?? "100%",
        padding: "32px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,

        backgroundColor: "rgb(50, 50, 50, 0.3)",
    });

const chartStyle = css({
    width: 100,
    backgroundColor: "red",
});
