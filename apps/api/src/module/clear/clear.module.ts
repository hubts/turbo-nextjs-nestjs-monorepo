import { Module } from "@nestjs/common";
import { ClearService } from "./clear.service";
import { ClearController } from "./clear.controller";
import { ClearStatService } from "./service/clear-stat.service";
import { ClearUserService } from "./service/clear-user.service";
import { UserBadgeService } from "../user/service/user-badge.service";
import { ClearIngameService } from "./service/clear-ingame.service";
import { UnitModule } from "../unit/unit.module";

const providers = [
    ClearService,
    ClearStatService,
    ClearUserService,
    UserBadgeService,
    ClearIngameService,
];

@Module({
    imports: [UnitModule],
    controllers: [ClearController],
    providers,
    exports: providers,
})
export class ClearModule {}
