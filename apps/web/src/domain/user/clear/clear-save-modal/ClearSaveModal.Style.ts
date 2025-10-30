import { ClearType, COLOR } from "@repo/shared";
import { css } from "@emotion/react";

// 백그라운드 영역
export const backgroundDiv = css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
});

// 모달 영역
export const modalDiv = css({
    position: "relative",

    width: "95%",
    maxWidth: "75%",
    maxHeight: "90%",
    padding: "40px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflowY: "auto",

    background:
        "linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(20px)",
});

// 닫기 버튼
export const closeButtonStyle = css({
    position: "absolute",
    top: "20px",
    right: "20px",

    width: "40px",
    height: "40px",
    padding: "8px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",

    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.8)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",

    ":hover": {
        borderColor: "rgba(255, 215, 0, 0.5)",
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        color: "rgba(255, 215, 0, 0.9)",
        transform: "scale(1.1)",
    },
});

// 3열 레이아웃 컨테이너
export const threeColumnLayout = css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "24px",
    width: "100%",
    alignItems: "stretch", // 컬럼 높이를 맞춤
});

// 좌측 컬럼
export const leftColumn = css({
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    height: "fit-content",
});

// 중앙 컬럼
export const centerColumn = css({
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    height: "fit-content",
});

// 우측 컬럼
export const rightColumn = css({
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
    height: "fit-content",
});

// 클리어회차 영역
export const clearCountDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
});

// 클리어회차 입력
export const clearCountInput = css({
    width: "100%",
    padding: "12px 20px",
    fontSize: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "rgba(255, 255, 255, 0.9)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    height: "48px", // 정확한 높이 설정
    boxSizing: "border-box",

    "&:focus": {
        borderColor: "rgba(255, 215, 0, 0.5)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        boxShadow: "0 0 0 3px rgba(255, 215, 0, 0.1)",
    },

    "&::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
    },
});

// 클리어회차 타이틀
export const titleStyle = css({
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgba(255, 215, 0, 0.9)",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
});

// 클리어타입 영역
export const clearTypeDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
});

// 클리어타입 버튼
export const clearTypeButton = (type: ClearType) =>
    css({
        width: "100%",
        padding: "16px 20px",
        border: "2px solid",
        borderColor: type === "물딜" ? COLOR.물딜 : COLOR.마딜,
        borderRadius: "12px",
        backgroundColor:
            type === "물딜"
                ? "rgba(0, 150, 255, 0.1)"
                : "rgba(255, 0, 150, 0.1)",
        minHeight: "48px", // 높이 통일

        fontSize: "18px",
        fontWeight: "bold",
        color: type === "물딜" ? COLOR.물딜 : COLOR.마딜,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",

        ":hover": {
            backgroundColor:
                type === "물딜"
                    ? "rgba(0, 150, 255, 0.2)"
                    : "rgba(255, 0, 150, 0.2)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
    });

// 상위유닛 선택 영역 DIV
export const topUnitSelectDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
});

// 상위유닛 선택
export const topUnitSelect = css({
    width: "100%",
});

// 상위유닛 선택 개수 문구
export const topUnitSelectedText = css({
    width: "100%",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgba(255, 215, 0, 0.9)",
    padding: "12px 16px",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(5px)",
});

export const topUnitSelectedListDiv = (display?: boolean) =>
    css({
        position: "relative",
        width: "100%",
        padding: "16px",
        display: "flex", // 항상 표시
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        minHeight: "240px", // 높이 증가
        maxHeight: "240px",
        overflowY: "auto",

        fontSize: "14px",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
    });

export const topUnitSelectedListItemDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        borderColor: "rgba(255, 215, 0, 0.3)",
    },
});

export const topUnitSelectedListItemRemoveButton = css({
    width: "24px",
    height: "24px",
    color: "rgba(255, 255, 255, 0.6)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
        color: "rgba(255, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        transform: "scale(1.1)",
    },
});

/**
 * 정보 입력
 */

export const statInputDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
});

export const statInput = css({
    width: "100%",
    padding: "12px 20px",
    fontSize: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "rgba(255, 255, 255, 0.9)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    height: "48px", // 정확한 높이 설정
    boxSizing: "border-box",

    "&:focus": {
        borderColor: "rgba(255, 215, 0, 0.5)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        boxShadow: "0 0 0 3px rgba(255, 215, 0, 0.1)",
    },

    "&::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
    },
});

/**
 * 세이브 파일 업로드 영역
 */
export const saveFileUploadDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
});

