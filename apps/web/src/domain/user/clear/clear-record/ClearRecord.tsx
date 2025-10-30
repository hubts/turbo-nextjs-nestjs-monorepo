import { Clear, Unit, Navigation } from "@repo/database";
import { useState, useEffect } from "react";
import { GoCopy, GoImage, GoPencil } from "react-icons/go";
import { ClearSaveModal } from "../clear-save-modal/ClearSaveModal";
import {
    ClearType,
    COLOR,
    Grade,
    TopUnitGrade,
    TopUnitGrades,
    UserAndBadge,
} from "@repo/shared";
import { dateToBeforeDayOrTimeString } from "@repo/shared";
import Image from "next/image";
import { ClearRecordStyle } from "./ClearRecord.Style";
import { ImageModalContent } from "../clear-screenshot-modal/ImageModal";
import { FlipCard } from "@/src/components/card/FlipCard";
import { getUnitImageSrc } from "@/src/libs/get-image-src";
import ClearService from "@/src/api/services/clear.service";
import {
    FaCrown,
    FaSkull,
    FaClock,
    FaStar,
    FaLayerGroup,
    FaFlag,
    FaCalculator,
} from "react-icons/fa";
import { createPortal } from "react-dom";
import { groupUnitOptions } from "@/src/libs/group-unit-options";

