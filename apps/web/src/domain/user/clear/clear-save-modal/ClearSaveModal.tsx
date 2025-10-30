import Router, { useRouter } from "next/router";
import { Clear, Navigation, Unit } from "@repo/database";
import Select from "react-select";
import { useCallback, useEffect, useState } from "react";
import { AxiosError, AxiosProgressEvent } from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { createPortal } from "react-dom";
import React from "react";
import { UnitImageAndName } from "../../../unit/UnitImageName";
import {
    backgroundDiv,
    clearCountDiv,
    clearCountInput,
    clearTypeButton,
    clearTypeDiv,
    closeButtonStyle,
    finishSaveButton,
    modalDiv,
    titleStyle,
    topUnitSelect,
    topUnitSelectDiv,
    topUnitSelectedListDiv,
    topUnitSelectedListItemDiv,
    topUnitSelectedListItemRemoveButton,
    topUnitSelectedText,
    threeColumnLayout,
    leftColumn,
    centerColumn,
    rightColumn,
    bottomActionsContainer,
    actionButton,
    statInput,
    statInputDiv,
    saveFileLinkContainer,
    saveFileInfoContainer,
    saveFileIconContainer,
    saveFileTextContainer,
    saveFileTitle,
    saveFileName,
    saveFileDownloadButton,
    screenshotPreviewContainer,
    screenshotPreviewContent,
    screenshotPreviewHeader,
    screenshotIconContainer,
    screenshotTextContainer,
    screenshotTitle,
    screenshotDescription,
    screenshotImageContainer,
    screenshotImage,
    screenshotZoomIcon,
    loadingBar,
    completeOverlay,
    buttonBase,
    navigationDiv,
    navigationGridContainer,
    navigationButton,
    navigationCategoryLabel,
    navigationCategoryDivider,
    navigationTooltipContainer,
    navigationTooltip,
    navigationTooltipVisible,
    navigationTooltipTitle,
    navigationTooltipDescription,
    navigationTooltipPenalty,
    navigationIcon,
} from "./ClearSaveModal.Style";
import Image from "next/image";
import {
    ClearCreateInput,
    ClearType,
    ClearTypeEnum,
    ClearUpdateInput,
    SubUnitGrade,
    SubUnitGrades,
    TopUnitGrade,
    TopUnitGrades,
    UserAndBadge,
} from "@repo/shared";
import UnitService from "@/src/api/services/unit.service";
import ClearService from "@/src/api/services/clear.service";
import { unitFullname } from "@/src/libs/unit-fullname";
import { getNavigationImageSrc } from "@/src/libs/get-image-src";
import { ImageModalContent } from "../clear-screenshot-modal/ImageModal";
import { extname } from "path";
import { FaSave, FaCamera, FaFileUpload } from "react-icons/fa";
import { groupNavigationsByCategory } from "@/src/libs/group-navigations";
import { preventModalOutsideScroll } from "@/src/libs/prevent-modal-outside-scroll";

