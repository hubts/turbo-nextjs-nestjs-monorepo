import { getUnitImageSrc } from "@/src/libs/get-image-src";
import { unitFullname } from "@/src/libs/unit-fullname";
import { COLOR, Grade } from "@repo/shared";
import { css } from "@emotion/react";
import { Unit } from "@repo/database";
import Image from "next/image";

export function UnitImageAndName(input: {
    imageWidth: number;
    imageHeight: number;
    unit?: Pick<Unit, "name" | "grade">;
    options?: {
        width?: number;
        fontSize?: number;
    };
}) {
    const { unit, imageWidth, imageHeight, options } = input;

    if (!unit) {
        return (
            <div css={mainDiv(options?.width)}>
                <span css={noImageStyle(imageHeight, options?.fontSize)}>
                    {"N/A"}
                </span>
            </div>
        );
    }

    const imageSrc = getUnitImageSrc("unit", unit.name, unit.grade);
    const unitName = unitFullname(unit);

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
            <span css={nameStyle(options?.fontSize, unit.grade)}>
                {unitName}
            </span>
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

const nameStyle = (fontSize?: number, grade?: string) =>
    css({
        fontSize: fontSize ?? 12,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: grade ? COLOR[grade as Grade] : "white",
    });

const noImageStyle = (minHeight: number, fontSize?: number) =>
    css({
        display: "flex",
        alignItems: "center",
        fontSize: fontSize ?? 12,
        fontWeight: "bold",
        color: "white",
        minHeight,
    });
