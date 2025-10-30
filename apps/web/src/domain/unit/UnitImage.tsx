import { getUnitImageSrc } from "@/src/libs/get-image-src";
import { css } from "@emotion/react";
import Image from "next/image";

export function UnitImage(input: {
    imageWidth: number;
    imageHeight: number;
    unitName?: string;
    options?: {
        width?: number;
    };
}) {
    const { imageWidth, imageHeight, options } = input;
    let unitName = input.unitName;
    if (!unitName) unitName = "위습";

    const imageSrc = getUnitImageSrc("unit", unitName);

    return (
        <div css={mainDiv(options?.width)}>
            <Image
                css={imageStyle}
                src={imageSrc}
                alt={unitName}
                width={imageWidth}
                height={imageHeight}
                loading="lazy"
            />
        </div>
    );
}

const mainDiv = (minWidth?: number) =>
    css({
        minWidth: minWidth ?? "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
    });

const imageStyle = css({
    borderRadius: 4,
    border: "1px solid white",
});