export function ClearSaveModal(input: {
    mode: "add" | "edit";
    clickModal: () => void;
    user: UserAndBadge;
    lastClearCount: number;
    existingClear?: Clear;
    units?: Unit[];
    onUploadProgress?: (
        type: "screenshot" | "saveFile",
        progress: number
    ) => void;
    onUploadComplete?: (type: "screenshot" | "saveFile") => void;
}) {
    const {
        mode,
        clickModal,
        user,
        existingClear,
        lastClearCount,
        units: passedUnits,
    } = input;

    // 페이지 쿼리 파라미터 조회
    const router = useRouter();
    const { page } = router.query;

    // 모달 바깥 스크롤 방지
    useEffect(() => {
        const cleanup = preventModalOutsideScroll();
        return cleanup;
    }, []);

    // 유닛 전체 호출
    const [topUnits, setTopUnits] = useState<Unit[]>(
        passedUnits
            ? passedUnits.filter(unit =>
                  TopUnitGrades.includes(unit.grade as TopUnitGrade)
              )
            : []
    );
    const [subUnits, setSubUnits] = useState<Unit[]>(
        passedUnits
            ? passedUnits.filter(unit =>
                  SubUnitGrades.includes(unit.grade as SubUnitGrade)
              )
            : []
    );
    useEffect(() => {
        UnitService.Instance.getUnits().then(units => {
            setTopUnits(
                units.filter(unit =>
                    TopUnitGrades.includes(unit.grade as TopUnitGrade)
                )
            );
            setSubUnits(
                units.filter(unit =>
                    SubUnitGrades.includes(unit.grade as SubUnitGrade)
                )
            );
        });
    }, []);

    // 항법지침 전체 호출
    const [navigations, setNavigations] = useState<Navigation[]>([]);
    useEffect(() => {
        ClearService.Instance.getNavigationList().then(setNavigations);
    }, []);

    // 클리어 데이터 초기 값
    const initClearData: ClearCreateInput = {
        userId: user.userId,
        count: lastClearCount + 1,
        type: ClearTypeEnum.물딜,
        unitIds: [],
        subUnitIds: [],
        lineCount: null,
        unitScore: null,
        imgPath: null,
        savePath: null,
        navigationId: null,
    };

    // 클리어 데이터
    const [clearData, setClearData] = useState<ClearCreateInput>(
        existingClear ?? initClearData
    );

    // 이미지 업로드
    const [imgPath, setImagePath] = useState<string>(
        existingClear?.imgPath ? existingClear.imgPath : ""
    );
    const [progress, setProgress] = useState<number>(0);
    const onChange = useCallback(
        async (formData: FormData) => {
            setProgress(0);
            setUploadComplete(prev => ({
                ...prev,
                screenshot: false,
            }));
            try {
                const uploadedImgPath =
                    await ClearService.Instance.uploadClearScreenshot(
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            onUploadProgress: (event: AxiosProgressEvent) => {
                                const { loaded, total } = event;
                                const progress = Math.round(
                                    (loaded * 100) / (total ?? 100)
                                );
                                setProgress(progress);
                                input.onUploadProgress?.(
                                    "screenshot",
                                    progress
                                );
                            },
                        }
                    );
                if (!uploadedImgPath) {
                    alert("이미지 업로드에 실패하였습니다.");
                    return;
                }
                setImagePath(uploadedImgPath);
                setClearData(prev => ({
                    ...prev,
                    imgPath: uploadedImgPath,
                }));

                // 스크린샷 미리보기 URL 설정
                setScreenshotPreviewUrl(uploadedImgPath);

                // 업로드 완료 상태 설정
                setUploadComplete(prev => ({
                    ...prev,
                    screenshot: true,
                }));

                input.onUploadComplete?.("screenshot");
            } catch (e) {
                const error = e as AxiosError;
                alert(
                    `이미지 업로드에 실패하였습니다.\nError:${JSON.stringify(error.response?.data)}`
                );
                return;
            }
        },
        [input.onUploadProgress, input.onUploadComplete]
    );

    // 세이브 파일 업로드
    const [savePath, setSavePath] = useState<string>(
        existingClear?.savePath ? existingClear.savePath : ""
    );
    const [saveFilename, setSaveFilename] = useState<string>(
        existingClear?.savePath
            ? (existingClear.savePath.split("/").pop() ?? "")
            : ""
    );
    const [saveProgress, setSaveProgress] = useState<number>(0);
    const onChangeSaveFile = useCallback(
        async (formData: FormData) => {
            // 파일 .ZIP 검사
            const file = formData.get("file") as File;
            if (extname(file.name) !== ".zip") {
                alert("세이브 파일은 압축파일(.zip)만 업로드 가능합니다.");
                return;
            }

            setSaveFilename(file.name);
            setSaveProgress(0);
            setUploadComplete(prev => ({
                ...prev,
                saveFile: false,
            }));
            try {
                const uploadedSavePath =
                    await ClearService.Instance.uploadSaveFile(formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (event: AxiosProgressEvent) => {
                            const { loaded, total } = event;
                            const progress = Math.round(
                                (loaded * 100) / (total ?? 100)
                            );
                            setSaveProgress(progress);
                            input.onUploadProgress?.("saveFile", progress);
                        },
                    });
                if (!uploadedSavePath) {
                    alert("세이브 파일 업로드에 실패하였습니다.");
                    return;
                }
                setSavePath(uploadedSavePath);
                setClearData(prev => ({
                    ...prev,
                    savePath: uploadedSavePath,
                }));

                // 업로드 완료 상태 설정
                setUploadComplete(prev => ({
                    ...prev,
                    saveFile: true,
                }));

                input.onUploadComplete?.("saveFile");
            } catch (e) {
                const error = e as AxiosError;
                alert(
                    `세이브 파일 업로드에 실패하였습니다.\nError: ${error.response?.data}`
                );
            }
        },
        [input.onUploadProgress, input.onUploadComplete]
    );

    // 스크린샷 미리보기 및 모달 상태
    const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
    const [screenshotPreviewUrl, setScreenshotPreviewUrl] =
        useState<string>("");

    // 업로드 완료 상태
    const [uploadComplete, setUploadComplete] = useState<{
        screenshot: boolean;
        saveFile: boolean;
    }>({
        screenshot: false,
        saveFile: false,
    });

    // 툴팁 상태
    const [tooltipState, setTooltipState] = useState<{
        isVisible: boolean;
        navigation: Navigation | null;
        position: { x: number; y: number; showAbove: boolean };
    }>({
        isVisible: false,
        navigation: null,
        position: { x: 0, y: 0, showAbove: true },
    });

    // 툴팁 위치 계산 함수
    const calculateTooltipPosition = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const tooltipWidth = 300;
        const tooltipHeight = 120; // 예상 높이

        let x = rect.left + rect.width / 2 - tooltipWidth / 2;
        let y = rect.top - tooltipHeight - 4; // 간격을 4px로 줄임
        let showAbove = true;

        // 화면 경계 체크
        if (x < 20) x = 20;
        if (x + tooltipWidth > window.innerWidth - 20) {
            x = window.innerWidth - tooltipWidth - 20;
        }

        // 위쪽 공간이 부족하면 아래쪽에 표시
        if (y < 20) {
            y = rect.bottom + 4; // 간격을 4px로 줄임
            showAbove = false;
        }

        return { x, y, showAbove };
    };

    // 기존 스크린샷이 있을 때 미리보기 URL 설정
    useEffect(() => {
        if (existingClear?.imgPath) {
            // TODO: development 환경에서는 Path가 다름
            const previewUrl =
                process.env.NODE_ENV === "development"
                    ? existingClear.imgPath.replace(
                          "apps/api/uploads/",
                          "uploads/"
                      )
                    : existingClear.imgPath;
            setScreenshotPreviewUrl(previewUrl);
        }
    }, [existingClear?.imgPath]);

    // 유닛 선택 후 유닛 박스에 추가
    const addClearUnitId = (unitId: string, isTop?: boolean) => {
        if (isTop) {
            setClearData({
                ...clearData,
                unitIds: [...clearData.unitIds, unitId],
            });
        } else {
            setClearData({
                ...clearData,
                subUnitIds: [...clearData.subUnitIds, unitId],
            });
        }
    };

    // 유닛 박스에서 제거
    const removeClearUnitId = (index: number) => {
        const isTopUnitToBeRemoved = index < clearData.unitIds.length;
        const clearUnitIds = isTopUnitToBeRemoved
            ? clearData.unitIds
            : clearData.subUnitIds;
        clearUnitIds.splice(
            isTopUnitToBeRemoved ? index : index - clearData.unitIds.length,
            1
        );
        setClearData({
            ...clearData,
            ...(isTopUnitToBeRemoved
                ? { unitIds: [...clearUnitIds] }
                : { subUnitIds: [...clearUnitIds] }),
        });
    };

    // 클리어 등록/변경 함수
    const saveClear = async () => {
        try {
            if (imgPath) {
                clearData.imgPath = imgPath;
            }
            if (savePath) {
                clearData.savePath = savePath;
            }
            if (mode === "add") {
                await ClearService.Instance.saveNewClear(clearData);
            } else {
                const clearUpdateData: ClearUpdateInput = {
                    id: existingClear!.id,
                    count: clearData.count,
                    type: clearData.type as ClearType,
                    unitIds: clearData.unitIds,
                    subUnitIds: clearData.subUnitIds,
                    lineCount: clearData.lineCount,
                    unitScore: clearData.unitScore,
                    imgPath: clearData.imgPath,
                    savePath: clearData.savePath,
                    navigationId: clearData.navigationId,
                };
                await ClearService.Instance.updateClear(clearUpdateData);
            }
        } catch (e) {
            const error = e as AxiosError;
            alert(
                `클리어 저장에 실패하였습니다.\n${JSON.stringify(
                    error.response?.data
                )}`
            );
        } finally {
            clickModal();
            Router.push(
                {
                    pathname: router.pathname,
                    query: {
                        id: user.userId,
                        page: 0,
                    },
                },
                undefined,
                {
                    shallow: true,
                    scroll: false,
                }
            ).then(() => window.location.reload());
        }
    };

    return (
        <>
            {createPortal(
                <div css={backgroundDiv} onClick={clickModal}>
                    <div
                        css={modalDiv}
                        data-modal="true"
                        onClick={e => e.stopPropagation()}
                    >
                        <button css={closeButtonStyle} onClick={clickModal}>
                            <IoMdCloseCircle />
                        </button>

                        <div css={threeColumnLayout}>
                            {/* 좌측 컬럼 */}
                            <div css={leftColumn}>
                                <div css={clearCountDiv}>
                                    <span css={titleStyle}>클리어 회차</span>
                                    <input
                                        css={clearCountInput}
                                        type="number"
                                        placeholder="클리어 회차"
                                        value={clearData.count}
                                        onChange={e =>
                                            setClearData({
                                                ...clearData,
                                                count: e.target.value
                                                    ? parseInt(e.target.value)
                                                    : clearData.count,
                                            })
                                        }
                                    />
                                </div>

                                <div css={clearTypeDiv}>
                                    <span css={titleStyle}>클리어 타입</span>
                                    <button
                                        css={clearTypeButton(
                                            clearData.type as ClearType
                                        )}
                                        onClick={() => {
                                            setClearData({
                                                ...clearData,
                                                type:
                                                    clearData.type === "물딜"
                                                        ? "마딜"
                                                        : "물딜",
                                            });
                                        }}
                                    >
                                        {clearData.type}
                                    </button>
                                </div>

                                <div css={statInputDiv}>
                                    <span css={titleStyle}>
                                        유닛 스코어 (선택)
                                    </span>
                                    <input
                                        css={statInput}
                                        type="number"
                                        placeholder="유닛 스코어 - 미입력 시 자동 계산"
                                        value={clearData.unitScore ?? ""}
                                        onChange={e =>
                                            setClearData({
                                                ...clearData,
                                                unitScore: e.target.value
                                                    ? parseInt(e.target.value)
                                                    : null,
                                            })
                                        }
                                    />
                                </div>

                                <div css={statInputDiv}>
                                    <span css={titleStyle}>
                                        유닛 카운트 (선택)
                                    </span>
                                    <input
                                        css={statInput}
                                        type="number"
                                        placeholder="유닛 카운트 수"
                                        value={clearData.lineCount ?? ""}
                                        onChange={e =>
                                            setClearData({
                                                ...clearData,
                                                lineCount: e.target.value
                                                    ? parseInt(e.target.value)
                                                    : null,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {/* 중앙 컬럼 */}
                            <div css={centerColumn}>
                                <div css={navigationDiv}>
                                    <span css={titleStyle}>항법지침</span>
                                    <div css={navigationGridContainer}>
                                        {(() => {
                                            // 항법지침을 카테고리별로 그룹화
                                            const groupedNavigations =
                                                groupNavigationsByCategory(
                                                    navigations
                                                );
                                            const categories =
                                                Object.keys(groupedNavigations);
                                            const result: React.ReactElement[] =
                                                [];

                                            categories.forEach(
                                                (category, categoryIndex) => {
                                                    // 카테고리 라벨 추가
                                                    result.push(
                                                        <div
                                                            key={`label-${category}`}
                                                            css={
                                                                navigationCategoryLabel
                                                            }
                                                        >
                                                            {category}
                                                        </div>
                                                    );

                                                    // 카테고리별로 3개씩 그룹화하여 4행으로 표시
                                                    const categoryNavigations =
                                                        groupedNavigations[
                                                            category
                                                        ];
                                                    if (!categoryNavigations)
                                                        return;

                                                    const rows = Math.ceil(
                                                        categoryNavigations.length /
                                                            3
                                                    );

                                                    for (
                                                        let row = 0;
                                                        row < rows;
                                                        row++
                                                    ) {
                                                        const rowNavigations =
                                                            categoryNavigations.slice(
                                                                row * 3,
                                                                (row + 1) * 3
                                                            );

                                                        rowNavigations.forEach(
                                                            nav => {
                                                                result.push(
                                                                    <div
                                                                        key={
                                                                            nav.id
                                                                        }
                                                                        css={
                                                                            navigationTooltipContainer
                                                                        }
                                                                        onMouseEnter={e => {
                                                                            const position =
                                                                                calculateTooltipPosition(
                                                                                    e
                                                                                );
                                                                            setTooltipState(
                                                                                {
                                                                                    isVisible: true,
                                                                                    navigation:
                                                                                        nav,
                                                                                    position,
                                                                                }
                                                                            );
                                                                        }}
                                                                        onMouseLeave={() => {
                                                                            setTooltipState(
                                                                                {
                                                                                    isVisible: false,
                                                                                    navigation:
                                                                                        null,
                                                                                    position:
                                                                                        {
                                                                                            x: 0,
                                                                                            y: 0,
                                                                                            showAbove: true,
                                                                                        },
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <button
                                                                            css={navigationButton(
                                                                                clearData.navigationId ===
                                                                                    nav.id
                                                                            )}
                                                                            onClick={() => {
                                                                                setClearData(
                                                                                    {
                                                                                        ...clearData,
                                                                                        navigationId:
                                                                                            clearData.navigationId ===
                                                                                            nav.id
                                                                                                ? null
                                                                                                : nav.id,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Image
                                                                                src={getNavigationImageSrc(
                                                                                    nav.category,
                                                                                    nav.name
                                                                                )}
                                                                                alt={
                                                                                    nav.name
                                                                                }
                                                                                width={
                                                                                    24
                                                                                }
                                                                                height={
                                                                                    24
                                                                                }
                                                                                css={
                                                                                    navigationIcon
                                                                                }
                                                                                onError={e => {
                                                                                    // 이미지 로드 실패 시 기본 아이콘 표시
                                                                                    e.currentTarget.style.display =
                                                                                        "none";
                                                                                }}
                                                                            />
                                                                            <span>
                                                                                {
                                                                                    nav.name
                                                                                }
                                                                            </span>
                                                                        </button>
                                                                        {tooltipState.isVisible &&
                                                                            tooltipState
                                                                                .navigation
                                                                                ?.id ===
                                                                                nav.id &&
                                                                            createPortal(
                                                                                <div
                                                                                    css={[
                                                                                        navigationTooltip,
                                                                                        navigationTooltipVisible,
                                                                                    ]}
                                                                                    style={{
                                                                                        left: `${tooltipState.position.x}px`,
                                                                                        top: `${tooltipState.position.y}px`,
                                                                                        transform:
                                                                                            "translateX(-50%)",
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        css={
                                                                                            navigationTooltipTitle
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            nav.name
                                                                                        }
                                                                                    </div>
                                                                                    {nav.description && (
                                                                                        <div
                                                                                            css={
                                                                                                navigationTooltipDescription
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                nav.description
                                                                                            }
                                                                                        </div>
                                                                                    )}
                                                                                    {nav.fenalty && (
                                                                                        <div
                                                                                            css={
                                                                                                navigationTooltipPenalty
                                                                                            }
                                                                                        >
                                                                                            <span>
                                                                                                ⚠️
                                                                                                페널티
                                                                                            </span>
                                                                                            <div
                                                                                                style={{
                                                                                                    marginTop:
                                                                                                        "4px",
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    nav.fenalty
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>,
                                                                                document.body
                                                                            )}
                                                                    </div>
                                                                );
                                                            }
                                                        );

                                                        // 3개 미만인 경우 빈 공간 채우기
                                                        for (
                                                            let i =
                                                                rowNavigations.length;
                                                            i < 3;
                                                            i++
                                                        ) {
                                                            result.push(
                                                                <div
                                                                    key={`empty-${category}-${row}-${i}`}
                                                                />
                                                            );
                                                        }
                                                    }

                                                    // 카테고리 구분선 추가 (마지막 카테고리가 아닌 경우)
                                                    if (
                                                        categoryIndex <
                                                        categories.length - 1
                                                    ) {
                                                        result.push(
                                                            <div
                                                                key={`divider-${category}`}
                                                                css={
                                                                    navigationCategoryDivider
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            );

                                            return result;
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* 우측 컬럼 */}
                            <div css={rightColumn}>
                                {/* 상위유닛 Select */}
                                <div css={topUnitSelectDiv}>
                                    <span css={titleStyle}>제작 상위유닛</span>
                                    <Select
                                        css={topUnitSelect}
                                        placeholder="상위유닛 선택하기"
                                        options={topUnits.map(unit => ({
                                            value: unit.id,
                                            label: unitFullname(unit),
                                        }))}
                                        value={null}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                        formatOptionLabel={option => (
                                            <UnitImageAndName
                                                unit={
                                                    topUnits.find(
                                                        unit =>
                                                            unit.id ===
                                                            option!.value
                                                    )!
                                                }
                                                imageWidth={24}
                                                imageHeight={24}
                                                options={{
                                                    fontSize: 16,
                                                }}
                                            />
                                        )}
                                        onChange={selected => {
                                            if (selected) {
                                                addClearUnitId(
                                                    selected.value,
                                                    true
                                                );
                                            }
                                        }}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.3)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                borderRadius: "12px",
                                                minHeight: "48px",
                                                boxShadow: "none",
                                                transition:
                                                    "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    borderColor:
                                                        "rgba(255, 215, 0, 0.3)",
                                                },
                                                ...(state.isFocused && {
                                                    borderColor:
                                                        "rgba(255, 215, 0, 0.5)",
                                                    boxShadow:
                                                        "0 0 0 3px rgba(255, 215, 0, 0.1)",
                                                }),
                                            }),
                                            menu: provided => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(26, 26, 46, 0.95)",
                                                border: "1px solid rgba(255, 215, 0, 0.2)",
                                                borderRadius: "12px",
                                                backdropFilter: "blur(10px)",
                                                boxShadow:
                                                    "0 8px 32px rgba(0, 0, 0, 0.3)",
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor:
                                                    state.isSelected
                                                        ? "rgba(255, 215, 0, 0.2)"
                                                        : state.isFocused
                                                          ? "rgba(255, 215, 0, 0.1)"
                                                          : "transparent",
                                                color: state.isSelected
                                                    ? "rgba(255, 215, 0, 0.9)"
                                                    : "rgba(255, 255, 255, 0.9)",
                                                padding: "16px 20px",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                transition:
                                                    "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(255, 215, 0, 0.1)",
                                                },
                                            }),
                                            placeholder: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.5)",
                                                fontSize: "16px",
                                            }),
                                            singleValue: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.9)",
                                                fontSize: "16px",
                                            }),
                                            indicatorSeparator: provided => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(255, 255, 255, 0.2)",
                                            }),
                                            dropdownIndicator: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.6)",
                                                "&:hover": {
                                                    color: "rgba(255, 215, 0, 0.8)",
                                                },
                                            }),
                                            input: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.9)",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                            }),
                                        }}
                                    />
                                </div>
                                {/* 하위유닛 Select */}
                                <div css={topUnitSelectDiv}>
                                    <span css={titleStyle}>제작 하위유닛</span>
                                    <Select
                                        css={topUnitSelect}
                                        placeholder="하위유닛 선택하기"
                                        options={subUnits.map(unit => ({
                                            value: unit.id,
                                            label: unitFullname(unit),
                                        }))}
                                        value={null}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                        formatOptionLabel={option => (
                                            <UnitImageAndName
                                                unit={
                                                    subUnits.find(
                                                        unit =>
                                                            unit.id ===
                                                            option!.value
                                                    )!
                                                }
                                                imageWidth={24}
                                                imageHeight={24}
                                                options={{
                                                    fontSize: 16,
                                                }}
                                            />
                                        )}
                                        onChange={selected => {
                                            if (selected) {
                                                addClearUnitId(
                                                    selected.value,
                                                    false
                                                );
                                            }
                                        }}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.3)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                borderRadius: "12px",
                                                minHeight: "48px",
                                                boxShadow: "none",
                                                transition:
                                                    "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    borderColor:
                                                        "rgba(255, 215, 0, 0.3)",
                                                },
                                                ...(state.isFocused && {
                                                    borderColor:
                                                        "rgba(255, 215, 0, 0.5)",
                                                    boxShadow:
                                                        "0 0 0 3px rgba(255, 215, 0, 0.1)",
                                                }),
                                            }),
                                            menu: provided => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(26, 26, 46, 0.95)",
                                                border: "1px solid rgba(255, 215, 0, 0.2)",
                                                borderRadius: "12px",
                                                backdropFilter: "blur(10px)",
                                                boxShadow:
                                                    "0 8px 32px rgba(0, 0, 0, 0.3)",
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor:
                                                    state.isSelected
                                                        ? "rgba(255, 215, 0, 0.2)"
                                                        : state.isFocused
                                                          ? "rgba(255, 215, 0, 0.1)"
                                                          : "transparent",
                                                color: state.isSelected
                                                    ? "rgba(255, 215, 0, 0.9)"
                                                    : "rgba(255, 255, 255, 0.9)",
                                                padding: "16px 20px",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                transition:
                                                    "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(255, 215, 0, 0.1)",
                                                },
                                            }),
                                            placeholder: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.5)",
                                                fontSize: "16px",
                                            }),
                                            singleValue: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.9)",
                                                fontSize: "16px",
                                            }),
                                            indicatorSeparator: provided => ({
                                                ...provided,
                                                backgroundColor:
                                                    "rgba(255, 255, 255, 0.2)",
                                            }),
                                            dropdownIndicator: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.6)",
                                                "&:hover": {
                                                    color: "rgba(255, 215, 0, 0.8)",
                                                },
                                            }),
                                            input: provided => ({
                                                ...provided,
                                                color: "rgba(255, 255, 255, 0.9)",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                            }),
                                        }}
                                    />
                                </div>
                                {/* 유닛 선택 개수 표시 */}
                                <div css={topUnitSelectedText}>
                                    총{" "}
                                    {clearData.unitIds.length +
                                        clearData.subUnitIds.length}
                                    개의 유닛 선택됨
                                </div>
                                {/* 유닛 선택 박스 */}
                                <div css={topUnitSelectedListDiv()}>
                                    {clearData.unitIds.length === 0 &&
                                    clearData.subUnitIds.length === 0 ? (
                                        <div
                                            css={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%",
                                                color: "rgba(255, 255, 255, 0.5)",
                                                fontSize: "16px",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            선택된 유닛이 없습니다.
                                        </div>
                                    ) : (
                                        [
                                            ...clearData.unitIds,
                                            ...clearData.subUnitIds,
                                        ]
                                            .map(unitId => {
                                                return [
                                                    ...topUnits,
                                                    ...subUnits,
                                                ].find(
                                                    unit => unit.id === unitId
                                                );
                                            })
                                            .filter(unit => !!unit)
                                            .map((unit, index) => (
                                                <div
                                                    key={`${unit.id}${index}`}
                                                    css={
                                                        topUnitSelectedListItemDiv
                                                    }
                                                >
                                                    <UnitImageAndName
                                                        unit={unit}
                                                        imageWidth={20}
                                                        imageHeight={20}
                                                        options={{
                                                            width: 0,
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                    <MdOutlineCancelPresentation
                                                        css={
                                                            topUnitSelectedListItemRemoveButton
                                                        }
                                                        onClick={() =>
                                                            removeClearUnitId(
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))
                                    )}
                                </div>
                                {/* 파일 링크 표시 영역 */}
                                {(savePath || saveFilename) && (
                                    <div css={saveFileLinkContainer}>
                                        <div css={saveFileInfoContainer}>
                                            <div css={saveFileIconContainer}>
                                                📁
                                            </div>
                                            <div css={saveFileTextContainer}>
                                                <div css={saveFileTitle}>
                                                    세이브 파일
                                                </div>
                                                <div css={saveFileName}>
                                                    {saveFilename ||
                                                        "다운로드 가능"}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            css={saveFileDownloadButton}
                                            onClick={() => {
                                                window.open(
                                                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${savePath}`,
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            <span>⬇️</span>
                                            다운로드
                                        </button>
                                    </div>
                                )}
                                {/* 스크린샷 미리보기 영역 */}
                                {screenshotPreviewUrl && (
                                    <div css={screenshotPreviewContainer}>
                                        <div css={screenshotPreviewContent}>
                                            <div css={screenshotPreviewHeader}>
                                                <div
                                                    css={
                                                        screenshotIconContainer
                                                    }
                                                >
                                                    📸
                                                </div>
                                                <div
                                                    css={
                                                        screenshotTextContainer
                                                    }
                                                >
                                                    <div css={screenshotTitle}>
                                                        스크린샷 미리보기
                                                    </div>
                                                    <div
                                                        css={
                                                            screenshotDescription
                                                        }
                                                    >
                                                        클릭하여 전체화면으로
                                                        보기
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                css={screenshotImageContainer}
                                                onClick={() =>
                                                    setIsScreenshotModalOpen(
                                                        true
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={
                                                        process.env.NODE_ENV ===
                                                        "development"
                                                            ? screenshotPreviewUrl.replace(
                                                                  "apps/api/uploads/",
                                                                  "uploads/"
                                                              )
                                                            : screenshotPreviewUrl
                                                    }
                                                    alt="스크린샷 미리보기"
                                                    width={280}
                                                    height={210}
                                                    css={screenshotImage}
                                                />
                                                <div css={screenshotZoomIcon}>
                                                    🔍
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 하단 액션 버튼들 - 전체 너비 사용 */}
                        <div css={bottomActionsContainer}>
                            <div>
                                <input
                                    type="file"
                                    accept=".zip"
                                    onChange={e => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setSaveProgress(0);

                                            const formData = new FormData();
                                            formData.append(
                                                "file",
                                                e.target.files[0]
                                            );
                                            onChangeSaveFile(formData);
                                        }
                                    }}
                                    style={{ display: "none" }}
                                    id="saveFileInput"
                                />
                                <button
                                    css={[actionButton, buttonBase]}
                                    onClick={() =>
                                        document
                                            .getElementById("saveFileInput")
                                            ?.click()
                                    }
                                >
                                    {saveProgress > 0 && saveProgress < 100 && (
                                        <div
                                            css={loadingBar}
                                            style={{
                                                width: `${saveProgress}%`,
                                            }}
                                        />
                                    )}
                                    {uploadComplete.saveFile && (
                                        <div css={completeOverlay} />
                                    )}
                                    <FaFileUpload
                                        style={{ marginRight: "8px" }}
                                    />
                                    세이브 파일 업로드
                                </button>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setProgress(0);
                                            setScreenshotPreviewUrl("");

                                            const formData = new FormData();
                                            formData.append(
                                                "image",
                                                e.target.files[0]
                                            );
                                            onChange(formData);
                                        }
                                    }}
                                    style={{ display: "none" }}
                                    id="imageInput"
                                />
                                <button
                                    css={[actionButton, buttonBase]}
                                    onClick={() =>
                                        document
                                            .getElementById("imageInput")
                                            ?.click()
                                    }
                                >
                                    {progress > 0 && progress < 100 && (
                                        <div
                                            css={loadingBar}
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                    {uploadComplete.screenshot && (
                                        <div css={completeOverlay} />
                                    )}
                                    <FaCamera style={{ marginRight: "8px" }} />
                                    스크린샷 업로드
                                </button>
                            </div>
                            <button css={finishSaveButton} onClick={saveClear}>
                                <FaSave style={{ marginRight: "8px" }} />
                                저장
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* 스크린샷 확대 모달 */}
            {isScreenshotModalOpen &&
                screenshotPreviewUrl &&
                createPortal(
                    <ImageModalContent
                        onClose={() => setIsScreenshotModalOpen(false)}
                    >
                        <Image
                            src={screenshotPreviewUrl}
                            alt="스크린샷 전체화면"
                            fill
                            objectFit="contain"
                            loading="lazy"
                        />
                    </ImageModalContent>,
                    document.body
                )}
        </>
    );
}
