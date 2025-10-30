import { css } from "@emotion/react";
import { useState } from "react";
import Chart from "react-google-charts";
import { TotalClearStats } from "@repo/shared";
import { unitFullname } from "@/src/libs/unit-fullname";
import { User } from "@repo/database";
import { getPlayerColor } from "@/src/libs/player-color";
import { getBarChartTicks } from "@/src/libs/get-bar-chart-ticks";
import { sum } from "@repo/shared";

export function UnitCountStackedBarChart(input: {
    users: Pick<User, "id" | "nickname" | "color">[];
    topUnits: TotalClearStats["topUnitFrequencyRanking"];
}) {
    const { users, topUnits } = input;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 15;
    const maxPage = Math.max(0, Math.ceil(topUnits.length / itemsPerPage) - 1);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUnits = topUnits.slice(startIndex, endIndex);

    const dataList = currentUnits.map((unit): [string, ...number[], string] => {
        const usersUnitCounts = users.map(u => {
            const user = unit.users.find(u2 => u2.userId === u.id);
            return user ? user.count : 0;
        });
        const total = sum(usersUnitCounts) ?? 0;
        return [
            unitFullname({
                name: unit.unitName,
                grade: unit.unitGrade,
            }),
            ...usersUnitCounts,
            total.toString(),
        ];
    });

    const vAxis = getBarChartTicks(currentUnits.map(u => u.totalCount ?? 0));

    return (
        <div css={mainDiv}>
            <div css={navigationDiv}>
                <button
                    css={navButton}
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    ◀
                </button>
                <span css={pageInfo}>
                    {startIndex + 1}-{Math.min(endIndex, topUnits.length)} /{" "}
                    {topUnits.length}
                </span>
                <button
                    css={navButton}
                    onClick={() =>
                        setCurrentPage(Math.min(maxPage, currentPage + 1))
                    }
                    disabled={currentPage === maxPage}
                >
                    ▶
                </button>
            </div>
            <Chart
                chartType="ColumnChart"
                data={[
                    [
                        "UnitName",
                        ...users.map(u => u.nickname),
                        {
                            role: "annotation",
                            type: "string",
                        },
                    ],
                    ...dataList,
                ]}
                options={{
                    backgroundColor: "transparent",
                    isStacked: true,
                    colors: users.map(
                        (u, index) => u.color ?? getPlayerColor(index)
                    ),
                    chartArea: {
                        top: "15%",
                        left: "8%",
                        width: "88%",
                        height: "65%",
                    },
                    vAxis: {
                        ticks: vAxis.ticks,
                        maxValue: vAxis.maxValue,
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
                    hAxis: {
                        slantedText: true,
                        slantedTextAngle: 45,
                        textStyle: {
                            fontName: "Pretendard-Regular",
                            fontSize: 12,
                            color: "white",
                            bold: true,
                        },
                        maxTextLines: 2,
                        showTextEvery: 1,
                    },
                    legend: {
                        position: "top",
                        textStyle: {
                            fontName: "Pretendard-Regular",
                            fontSize: 12,
                            color: "white",
                            bold: true,
                        },
                        alignment: "center",
                    },
                    annotations: {
                        alwaysOutside: true,
                        // highContrast: true,
                        textStyle: {
                            fontSize: 12,
                            color: "gray",
                        },
                    },
                }}
                width={"100%"}
                height={"550px"}
            />
        </div>
    );
}

const mainDiv = css({
    width: "100%",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "transparent",
});

const navigationDiv = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "16px",
    padding: "8px 0",
});

const navButton = css({
    background:
        "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
    border: "1px solid rgba(255, 215, 0, 0.3)",
    borderRadius: "8px",
    color: "rgba(255, 215, 0, 0.9)",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover:not(:disabled)": {
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%)",
        borderColor: "rgba(255, 215, 0, 0.5)",
        transform: "translateY(-1px)",
    },
    "&:disabled": {
        opacity: 0.3,
        cursor: "not-allowed",
    },
});

const pageInfo = css({
    color: "rgba(255, 215, 0, 0.8)",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Orbitron', 'Pretendard-Regular', sans-serif",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
});
