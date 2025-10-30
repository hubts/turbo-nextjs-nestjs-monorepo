import { Module } from "@nestjs/common";
import { UnitService } from "./unit.service";
import { UnitController } from "./unit.controller";

const providers = [UnitService];

@Module({
    controllers: [UnitController],
    providers,
    exports: providers,
})
export class UnitModule {}
