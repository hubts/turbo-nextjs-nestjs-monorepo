import { Body, Controller, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
    MainBadgeAndStats,
    UserAndBadge,
    UserApi,
    UserBadgeStat,
    UserRoute,
} from "@repo/shared";
import { UserService } from "./user.service";
import { Route } from "src/common/decorator/api/route.decorator";
import { CustomLogger } from "src/common/logger/custom.logger";
import { MainBadgeSetInputDto } from "./dto/body/main-badge-set-input.dto";
import { UserIdInputDto } from "./dto/body/user-id.dto";

@ApiTags(UserRoute.apiTags)
@Controller(UserRoute.pathPrefix)
export class UserController implements UserApi {
    constructor(
        private readonly logger: CustomLogger,
        private readonly service: UserService
    ) {}

    @Route.Get(UserRoute.getUsers, {
        summary: "Get users",
    })
    async getUsers(): Promise<UserAndBadge[]> {
        // this.logger.log("모든 플레이어들이 조회되었습니다.");
        return await this.service.getUsers();
    }

    @Route.Get(UserRoute.getMainBadgeAndStats, {
        summary: "Get main badge and stats",
    })
    async getMainBadgeAndStats(
        @Query("userId") userId: string
    ): Promise<MainBadgeAndStats> {
        // this.logger.logPretty(
        //     `플레이어: ${userId} 의 메인 뱃지와 통계가 조회되었습니다.`
        // );
        return await this.service.getMainBadgeAndStats(userId);
    }

    @Route.Get(UserRoute.getBadgesByUserId, {
        summary: "Get badges by user id",
    })
    async getBadgesByUserId(
        @Query("userId") userId: string
    ): Promise<UserBadgeStat> {
        // this.logger.logPretty(`플레이어: ${userId} 의 뱃지가 조회되었습니다.`);
        return await this.service.getBadgesByUserId(userId);
    }

    @Route.Post(UserRoute.setMainBadge, {
        summary: "Set main badge",
    })
    async setMainBadge(@Body() dto: MainBadgeSetInputDto): Promise<void> {
        this.logger.logPretty(
            `플레이어: ${dto.userId} 의 메인 칭호가 변경되었습니다.`,
            {
                ...dto,
            }
        );
        return await this.service.setMainBadge(dto);
    }

    @Route.Post(UserRoute.refreshBadge, {
        summary: "Refresh badge",
    })
    async refreshBadge(@Body() dto: UserIdInputDto): Promise<void> {
        this.logger.logPretty(
            `플레이어: ${dto.userId} 의 뱃지가 갱신되었습니다.`
        );
        await this.service.refreshBadge(dto);
    }
}
