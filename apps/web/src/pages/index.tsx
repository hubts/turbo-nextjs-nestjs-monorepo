import { Unit } from "@repo/database";
import { NextPageContext } from "next";
import { mainDiv } from "../styles/index.style";
import { TotalClearStats, UserAndBadge } from "@repo/shared";
import ClearService from "../api/services/clear.service";
import UnitService from "../api/services/unit.service";
import Navigation from "../domain/home/navigation/Navigation";
import MainTitle from "../domain/home/main-title/MainTitle";
import RecentClears from "../domain/home/recent-clears/RecentClears";
import Dashboard from "../domain/home/dashboard/Dashboard";
import UserService from "../api/services/user.service";
import UserList from "../domain/user/user-list/UserList";
import AppService from "../api/services/app.service";

interface Props {
    query?: {
        id?: string;
    };
    users: UserAndBadge[];
    totalClearStats: TotalClearStats;
    todayTopUnits: Unit[];
    version: string;
}

export async function getServerSideProps(context: NextPageContext): Promise<{
    props: Props;
}> {
    const query = context.query;

    // API
    const users = await UserService.Instance.getUsers();
    const totalClearStats = await ClearService.Instance.getTotalClearStats();
    const todayTopUnits = await UnitService.Instance.getTodayRandomTopUnits();
    const version = await AppService.Instance.getVersion();

    return {
        props: {
            query,
            users,
            totalClearStats,
            todayTopUnits,
            version,
        },
    };
}

export default function Home(input: Props) {
    return (
        <div css={mainDiv}>
            <Navigation version={input.version} />
            <MainTitle />
            <RecentClears users={input.users} />
            <Dashboard
                users={input.users}
                totalClearStats={input.totalClearStats}
            />
            {/* 플레이어별 보기 */}
            <UserList users={input.users} selectedId={input.query?.id} />
        </div>
    );
}
