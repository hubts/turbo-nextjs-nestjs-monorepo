import { useEffect, useState } from "react";
import { Clear } from "@repo/database";
import { UserAndBadge, COLOR, Grade } from "@repo/shared";
import { RecentClearsStyle } from "./RecentClears.Style";
import ClearService from "@/src/api/services/clear.service";
import UnitService from "@/src/api/services/unit.service";
import { getPlayerColor } from "@/src/libs/player-color";

interface Props {
    users: UserAndBadge[];
}

interface ClearWithDetails extends Clear {
    user?: UserAndBadge;
    units?: Array<{
        id: string;
        name: string;
        grade: string;
    }>;
}

export default function RecentClears({ users }: Props) {
    const [recentClears, setRecentClears] = useState<ClearWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentClears = async () => {
            try {
                setLoading(true);

                // 최신 클리어 10건 조회
                const { list: clears } = await ClearService.Instance.getClears({
                    skip: 0,
                    take: 5,
                });

                // 모든 유닛 정보 조회
                const allUnits = await UnitService.Instance.getUnits();

                // 클리어 데이터에 유저 정보와 유닛 정보 추가
                const clearsWithDetails: ClearWithDetails[] = clears.map(
                    clear => {
                        const user = users.find(u => u.userId === clear.userId);
                        const units = clear.unitIds
                            .map(unitId => {
                                const unit = allUnits.find(
                                    u => u.id === unitId
                                );
                                return unit
                                    ? {
                                          id: unit.id,
                                          name: unit.name,
                                          grade: unit.grade,
                                      }
                                    : null;
                            })
                            .filter(Boolean) as Array<{
                            id: string;
                            name: string;
                            grade: string;
                        }>;

                        return {
                            ...clear,
                            user,
                            units,
                        };
                    }
                );

                setRecentClears(clearsWithDetails);
            } catch (error) {
                console.error("최신 클리어 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentClears();
    }, [users]);

    const formatClearMessage = (clear: ClearWithDetails, userIndex: number) => {
        if (!clear.user) {
            return {
                userNickname: "알 수 없는 유저",
                userColor: "#FFFFFF",
                unitNames: [],
                clearType: "알 수 없음",
                clearTypeColor: "#FFFFFF",
                lineCount: 0,
            };
        }

        const userColor = clear.user.color || getPlayerColor(userIndex);
        const unitNames =
            clear.units?.map(unit => {
                const gradeColor =
                    COLOR[unit.grade as keyof typeof COLOR] || "#FFFFFF";
                return {
                    name: unit.name,
                    grade: unit.grade,
                    color: gradeColor,
                    displayText: `${unit.name} [${unit.grade}]`,
                };
            }) || [];

        const clearType = clear.type === "물딜" ? "물딜" : "마딜";
        const clearTypeColor =
            COLOR[clearType as keyof typeof COLOR] || "#FFFFFF";

        return {
            userNickname: clear.user.nickname,
            userColor,
            unitNames,
            clearType,
            clearTypeColor,
            lineCount: clear.lineCount || 0,
        };
    };

    if (loading) {
        return (
            <div css={RecentClearsStyle.Container}>
                <div css={RecentClearsStyle.Title}>최신 클리어 현황</div>
                <div css={RecentClearsStyle.Loading}>로딩 중...</div>
            </div>
        );
    }

    return (
        <div css={RecentClearsStyle.Container}>
            <div css={RecentClearsStyle.Title}>최신 클리어 현황</div>
            <div css={RecentClearsStyle.Content}>
                {recentClears.length === 0 ? (
                    <div css={RecentClearsStyle.EmptyMessage}>
                        아직 클리어 기록이 없습니다.
                    </div>
                ) : (
                    <div css={RecentClearsStyle.ClearList}>
                        {recentClears.map((clear, index) => {
                            const userIndex = users.findIndex(
                                u => u.userId === clear.userId
                            );
                            const messageData = formatClearMessage(
                                clear,
                                userIndex
                            );

                            return (
                                <div
                                    key={clear.id}
                                    css={RecentClearsStyle.ClearItem}
                                >
                                    <div css={RecentClearsStyle.ClearNumber}>
                                        #{index + 1}
                                    </div>
                                    <div css={RecentClearsStyle.ClearMessage}>
                                        <div
                                            css={RecentClearsStyle.MessageLine1}
                                        >
                                            <span
                                                css={
                                                    RecentClearsStyle.NormalText
                                                }
                                            >
                                                유저{" "}
                                            </span>
                                            <span
                                                css={RecentClearsStyle.HighlightedText(
                                                    messageData.userColor
                                                )}
                                            >
                                                {messageData.userNickname}
                                            </span>
                                            <span
                                                css={
                                                    RecentClearsStyle.NormalText
                                                }
                                            >
                                                이(가) 아래의 조합으로{" "}
                                            </span>
                                            <span
                                                css={RecentClearsStyle.HighlightedText(
                                                    messageData.clearTypeColor
                                                )}
                                            >
                                                {messageData.clearType}
                                            </span>
                                            <span
                                                css={
                                                    RecentClearsStyle.NormalText
                                                }
                                            >
                                                {" "}
                                                클리어 유닛카운트{" "}
                                            </span>
                                            <span
                                                css={RecentClearsStyle.HighlightedText(
                                                    "#FFD700"
                                                )}
                                            >
                                                {messageData.lineCount}
                                            </span>
                                            <span
                                                css={
                                                    RecentClearsStyle.NormalText
                                                }
                                            >
                                                을 달성하였습니다.
                                            </span>
                                        </div>
                                        <div
                                            css={RecentClearsStyle.MessageLine2}
                                        >
                                            <div
                                                css={RecentClearsStyle.UnitIcon}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    width="12"
                                                    height="12"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            </div>
                                            {messageData.unitNames.map(
                                                (unit, unitIndex) => (
                                                    <span key={unitIndex}>
                                                        <span
                                                            css={RecentClearsStyle.HighlightedText(
                                                                unit.color
                                                            )}
                                                        >
                                                            {unit.displayText}
                                                        </span>
                                                        {unitIndex <
                                                            messageData
                                                                .unitNames
                                                                .length -
                                                                1 && (
                                                            <span
                                                                css={
                                                                    RecentClearsStyle.NormalText
                                                                }
                                                            >
                                                                ,{" "}
                                                            </span>
                                                        )}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div css={RecentClearsStyle.ClearTime}>
                                        {new Date(
                                            clear.createdAt
                                        ).toLocaleString("ko-KR", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
