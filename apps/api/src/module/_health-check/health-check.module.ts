import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "./health-check.controller";
import { CustomLogger } from "src/common/logger/custom.logger";

@Module({
    imports: [
        TerminusModule.forRoot({
            errorLogStyle: "json",
            logger: CustomLogger,
        }),
        HttpModule,
    ],
    controllers: [HealthCheckController],
})
export class HealthCheckModule {}
