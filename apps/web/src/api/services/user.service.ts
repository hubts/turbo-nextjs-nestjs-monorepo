import {
    MainBadgeAndStats,
    MainBadgeSetInput,
    UserAndBadge,
    UserApi,
    UserBadgeStat,
    UserIdInput,
} from "@repo/shared";
import { getSdk } from "..";

export default class UserService implements UserApi {
    // 단일 인스턴스 설정
    private static instance: UserService;
    static get Instance(): UserService {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    async getUsers(): Promise<UserAndBadge[]> {
        const users = await getSdk().user.api.getUsers();
        return users;
    }

    async getMainBadgeAndStats(userId: string): Promise<MainBadgeAndStats> {
        const mainBadgeAndStats =
            await getSdk().user.api.getMainBadgeAndStats(userId);
        return mainBadgeAndStats;
    }

    async getBadgesByUserId(userId: string): Promise<UserBadgeStat> {
        return await getSdk().user.api.getBadgesByUserId(userId);
    }

    async setMainBadge(input: MainBadgeSetInput): Promise<void> {
        await getSdk().user.api.setMainBadge(input);
    }

    async refreshBadge(input: UserIdInput): Promise<void> {
        await getSdk().user.api.refreshBadge(input);
    }
}