export const fileUploadButton = css({
    width: "100%",
    padding: "16px 20px",
    border: "2px dashed rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    textAlign: "center",

    "&:hover": {
        borderColor: "rgba(255, 215, 0, 0.5)",
        backgroundColor: "rgba(255, 215, 0, 0.05)",
        color: "rgba(255, 215, 0, 0.9)",
    },
});

/**
 * 세이브 파일 이름/다운로드 영역
 */
export const saveFilenameDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    fontSize: "16px",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
});

/**
 * 세이브 파일 이름 다운로드 버튼
 */
export const saveFilenameDownloadButtonStyle = css({
    width: 24,
    height: 24,
    padding: 4,
    border: "1px solid white",
    borderRadius: 8,
    backgroundColor: "black",

    color: "white",

    ":hover": {
        border: "1px solid transparent",
        backgroundColor: "gray",
        cursor: "pointer",
    },
});

/**
 * 업로드 이미지 영역
 */
export const thumbnailImageDiv = css({
    width: "100%",
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

/**
 * 업로드 이미지 프로그레스
 */
export const progressTextStyle = css({
    padding: 4,
    fontSize: 14,
    textAlign: "center",
});

/**
 * 이미지 미리보기
 */

export const thumbnailImage = css({
    borderRadius: 8,
    backgroundColor: "black",

    ":hover": {
        backgroundColor: "gray",
        cursor: "pointer",
    },
});

/**
 * 저장
 */

export const bottomActionsContainer = css({
    width: "100%",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "flex-end", // 우측 정렬
    marginTop: "24px", // 상단 여백
    paddingTop: "16px",
    borderTop: "1px solid rgba(255, 215, 0, 0.2)",
});

export const actionButton = css({
    padding: "12px 20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",

    "&:hover": {
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        borderColor: "rgba(255, 215, 0, 0.3)",
        color: "rgba(255, 215, 0, 0.9)",
        transform: "translateY(-1px)",
    },
});

// 업로드 진행률 표시 스타일
export const uploadProgressOverlay = (progress: number) =>
    css({
        position: "absolute",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "100%",
        backgroundColor: "rgba(255, 215, 0, 0.3)",
        transition: "width 0.3s ease-in-out",
        zIndex: 1,
    });

// 업로드 완료 스타일
export const uploadCompleteOverlay = css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
    zIndex: 1,
});

// 파일 링크 표시 영역
export const fileLinkContainer = css({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "12px",
    padding: "8px 12px",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 215, 0, 0.2)",
});

export const fileLink = css({
    color: "rgba(255, 215, 0, 0.9)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease-in-out",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    margin: "0",

    "&:hover": {
        color: "rgba(255, 215, 0, 1)",
        textDecoration: "underline",
    },
});

export const finishSaveButton = css({
    padding: "12px 24px",
    border: "2px solid rgba(255, 215, 0, 0.3)",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    backdropFilter: "blur(10px)",

    fontSize: "16px",
    fontWeight: "bold",
    color: "rgba(255, 215, 0, 0.9)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        borderColor: "rgba(255, 215, 0, 0.5)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(255, 215, 0, 0.2)",
    },
});

// 파일 링크 표시 영역 (개선된 디자인)
export const saveFileLinkContainer = css({
    padding: "16px",
    background:
        "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(20, 20, 20, 0.6) 100%)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    boxShadow: "0 4px 20px rgba(255, 215, 0, 0.1)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export const saveFileInfoContainer = css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

export const saveFileIconContainer = css({
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background:
        "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 215, 0, 0.3)",
});

export const saveFileTextContainer = css({
    display: "flex",
    flexDirection: "column",
});

export const saveFileTitle = css({
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
    fontWeight: "500",
});

export const saveFileName = css({
    color: "rgba(255, 215, 0, 0.8)",
    fontSize: "12px",
    marginTop: "2px",
});

export const saveFileDownloadButton = css({
    background:
        "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "8px",
    color: "rgba(255, 215, 0, 0.9)",
    cursor: "pointer",
    fontSize: "13px",
    padding: "8px 16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",

    "&:hover": {
        background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(255, 215, 0, 0.2)",
    },
});

// 스크린샷 미리보기 영역 (개선된 디자인)
export const screenshotPreviewContainer = css({
    padding: "20px",
    background:
        "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(20, 20, 20, 0.6) 100%)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    boxShadow: "0 4px 20px rgba(255, 215, 0, 0.1)",
    backdropFilter: "blur(10px)",
});

export const screenshotPreviewContent = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
});

export const screenshotPreviewHeader = css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
});

export const screenshotIconContainer = css({
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background:
        "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 215, 0, 0.3)",
});

export const screenshotTextContainer = css({
    display: "flex",
    flexDirection: "column",
});

export const screenshotTitle = css({
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
    fontWeight: "500",
});

