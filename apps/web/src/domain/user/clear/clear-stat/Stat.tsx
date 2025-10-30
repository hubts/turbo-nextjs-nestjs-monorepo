import { mainDiv, titleStyle, valueStyle } from "./Stat.Style";

export function Stat(input: {
    title: string;
    value?: string;
    options?: {
        titleFontSize?: number;
        valueFontSize?: number;
    };
}) {
    const { title, value, options } = input;

    return (
        <div css={mainDiv}>
            <span css={valueStyle(options?.valueFontSize)}>
                {value ?? "N/A"}
            </span>
            <span css={titleStyle(options?.titleFontSize)}>{title}</span>
        </div>
    );
}

