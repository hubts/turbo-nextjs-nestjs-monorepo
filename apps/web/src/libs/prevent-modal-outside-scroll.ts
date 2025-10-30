/**
 * 모달 바깥 스크롤 방지
 * @returns 클린업 함수
 */
export function preventModalOutsideScroll() {
    const scrollY = window.scrollY;
    document.body.style.cssText = `
          position: fixed;
          top: -${scrollY}px;
          overflow: hidden;
          width: 100%;`;

    // 모달 내부 스크롤 이벤트 처리
    const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        const modalElement = target.closest('[data-modal="true"]');

        if (modalElement) {
            // 모달 내부에서는 스크롤 허용
            // 스크롤 가능한 요소인지 확인
            const scrollableElement =
                target.closest('[data-scrollable="true"]') ||
                target.closest('[style*="overflow"]') ||
                target.closest('[class*="scroll"]');

            if (scrollableElement) {
                // 스크롤 가능한 요소 내부에서는 정상 동작
                return;
            }

            // 모달 자체가 스크롤 가능한지 확인
            const modalStyle = window.getComputedStyle(modalElement);
            const isModalScrollable =
                modalStyle.overflow === "auto" ||
                modalStyle.overflow === "scroll" ||
                modalStyle.overflowY === "auto" ||
                modalStyle.overflowY === "scroll";

            if (isModalScrollable) {
                const { scrollTop, scrollHeight, clientHeight } =
                    modalElement as HTMLElement;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight;

                // 스크롤이 맨 위나 맨 아래에 있을 때만 기본 동작 방지
                if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    e.preventDefault();
                }
            }
        } else {
            // 모달 외부에서는 스크롤 방지
            e.preventDefault();
        }
    };

    // 터치 이벤트 처리 (모바일)
    const handleTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        const modalElement = target.closest('[data-modal="true"]');

        if (modalElement) {
            // 모달 내부에서는 스크롤 허용
            // 스크롤 가능한 요소인지 확인
            const scrollableElement =
                target.closest('[data-scrollable="true"]') ||
                target.closest('[style*="overflow"]') ||
                target.closest('[class*="scroll"]');

            if (scrollableElement) {
                // 스크롤 가능한 요소 내부에서는 정상 동작
                return;
            }

            // 모달 자체가 스크롤 가능한지 확인
            const modalStyle = window.getComputedStyle(modalElement);
            const isModalScrollable =
                modalStyle.overflow === "auto" ||
                modalStyle.overflow === "scroll" ||
                modalStyle.overflowY === "auto" ||
                modalStyle.overflowY === "scroll";

            if (isModalScrollable) {
                // 모달이 스크롤 가능하면 터치 스크롤 허용
                return;
            }
        } else {
            // 모달 외부에서는 스크롤 방지
            e.preventDefault();
        }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
    });

    return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);

        document.removeEventListener("wheel", handleWheel);
        document.removeEventListener("touchmove", handleTouchMove);
    };
}
