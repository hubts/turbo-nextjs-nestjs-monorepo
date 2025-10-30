import { Unit } from "@repo/database";
import { FaCrown } from "react-icons/fa";
import { getUnitImageSrc } from "@/src/libs/get-image-src";
import { unitFullname } from "@/src/libs/unit-fullname";
import { COLOR, Grade } from "@repo/shared";
import { RepresentativeUnitStyle } from "./RepresentativeUnit.Style";
import Image from "next/image";

interface RepresentativeUnitProps {
    unit?: Unit;
    reason?: string;
}

export function RepresentativeUnit({ unit, reason }: RepresentativeUnitProps) {
    const imageSrc = unit
        ? getUnitImageSrc("unitFull", unit.name, unit.grade)
        : "";
    const fullUnitName = unit ? unitFullname(unit) : "";
    const unitColor = unit?.grade ? COLOR[unit.grade as Grade] : "white";

    return (
        <div css={RepresentativeUnitStyle.container}>
            {/* 헤더 - 대표 유닛 제목 */}
            <div css={RepresentativeUnitStyle.header}>
                <FaCrown
                    style={{
                        color: "rgba(255, 215, 0, 0.9)",
                    }}
                />
                <span css={RepresentativeUnitStyle.title}>대표 유닛</span>
            </div>

            {/* 배경 이미지 */}
            <div css={RepresentativeUnitStyle.imageContainer}>
                {unit && (
                    <Image
                        src={imageSrc}
                        alt={fullUnitName}
                        width={400}
                        height={200}
                        loading="lazy"
                        css={RepresentativeUnitStyle.unitImage}
                    />
                )}
            </div>

            {/* 정보 오버레이 */}
            <div css={RepresentativeUnitStyle.infoContainer}>
                <div
                    css={RepresentativeUnitStyle.unitName}
                    style={{ color: unitColor }}
                >
                    {fullUnitName || "대표유닛을 확인할 수 없습니다."}
                </div>

                {reason && (
                    <div css={RepresentativeUnitStyle.reason}>{reason}</div>
                )}
            </div>
        </div>
    );
}
