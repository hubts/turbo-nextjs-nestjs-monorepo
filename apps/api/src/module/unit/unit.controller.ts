import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomLogger } from "src/common/logger/custom.logger";
import { UnitApi, UnitRoute } from "@repo/shared";
import { UnitService } from "./unit.service";
import { Unit } from "@repo/database";
import { Route } from "src/common/decorator/api/route.decorator";

@ApiTags(UnitRoute.apiTags)
@Controller(UnitRoute.pathPrefix)
export class UnitController implements UnitApi {
    constructor(
        private readonly logger: CustomLogger,
        private readonly service: UnitService
    ) {}

    @Route.Get(UnitRoute.getTodayRandomTopUnits, {
        summary: "Get today random top units to be recommended.",
    })
    async getTodayRandomTopUnits(): Promise<Unit[]> {
        return await this.service.getTodayRandomTopUnits();
    }

    @Route.Get(UnitRoute.getUnits, {
        summary: "Get units",
    })
    async getUnits(): Promise<Unit[]> {
        // this.logger.log("모든 유닛들이 조회되었습니다.");
        return await this.service.getUnits();
    }
}
