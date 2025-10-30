import { ReactNode } from "react";
import { FlipCardStyle } from "./FlipCard.Style";
import { SerializedStyles } from "@emotion/react";

export function FlipCard(input: {
    front: ReactNode;
    back: ReactNode;
    cardStyle?: {
        width?: number | string;
        height?: number | string;
        border?: string;
        backStyle?: SerializedStyles;
        isTopUnit?: boolean;
        grade?: string;
    };
}) {
    return (
        <div css={FlipCardStyle.mainDiv(input.cardStyle)}>
            {/* 상위유닛 그림자 효과 */}
            {input.cardStyle?.isTopUnit && (
                <div css={FlipCardStyle.topUnitShadow(input.cardStyle.grade)} />
            )}
            <div css={FlipCardStyle.innerDiv}>
                <div
                    css={FlipCardStyle.frontDiv(
                        input.cardStyle?.border,
                        input.cardStyle?.isTopUnit
                    )}
                >
                    {input.front}
                </div>
                <div
                    css={[
                        FlipCardStyle.backDiv(input.cardStyle?.border),
                        input?.cardStyle?.backStyle,
                    ]}
                >
                    {input.back}
                </div>
            </div>
        </div>
    );
}
