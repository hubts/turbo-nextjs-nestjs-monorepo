import {
    badgeDescriptionStyle,
    badgeDiv,
    badgeGetDiv,
    badgeGetIconStyle,
    badgeGetTimeStyle,
    badgeIconStyle,
    badgeNameStyle,
} from "./BadgeCard.Style";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";
import { dateToYearMonthDay } from "@repo/shared";
import { UserBadgeStat } from "@repo/shared";

export function BadgeCard(input: {
    userBadge: UserBadgeStat["badges"][0];
    updateBadge: (badgeId: string) => void;
}) {
    const { userBadge, updateBadge } = input;
    const { id, color, name, description, acquired, acquiredAt } = userBadge;

    return (
        <div
            css={badgeDiv(acquired ? color : null)}
            onClick={() => acquired && updateBadge(id)}
        >
            <span css={badgeIconStyle}>
                <GiTrophy />
            </span>
            <span css={badgeNameStyle(acquired ? color : null)}>{name}</span>
            <span css={badgeDescriptionStyle(acquired ? "white" : null)}>
                {description}
            </span>
            <div css={badgeGetDiv}>
                <span css={badgeGetIconStyle}>
                    {acquired ? <MdVerified /> : <GoUnverified />}
                </span>
                <span css={badgeGetTimeStyle(acquired ? "lightgreen" : null)}>
                    {acquired && acquiredAt
                        ? dateToYearMonthDay(acquiredAt)
                        : "미획득"}
                </span>
            </div>
        </div>
    );
}
