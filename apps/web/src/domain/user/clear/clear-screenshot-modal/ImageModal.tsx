/* eslint-disable @typescript-eslint/no-explicit-any */
import { modal, close, modalContent, image } from "./ImageModal.Style";

export function ImageModal({
    onOpen,
    children,
}: {
    onOpen: () => void;
    children: any;
}) {
    return (
        <div css={image} onClick={onOpen}>
            {children}
        </div>
    );
}

export function ImageModalContent({
    onClose,
    children,
}: {
    onClose: () => void;
    children: any;
}) {
    return (
        <div css={modal} onClick={onClose}>
            <span css={close} onClick={onClose}>
                &times;
            </span>
            <div css={modalContent}>{children}</div>
        </div>
    );
}
