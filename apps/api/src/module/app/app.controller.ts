import { Body, Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppImpl, AppRoute } from "@repo/shared";
import { Route } from "src/common/decorator/api/route.decorator";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/body/login.dto";
import { TokenDto } from "./dto/response/token.dto";

@ApiTags(AppRoute.apiTags)
@Controller(AppRoute.pathPrefix)
export class AppController implements AppImpl {
    constructor(readonly appService: AppService) {}

    @Route.Get(AppRoute.connection, {
        summary: "Connection",
    })
    async connection(): Promise<boolean> {
        return true;
    }

    @Route.Post(AppRoute.login, {
        summary: "Login",
    })
    async login(@Body() input: LoginDto): Promise<TokenDto> {
        return await this.appService.login(input);
    }
}
