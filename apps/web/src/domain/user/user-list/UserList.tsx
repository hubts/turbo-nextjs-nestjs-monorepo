import { UserAndBadge } from "@repo/shared";
import {
    userButtonListDiv,
    userButtonStyle,
    userListDiv,
    userListTitleStyle,
} from "./UserList.Style";
import { useState, useEffect } from "react";
import { getPlayerColor } from "@/src/libs/player-color";
import { Dashboard } from "../clear/dashboard/Dashboard";
import { useRouter } from "next/router";

export default function UserList(input: {
    users: UserAndBadge[];
    selectedId?: string;
}) {
    const router = useRouter();

    const { users, selectedId } = input;
    const [selectedUser, setSelectedUser] = useState<UserAndBadge>(
        users.find(u => u.userId === selectedId) ?? users[0]!
    );

    // URL 파라미터가 변경되면 선택된 유저도 업데이트
    useEffect(() => {
        if (selectedId) {
            const user = users.find(u => u.userId === selectedId);
            if (user) {
                setSelectedUser(user);
            }
        }
    }, [selectedId, users]);

    const handleUserSelect = (user: UserAndBadge) => {
        setSelectedUser(user);
        router.push(
            {
                pathname: router.pathname,
                query: {
                    id: user.userId,
                    page: "0",
                },
            },
            undefined,
            {
                shallow: true,
                scroll: true,
            }
        );
    };

    return (
        <div css={userListDiv}>
            <span css={userListTitleStyle}>{"클리어 기록"}</span>
            <div css={userButtonListDiv}>
                {users.map((user, index) => (
                    <button
                        key={user.userId}
                        onClick={() => handleUserSelect(user)}
                        css={userButtonStyle(
                            user.color ?? getPlayerColor(index),
                            user.userId === selectedUser.userId
                        )}
                        aria-label={`${user.nickname}의 클리어 기록 보기`}
                        title={`${user.nickname}의 클리어 기록 보기`}
                    >
                        {user.nickname}
                        {user.userId === selectedUser.userId && (
                            <>
                                <div className="water-bubble-1" />
                                <div className="water-bubble-2" />
                                <div className="water-bubble-3" />
                            </>
                        )}
                    </button>
                ))}
            </div>
            <Dashboard user={selectedUser} />
        </div>
    );
}