export function ClearRecord(input: {
    user: UserAndBadge;
    clear: Clear;
    units: Unit[];
}) {
    const { user, clear, units } = input;

    // 유닛 옵션 추출 (이미 string[] 형태로 반환됨)
    const unitOptions = groupUnitOptions(
        units.filter(unit =>
            [...clear.unitIds, ...clear.subUnitIds].includes(unit.id)
        )
    );
    // console.log(unitOptions);

    // 항법지침 데이터
    const [navigations, setNavigations] = useState<Navigation[]>([]);
    useEffect(() => {
        ClearService.Instance.getNavigationList().then(setNavigations);
    }, []);

    // 클리어 수정 모달
    const [showModal, setShowModal] = useState(false);
    const onClickModal = () => setShowModal(!showModal);

    // 파일 업로드 진행률 상태
    const [uploadProgress, setUploadProgress] = useState<{
        screenshot: number;
        saveFile: number;
    }>({
        screenshot: 0,
        saveFile: 0,
    });

    // 파일 업로드 완료 상태
    const [uploadComplete, setUploadComplete] = useState<{
        screenshot: boolean;
        saveFile: boolean;
    }>({
        screenshot: false,
        saveFile: false,
    });

    // 클리어 세이브코드 복사
    const onClickCopyClipboard = async (text: string) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                const input = document.createElement("textarea");
                input.value = text;
                input.style.opacity = "0";
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
            }
            alert(`세이브 코드가 복사되었습니다.\n명령어: ${text}`);
        } catch (error) {
            alert(
                `세이브 코드 복사에 실패하였습니다.\n명령어: ${text}\nError: ${error}`
            );
        }
    };

    // 클리어 스크린샷 모달
    const [isThumbnailModal, setIsThumbnailModal] = useState(false);
    const showThumbnailModal = () => setIsThumbnailModal(prev => !prev);

    // 툴팁 상태 관리
    const [tooltipState, setTooltipState] = useState<{
        show: boolean;
        content: string;
        units?: Unit[];
        x: number;
        y: number;
    }>({
        show: false,
        content: "",
        x: 0,
        y: 0,
    });

    // 클리어한 유닛 목록의 등급 나열 문구
    const getUnitGradeCountingList = (
        unitIds: string[]
    ): {
        grade: Grade;
        count: number;
        isTop: boolean;
    }[] => {
        const gradeCount: { [key: string]: number } = {};
        unitIds.forEach(unitId => {
            const unit = units.find(unit => unit.id === unitId);
            if (unit) {
                gradeCount[unit.grade as Grade] =
                    (gradeCount[unit.grade as Grade] || 0) + 1;
            }
        });
        return Object.keys(gradeCount).map(grade => ({
            grade: grade as Grade,
            count: gradeCount[grade] ?? 0,
            isTop: TopUnitGrades.includes(grade as TopUnitGrade),
        }));
    };

    return (
        <div css={ClearRecordStyle.cardContainer}>
            {/* 메인 섹션: 클리어 정보 및 유닛들 */}
            <div css={ClearRecordStyle.mainSection}>
                {/* 클리어 헤더 정보 */}
                <div css={ClearRecordStyle.headerInfo}>
                    <div css={ClearRecordStyle.clearInfo}>
                        <div css={ClearRecordStyle.clearCountBadge}>
                            <FaCrown css={ClearRecordStyle.crownIcon} />
                            <span css={ClearRecordStyle.clearCountText}>
                                {clear.count}회차
                            </span>
                        </div>
                        <div
                            css={ClearRecordStyle.clearTypeBadge(
                                clear.type as ClearType
                            )}
                        >
                            <FaSkull css={ClearRecordStyle.typeIcon} />
                            <span>{clear.type}</span>
                        </div>
                        {clear.navigationId &&
                            (() => {
                                const navigation = navigations.find(
                                    nav => nav.id === clear.navigationId
                                );
                                return navigation ? (
                                    <div css={ClearRecordStyle.navigationTag}>
                                        <FaLayerGroup
                                            css={
                                                ClearRecordStyle.navigationIcon
                                            }
                                        />
                                        <span>{`${navigation.category}/${navigation.name}`}</span>
                                    </div>
                                ) : null;
                            })()}
                        <div css={ClearRecordStyle.unitScoreTag}>
                            <FaFlag css={ClearRecordStyle.unitScoreIcon} />
                            <span>
                                유닛 스코어:{" "}
                                {clear.unitScore
                                    ? clear.unitScore.toFixed(1)
                                    : 0}
                            </span>
                        </div>
                        <div css={ClearRecordStyle.unitCountTag}>
                            <FaCalculator
                                css={ClearRecordStyle.unitCountIcon}
                            />
                            <span>유닛 카운트: {clear.lineCount || 0}</span>
                        </div>
                    </div>
                    <div css={ClearRecordStyle.headerRightSection}>
                        <div css={ClearRecordStyle.timeInfo}>
                            <FaClock css={ClearRecordStyle.clockIcon} />
                            <span css={ClearRecordStyle.timeText}>
                                {dateToBeforeDayOrTimeString(clear.createdAt)}
                            </span>
                        </div>
                        <div css={ClearRecordStyle.headerActions}>
                            {clear.saveCode && (
                                <button
                                    onClick={() =>
                                        onClickCopyClipboard(
                                            clear.saveCode as string
                                        )
                                    }
                                    css={ClearRecordStyle.headerActionButton}
                                    title="세이브 코드 복사"
                                >
                                    <GoCopy
                                        css={ClearRecordStyle.headerButtonIcon}
                                    />
                                </button>
                            )}

                            <button
                                css={
                                    clear.imgPath || uploadComplete.screenshot
                                        ? ClearRecordStyle.headerActionButton
                                        : ClearRecordStyle.headerActionButtonDisabled
                                }
                                onClick={
                                    clear.imgPath
                                        ? showThumbnailModal
                                        : undefined
                                }
                                title={
                                    clear.imgPath
                                        ? "스크린샷 보기"
                                        : "스크린샷 없음"
                                }
                            >
                                <GoImage
                                    css={ClearRecordStyle.headerButtonIcon}
                                />
                            </button>

                            <button
                                onClick={onClickModal}
                                css={ClearRecordStyle.headerActionButton}
                                title="클리어 수정"
                            >
                                <GoPencil
                                    css={ClearRecordStyle.headerButtonIcon}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 유닛 옵션 영역 */}
                {unitOptions.length > 0 && (
                    <div css={ClearRecordStyle.unitOptionsMainSection}>
                        <div css={ClearRecordStyle.unitOptionsContent}>
                            {unitOptions.map((categoryData, index) => (
                                <div
                                    key={index}
                                    css={ClearRecordStyle.unitOptionCategory}
                                >
                                    <div
                                        css={
                                            ClearRecordStyle.unitOptionCategoryTitle
                                        }
                                    >
                                        {categoryData.category}
                                    </div>
                                    <div
                                        css={
                                            ClearRecordStyle.unitOptionCategoryItems
                                        }
                                    >
                                        {categoryData.data.map(
                                            (data, dataIndex) => (
                                                <div
                                                    key={dataIndex}
                                                    css={
                                                        ClearRecordStyle.unitOptionItem
                                                    }
                                                    onMouseEnter={e => {
                                                        const rect =
                                                            e.currentTarget.getBoundingClientRect();
                                                        setTooltipState({
                                                            show: true,
                                                            content: data.units
                                                                .map(
                                                                    unit =>
                                                                        `${unit.name} [${unit.grade}]`
                                                                )
                                                                .join(", "),
                                                            units: data.units,
                                                            x:
                                                                rect.left +
                                                                rect.width / 2,
                                                            y: rect.top - 10,
                                                        });
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTooltipState(
                                                            prev => ({
                                                                ...prev,
                                                                show: false,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    {data.value}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 유닛 카드들 */}
                <div css={ClearRecordStyle.unitsSection}>
                    <div css={ClearRecordStyle.unitsHeader}>
                        <div css={ClearRecordStyle.unitsCountContainer}>
                            <FaStar css={ClearRecordStyle.starIcon} />
                            <div css={ClearRecordStyle.gradeTagsContainer}>
                                {getUnitGradeCountingList([
                                    ...clear.unitIds,
                                    ...clear.subUnitIds,
                                ]).map((gradeInfo, index) => {
                                    // 상위유닛 등급인지 확인
                                    const isTopUnit = gradeInfo.isTop;
                                    return (
                                        <div
                                            key={index}
                                            css={ClearRecordStyle.gradeTag(
                                                gradeInfo.grade,
                                                isTopUnit
                                            )}
                                        >
                                            <span
                                                css={ClearRecordStyle.gradeName}
                                            >
                                                {gradeInfo.grade}
                                            </span>
                                            <span
                                                css={
                                                    ClearRecordStyle.gradeCount
                                                }
                                            >
                                                {gradeInfo.count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div css={ClearRecordStyle.unitsGrid}>
                        {[...clear.unitIds, ...clear.subUnitIds]
                            .map(unitId => {
                                return units.find(unit => unit.id === unitId);
                            })
                            .filter(unit => !!unit)
                            .map((unit, index) => {
                                const isTopUnit = TopUnitGrades.includes(
                                    unit?.grade as TopUnitGrade
                                );
                                return (
                                    <FlipCard
                                        key={index}
                                        front={
                                            <Image
                                                css={ClearRecordStyle.unitImage}
                                                src={getUnitImageSrc(
                                                    "unitFull",
                                                    unit?.name,
                                                    unit?.grade
                                                )}
                                                alt={"unit"}
                                                layout="fill"
                                                objectFit="cover"
                                                objectPosition="center"
                                            />
                                        }
                                        back={
                                            <div
                                                css={ClearRecordStyle.unitName}
                                            >
                                                <div>{unit?.name}</div>
                                                <div
                                                    css={
                                                        ClearRecordStyle.unitGrade
                                                    }
                                                >
                                                    {`[${unit?.grade}]`}
                                                </div>
                                            </div>
                                        }
                                        cardStyle={{
                                            width: 90,
                                            height: 150,
                                            backStyle:
                                                ClearRecordStyle.cardBackStyle({
                                                    fontSize: 14,
                                                    grade: unit?.grade,
                                                }),
                                            border: isTopUnit
                                                ? `3px solid ${COLOR[unit?.grade as Grade]}`
                                                : `2px solid ${COLOR[unit?.grade as Grade] || "rgba(255, 255, 255, 0.3)"}`,
                                            isTopUnit: isTopUnit,
                                            grade: unit?.grade,
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>

            {/* 툴팁 */}
            {tooltipState.show &&
                createPortal(
                    <div
                        css={{
                            position: "fixed",
                            left: tooltipState.x,
                            top: tooltipState.y,
                            transform: "translateX(-50%) translateY(-100%)",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            maxWidth: "300px",
                            wordWrap: "break-word",
                            zIndex: 1000,
                            border: "1px solid rgba(255, 215, 0, 0.3)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                            pointerEvents: "none",
                        }}
                    >
                        {tooltipState.units?.map((unit, index) => (
                            <div key={index} style={{ marginBottom: "2px" }}>
                                <span
                                    style={{
                                        color: COLOR[unit.grade as Grade],
                                    }}
                                >
                                    • {unit.name} [{unit.grade}]
                                </span>
                            </div>
                        )) || tooltipState.content}
                    </div>,
                    document.body
                )}

            {/* 모달들 */}
            {isThumbnailModal &&
                clear.imgPath &&
                createPortal(
                    <ImageModalContent
                        onClose={() => setIsThumbnailModal(false)}
                    >
                        <Image
                            src={
                                process.env.NODE_ENV === "development"
                                    ? clear.imgPath.replace(
                                          "apps/api/uploads",
                                          "uploads"
                                      )
                                    : clear.imgPath
                            }
                            fill
                            objectFit="contain"
                            alt="이미지 전체화면"
                            loading="lazy"
                        />
                    </ImageModalContent>,
                    document.body
                )}
            {showModal && (
                <ClearSaveModal
                    {...{
                        mode: "edit",
                        clickModal: onClickModal,
                        user,
                        units,
                        lastClearCount: 0, // unused
                        existingClear: clear,
                        onUploadProgress: (type, progress) => {
                            setUploadProgress(prev => ({
                                ...prev,
                                [type]: progress,
                            }));
                        },
                        onUploadComplete: type => {
                            setUploadComplete(prev => ({
                                ...prev,
                                [type]: true,
                            }));
                        },
                    }}
                />
            )}
        </div>
    );
}
