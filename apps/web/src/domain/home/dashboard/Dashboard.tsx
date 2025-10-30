import { Unit } from "@repo/database";
import { TotalClearStats, UserAndBadge } from "@repo/shared";
import { UnitCountStackedBarChart } from "../../chart/UnitCountStackedBarChart";
import { ClearTypePctChart } from "../../chart/ClearTypePctChart";
import { TopUnitGradeBarChart } from "../../chart/TopUnitGradeBarChart";
import { DashboardStyle } from "./Dashboard.Style";

interface Props {
    users: UserAndBadge[];
    totalClearStats: TotalClearStats;
}

export default function Dashboard({ users, totalClearStats }: Props) {
    return (
        <div css={DashboardStyle.Container}>
            <div css={DashboardStyle.ChartGrid}>
                {/* 상위 유닛 차트 - 전체 너비 */}
                <div css={DashboardStyle.TopChartSection}>
                    <div css={DashboardStyle.ChartTitle}>
                        가장 인기 있는 상위유닛
                    </div>
                    <div css={DashboardStyle.TopChartContent}>
                        <UnitCountStackedBarChart
                            users={users.map(u => ({
                                id: u.userId,
                                nickname: u.nickname,
                                color: u.color,
                            }))}
                            topUnits={totalClearStats.topUnitFrequencyRanking}
                        />
                    </div>
                </div>

                {/* 하단 2개 차트 - 2분할 */}
                <div css={DashboardStyle.BottomChartsGrid}>
                    {/* 클리어 타입 차트 */}
                    <div css={DashboardStyle.ChartSection}>
                        <div css={DashboardStyle.ChartTitle}>물딜 vs 마딜</div>
                        <div css={DashboardStyle.ChartContent}>
                            <ClearTypePctChart
                                clearType={totalClearStats.clearTypeStat}
                                options={{
                                    width: "100%",
                                    height: "60px",
                                    titleFontSize: 16,
                                    legendFontSize: 14,
                                }}
                            />
                        </div>
                    </div>

                    {/* 유닛 등급 차트 */}
                    <div css={DashboardStyle.ChartSection}>
                        <div css={DashboardStyle.ChartTitle}>
                            클리어 상위유닛 분포
                        </div>
                        <div css={DashboardStyle.ChartContent}>
                            <TopUnitGradeBarChart
                                frequencies={
                                    totalClearStats.topUnitFrequencyByGrade
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
