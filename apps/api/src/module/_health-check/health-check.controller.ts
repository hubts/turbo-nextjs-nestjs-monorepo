import {
    Controller,
    Get,
    Logger,
    OnApplicationBootstrap,
    Req,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    MemoryHealthIndicator,
    PrismaHealthIndicator,
    DiskHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";

@ApiTags("Z. HealthCheck")
@Controller("health")
export class HealthCheckController {
    private readonly logger = new Logger("Healthy🔋");
    private readonly httpTestLink = "https://google.com";

    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
        private readonly prisma: PrismaHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private readonly prismaService: PrismaService
    ) {}

    // async onApplicationBootstrap() {
    //     const status = await this.getStatus();
    //     const overview = status.overview ? "✅" : "🚫";
    //     const details = Object.keys(status.details).map(
    //         key => `${key} ( ${status.details[key] ? "✅" : `🚫`} )`
    //     );
    //     this.logger.log(`Result ( ${overview} ) => ${details.join(", ")}`);
    // }

    async getStatus(): Promise<{
        overview: boolean;
        details: {
            [key: string]: boolean;
        };
    }> {
        const checkResult = await this.checkConnections();
        const details: {
            [key: string]: boolean;
        } = {};
        Object.keys(checkResult.details).map(key => {
            details[key] = checkResult.details[key].status === "up";
        });
        return {
            overview: checkResult.status === "ok",
            details,
        };
    }

    @Get()
    @ApiOperation({
        summary: "Knocking to Check request headers and server setting.",
    })
    knock(@Req() req: Request) {
        return {
            message: `[${new Date().toISOString()}] Who's there?`,
            headers: req.headers,
        };
    }

    @Get("connections")
    @HealthCheck()
    @ApiOperation({
        summary: "Check health of other infrastructures.",
    })
    async checkConnections() {
        return await this.health.check([
            () =>
                this.http.pingCheck("http", this.httpTestLink, {
                    timeout: 3000,
                }),
            () =>
                this.prisma.pingCheck("prisma", this.prismaService, {
                    timeout: 10000,
                }),
            () => this.memory.checkHeap("heap-memory", 2 * 1024 * 1024 * 1024), // 2 GB
            () =>
                this.disk.checkStorage("disk", {
                    thresholdPercent: 0.8,
                    path: "/",
                }),
        ]);
    }
}
