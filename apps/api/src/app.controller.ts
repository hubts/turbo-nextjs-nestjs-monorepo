import { Body, Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Account } from "@repo/api-types";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): Account {
        return this.appService.getHello();
    }
}
