import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserBadgeService } from "./service/user-badge.service";
import { UserQueryService } from "./service/user-query.service";
import { UnitModule } from "../unit/unit.module";
import { ClearModule } from "../clear/clear.module";

const providers = [UserService, UserBadgeService, UserQueryService];

@Module({
    imports: [UnitModule, ClearModule],
    controllers: [UserController],
    providers,
    exports: providers,
})
export class UserModule {}
