import React from "react";
import { fileUploadButton } from "./FileUploadButton.Style";
import { extname } from "path";
import dayjs from "dayjs";
import { SerializedStyles } from "@emotion/react";

export interface IProps {
    style?: SerializedStyles;
    icon?: React.ReactNode;
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (formData: FormData) => void;
    uploadFeildname: string;
    uploadFilename?: string;
}

export const FileUploadButton: React.FC<IProps> = props => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }

        const formData = new FormData();
        Array.from(event.target.files).forEach(file => {
            const extension = extname(file.name);
            const nowDate = dayjs(Date.now()).format("YYYYMMDDHHmmss");
            formData.append(
                event.target.name,
                file,
                props.uploadFilename
                    ? `${props.uploadFilename}_${nowDate}${extension}`
                    : `${file.name.replace(extension, "")}_${nowDate}${extension}`
            );
        });

        props.onChange(formData);
        formRef.current?.reset();
    };

    return (
        <form ref={formRef}>
            <button
                type="button"
                onClick={onClickHandler}
                css={props.style ?? fileUploadButton}
            >
                {props.icon}
                {props.label}
            </button>
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFeildname}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
            />
        </form>
    );
};