export const screenshotDescription = css({
    color: "rgba(255, 215, 0, 0.8)",
    fontSize: "12px",
    marginTop: "2px",
});

export const screenshotImageContainer = css({
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "2px solid rgba(255, 215, 0, 0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 12px 40px rgba(255, 215, 0, 0.2)",
        borderColor: "rgba(255, 215, 0, 0.6)",
    },
});

export const screenshotImage = css({
    objectFit: "cover",
    display: "block",
});

export const screenshotZoomIcon = css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.7)",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    fontSize: "20px",

    "&:hover": {
        opacity: 1,
    },
});

// 로딩바 스타일
export const loadingBar = css({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "rgba(255, 215, 0, 0.3)",
    transition: "width 0.3s ease",
    zIndex: 3,
});

// 완료 오버레이 스타일
export const completeOverlay = css({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    borderRadius: "8px",
    pointerEvents: "none",
    zIndex: 1,
});

// 버튼 기본 스타일
export const buttonBase = css({
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
});

// 항법지침 선택 영역
export const navigationDiv = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

// 항법지침 그리드 컨테이너
export const navigationGridContainer = css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    width: "100%",
    alignItems: "start",
});

// 항법지침 버튼
export const navigationButton = (isSelected: boolean) =>
    css({
        width: "100%",
        padding: "12px 8px",
        borderRadius: "12px",
        border: isSelected
            ? "1.5px solid rgba(255, 215, 0, 0.8)"
            : "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: isSelected
            ? "rgba(255, 215, 0, 0.15)"
            : "rgba(0, 0, 0, 0.3)",
        color: isSelected
            ? "rgba(255, 215, 0, 0.9)"
            : "rgba(255, 255, 255, 0.8)",
        fontSize: "13px",
        fontWeight: isSelected ? "600" : "500",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        textAlign: "center",
        minHeight: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        backdropFilter: "blur(10px)",
        wordBreak: "keep-all",
        lineHeight: "1.3",
        boxSizing: "border-box",

        "&:hover": {
            borderColor: "rgba(255, 215, 0, 0.5)",
            backgroundColor: isSelected
                ? "rgba(255, 215, 0, 0.2)"
                : "rgba(255, 215, 0, 0.1)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(255, 215, 0, 0.2)",
        },

        "&:active": {
            transform: "translateY(0)",
        },
    });

// 항법지침 아이콘
export const navigationIcon = css({
    width: "24px",
    height: "24px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    filter: "brightness(0.9) contrast(1.1)",
    flexShrink: 0,
    transform: "scale(1.1)",
    overflow: "hidden",
});

// 항법지침 카테고리 라벨
export const navigationCategoryLabel = css({
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    border: "1px solid rgba(255, 215, 0, 0.3)",
    borderRadius: "8px",
    color: "rgba(255, 215, 0, 0.9)",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    margin: "8px 0",
    gridColumn: "1 / -1",
    backdropFilter: "blur(10px)",
});

// 항법지침 카테고리 구분선
export const navigationCategoryDivider = css({
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(255, 215, 0, 0.3)",
    margin: "8px 0",
    gridColumn: "1 / -1",
});

// 항법지침 툴팁 컨테이너
export const navigationTooltipContainer = css({
    position: "relative",
    display: "inline-block",
});

// 항법지침 툴팁
export const navigationTooltip = css({
    position: "fixed",
    zIndex: 99999,

    width: "300px",
    padding: "16px",
    backgroundColor: "rgba(26, 26, 46, 0.98)",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "12px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(20px)",

    fontSize: "14px",
    lineHeight: "1.5",
    color: "rgba(255, 255, 255, 0.95)",

    opacity: 0,
    visibility: "hidden",
    transition: "all 0.3s ease-in-out",
    pointerEvents: "none",
});

// 항법지침 툴팁 표시 상태
export const navigationTooltipVisible = css({
    opacity: 1,
    visibility: "visible",
});

// 항법지침 툴팁 제목
export const navigationTooltipTitle = css({
    fontSize: "16px",
    fontWeight: "600",
    color: "rgba(255, 215, 0, 0.9)",
    marginBottom: "12px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
    paddingBottom: "8px",
});

// 항법지침 툴팁 설명
export const navigationTooltipDescription = css({
    marginBottom: "12px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
});

// 항법지침 툴팁 페널티
export const navigationTooltipPenalty = css({
    padding: "10px 12px",
    backgroundColor: "rgba(255, 0, 0, 0.15)",
    border: "1px solid rgba(255, 0, 0, 0.4)",
    borderRadius: "8px",
    color: "rgba(255, 150, 150, 0.95)",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
});
