import {
    backgroundDiv,
    badgeListDiv,
    modalDiv,
    refreshButtonStyle,
    titleDiv,
    titleStyle,
} from "./BadgeListModal.Style";
import { useEffect, useState } from "react";
import Router from "next/router";
import { BadgeCard } from "./BadgeCard";
import { UserAndBadge, UserBadgeStat } from "@repo/shared";
import UserService from "@/src/api/services/user.service";
import { AxiosError } from "axios";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { preventModalOutsideScroll } from "@/src/libs/prevent-modal-outside-scroll";

export function BadgeListModal(input: {
    clickModal: () => void;
    user: UserAndBadge;
}) {
    const { clickModal, user } = input;

    // 전체 뱃지 목록
    const [userBadges, setUserBadges] = useState<UserBadgeStat["badges"]>([]);
    useEffect(() => {
        UserService.Instance.getBadgesByUserId(user.userId).then(result => {
            setUserBadges(result.badges);
        });
    }, [user.userId]);

    // 모달 바깥 스크롤 방지
    useEffect(() => {
        const cleanup = preventModalOutsideScroll();
        return cleanup;
    }, []);

    // 메인 뱃지 설정
    const updateMainBadge = async (badgeId: string) => {
        const confirmed = confirm(
            user.mainBadgeId === badgeId
                ? "해당 칭호를 해제하겠습니까?"
                : "대표 칭호로 설정하겠습니까?"
        );
        if (confirmed) {
            try {
                await UserService.Instance.setMainBadge({
                    userId: user.userId,
                    badgeId: user.mainBadgeId === badgeId ? null : badgeId,
                });
            } catch (e) {
                const error = e as AxiosError;
                alert(`칭호 설정에 실패하였습니다.\n${error.response?.data}`);
            } finally {
                clickModal();
                Router.push(`?id=${user.userId}`, undefined, {
                    scroll: false,
                }).then(() => window.location.reload());
            }
        }
    };

    // 뱃지 새로고침
    const refreshBadge = async (userId: string) => {
        try {
            await UserService.Instance.refreshBadge({ userId });
            alert("칭호 현황이 새로고침 되었습니다.");
        } catch (e) {
            const error = e as AxiosError;
            alert(`칭호 새로고침에 실패하였습니다.\n${error.response?.data}`);
        } finally {
            clickModal();
            Router.push(`?id=${user.userId}`, undefined, {
                scroll: false,
            }).then(() => window.location.reload());
        }
    };

    return (
        <div css={backgroundDiv} onClick={clickModal}>
            <div css={modalDiv} onClick={e => e.stopPropagation()}>
                <div css={titleDiv}>
                    <span css={titleStyle}>
                        {`획득한 칭호 [${userBadges.filter(u => u.acquired).length}/${userBadges.length}]`}
                    </span>
                    <button
                        onClick={() => refreshBadge(user.userId)}
                        css={refreshButtonStyle}
                    >
                        <IoRefreshCircleOutline />
                    </button>
                </div>
                <div css={badgeListDiv}>
                    {userBadges.map(userBadge => (
                        <BadgeCard
                            key={userBadge.id}
                            userBadge={userBadge}
                            updateBadge={updateMainBadge}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
