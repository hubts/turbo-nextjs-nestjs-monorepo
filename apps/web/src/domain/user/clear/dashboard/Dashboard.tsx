import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import {
    FaChartBar,
    FaTrophy,
    FaCrosshairs,
    FaBroom,
    FaHandPaper,
    FaCrown as FaCrown2,
    FaSkull,
} from "react-icons/fa";
import { MainBadgeAndStats, UserAndBadge } from "@repo/shared";
import UserService from "@/src/api/services/user.service";
import { clearDiv, mainDiv, profileDiv, ProfileStyle } from "./Dashboard.Style";
import { RepresentativeUnit } from "./RepresentativeUnit";
import { ClearSaveModal } from "../clear-save-modal/ClearSaveModal";
import { BadgeListModal } from "../../badge/BadgeListModal";
import ClearRecordList from "../clear-record/ClearRecordList";

export function Dashboard(input: { user: UserAndBadge }) {
    const { user } = input;

    // 칭호 및 스탯 데이터 조회
    const [data, setData] = useState<MainBadgeAndStats | null>(null);
    useEffect(() => {
        UserService.Instance.getMainBadgeAndStats(user.userId).then(result => {
            setData(result);
        });
    }, [user.userId]);

    // 클리어 추가 모달
    const [showClearSaveModal, setShowClearSaveModal] = useState(false);
    const onClickClearSaveModal = () =>
        setShowClearSaveModal(!showClearSaveModal);

    // 뱃지 모달
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const onClickBadgeModal = () => setShowBadgeModal(!showBadgeModal);

    if (!data) return <p>대시보드를 구성중입니다...</p>;

    // 데이터 분해
    const { mainBadge, clearStat } = data;
    const {
        representativeTopUnit,
        lastClearCount,
        averageLineCount,
        averageTopUnitFrequency,
        averageUnitScore,
        zeroLineCountClearCount,
        clearCountByTopUnitCount,
    } = clearStat;

    return (
        <div css={mainDiv}>
            <div css={profileDiv}>
                {/* 메인 대시보드 카드 */}
                <div css={ProfileStyle.dashboardCard}>
                    {/* 2분할 레이아웃 */}
                    <div css={ProfileStyle.twoColumnLayout}>
                        {/* 좌측 영역 - 유저 정보 */}
                        <div css={ProfileStyle.leftSection}>
                            {/* 헤더 섹션 - 닉네임과 버튼 */}
                            <div css={ProfileStyle.headerSection}>
                                <div css={ProfileStyle.nicknameAndUnitDiv}>
                                    <span
                                        css={ProfileStyle.nicknameStyle(
                                            mainBadge?.color
                                        )}
                                    >
                                        {user.nickname}
                                    </span>
                                    <span
                                        css={ProfileStyle.badgeDescriptionStyle}
                                    >
                                        {mainBadge?.description}
                                    </span>
                                </div>
                                <div css={ProfileStyle.modifyButtonsDiv}>
                                    <button
                                        css={ProfileStyle.modifyButtonStyle}
                                        onClick={onClickClearSaveModal}
                                    >
                                        클리어 저장 <FaCirclePlus />
                                    </button>
                                </div>
                            </div>

                            {/* 대표 유닛 컴포넌트 */}
                            <RepresentativeUnit
                                unit={representativeTopUnit?.unit}
                                reason={representativeTopUnit?.reason}
                            />
                        </div>

                        {/* 우측 영역 - 통계 카드들 */}
                        <div css={ProfileStyle.rightSection}>
                            {/* 클리어 통계 카드 */}
                            <div css={ProfileStyle.statsCard}>
                                <div css={ProfileStyle.statsTitle}>
                                    <FaChartBar
                                        style={{
                                            color: "rgba(255, 215, 0, 0.9)",
                                        }}
                                    />
                                    클리어 통계
                                </div>
                                <div css={ProfileStyle.frequencyGrid}>
                                    <div css={ProfileStyle.frequencyItem}>
                                        <div css={ProfileStyle.iconContainer}>
                                            <FaCrosshairs
                                                style={{
                                                    color: "rgba(255, 215, 0, 0.9)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            css={
                                                ProfileStyle.representativeTextStyle
                                            }
                                        >
                                            총 클리어 횟수
                                            {/* {totalClearCount !== lastClearCount
                                                ? ` (미입력: ${lastClearCount - totalClearCount})`
                                                : ""} */}
                                        </div>
                                        <div css={ProfileStyle.frequencyValue}>
                                            {lastClearCount}회
                                        </div>
                                    </div>

                                    <div css={ProfileStyle.frequencyItem}>
                                        <div css={ProfileStyle.iconContainer}>
                                            <FaHandPaper
                                                style={{
                                                    color: "rgba(255, 215, 0, 0.9)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            css={
                                                ProfileStyle.representativeTextStyle
                                            }
                                        >
                                            평균 유닛 스코어
                                        </div>
                                        <div css={ProfileStyle.frequencyValue}>
                                            {averageUnitScore?.toFixed(2) ??
                                                "N/A"}
                                        </div>
                                    </div>
                                    <div css={ProfileStyle.frequencyItem}>
                                        <div css={ProfileStyle.iconContainer}>
                                            <FaCrown2
                                                style={{
                                                    color: "rgba(255, 215, 0, 0.9)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            css={
                                                ProfileStyle.representativeTextStyle
                                            }
                                        >
                                            평균 상위유닛 제작 수
                                        </div>
                                        <div css={ProfileStyle.frequencyValue}>
                                            {averageTopUnitFrequency?.toFixed(
                                                2
                                            ) ?? "N/A"}
                                        </div>
                                    </div>
                                    <div css={ProfileStyle.frequencyItem}>
                                        <div css={ProfileStyle.iconContainer}>
                                            <FaBroom
                                                style={{
                                                    color: "rgba(255, 215, 0, 0.9)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            css={
                                                ProfileStyle.representativeTextStyle
                                            }
                                        >
                                            평균 유닛 카운트
                                        </div>
                                        <div css={ProfileStyle.frequencyValue}>
                                            {averageLineCount?.toFixed(2) ??
                                                "N/A"}
                                        </div>
                                    </div>
                                    <div css={ProfileStyle.frequencyItem}>
                                        <div css={ProfileStyle.iconContainer}>
                                            <FaSkull
                                                style={{
                                                    color: "rgba(255, 215, 0, 0.9)",
                                                }}
                                            />
                                        </div>
                                        <div
                                            css={
                                                ProfileStyle.representativeTextStyle
                                            }
                                        >
                                            유닛 카운트 0
                                        </div>
                                        <div css={ProfileStyle.frequencyValue}>
                                            {zeroLineCountClearCount}회
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 상위유닛 클리어 빈도 카드 */}
                            <div css={ProfileStyle.frequencySection}>
                                <div css={ProfileStyle.frequencyTitle}>
                                    <FaTrophy
                                        style={{
                                            color: "rgba(255, 215, 0, 0.9)",
                                        }}
                                    />
                                    상위유닛별 클리어 빈도
                                </div>
                                <div css={ProfileStyle.frequencyGrid}>
                                    {clearCountByTopUnitCount.map(data => (
                                        <div
                                            key={data.topUnitCount}
                                            css={ProfileStyle.frequencyItem}
                                        >
                                            <div
                                                css={
                                                    ProfileStyle.representativeTextStyle
                                                }
                                            >
                                                {data.topUnitCount} 상위
                                            </div>
                                            <div
                                                css={
                                                    ProfileStyle.frequencyValue
                                                }
                                            >
                                                {data.count}회 클리어
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 모달들 */}
            {showBadgeModal && (
                <BadgeListModal {...{ clickModal: onClickBadgeModal, user }} />
            )}
            {showClearSaveModal && (
                <ClearSaveModal
                    {...{
                        mode: "add",
                        clickModal: onClickClearSaveModal,
                        user,
                        lastClearCount,
                    }}
                />
            )}

            {/* 클리어 목록 */}
            <div css={clearDiv}>
                <ClearRecordList user={user} />
            </div>
        </div>
    );
}
