import { Body, Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppApi, AppRoute, CreateVersionInput } from "@repo/shared";
import { Route } from "src/common/decorator/api/route.decorator";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags(AppRoute.apiTags)
@Controller(AppRoute.pathPrefix)
export class AppController implements AppApi {
    constructor(readonly appService: AppService) {}

    @Route.Post(AppRoute.createVersion, {
        summary: "Create version",
    })
    @ApiBody({
        schema: {
            example: {
                version: "2.000",
            },
        },
    })
    async createVersion(@Body() input: CreateVersionInput): Promise<void> {
        return await this.appService.createVersion(input.version);
    }

    @Route.Get(AppRoute.getVersion, {
        summary: "Get version",
    })
    async getVersion(): Promise<string> {
        return await this.appService.getVersion();
    }
}
