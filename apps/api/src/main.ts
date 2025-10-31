/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
// import morgan from "morgan";

import { AppModule } from "./app.module";
import { HealthCheckController } from "./module/_health-check/health-check.controller";
import { CustomLogger } from "./common/logger/custom.logger";
import { setupSwagger } from "./common/swagger/setup";
import { IServerConfig } from "./config/config.interface";
import { ServerConfig } from "./config/internal/server.config";
import { SwaggerThemeNameEnum } from "swagger-themes";
import { CommonResponseDto } from "./common/dto/common-response.dto";

async function run() {
    const logger = new CustomLogger("Main");

    try {
        // Application and configuration
        const app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            {
                abortOnError: true,
            }
        );
        const serverConfig = app.get<IServerConfig>(ServerConfig.KEY);
        const packageJson = require("../package.json");

        // Custom logger (with database saving)
        const logger = await app.resolve(CustomLogger);
        app.useLogger(logger);

        // Payload limit
        app.use(json({ limit: "256kb" }));

        // CORS
        app.enableCors({
            allowedHeaders: ["Content-Type", "Authorization"],
            methods: "GET, POST, PATCH, PUT, DELETE",
            credentials: true,
            origin: true,
        });

        // Swagger
        const swaggerPath = serverConfig.docs.fullPath;
        setupSwagger(app, {
            path: swaggerPath,
            serverUrl: `${serverConfig.endpoint.external}/${serverConfig.endpoint.globalPrefix}`,
            title: packageJson.name,
            version: packageJson.version,
            description: "Documents to experience API.",
            extraModels: [CommonResponseDto],
        });

        // Secure HTTP header and compression
        app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
        app.use(compression());

        // Logging middleware (optional)
        // app.use(morgan(serverConfig.isProduction ? "combined" : "dev"));

        // API prefix and versioning (optional)
        app.setGlobalPrefix(serverConfig.endpoint.globalPrefix);

        /**
         * Start
         */
        const healthCheckController = app.get(HealthCheckController);
        const status = await healthCheckController.getStatus();

        // Try to use the port from serverConfig, and if that fails, try subsequent ports
        let port = serverConfig.port;
        let isPortAvailable = false;

        while (!isPortAvailable && port < serverConfig.port + 10) {
            try {
                await app.listen(port, "0.0.0.0");
                isPortAvailable = true;

                let log = `Application [ ${packageJson.name}:${packageJson.version} ] is successfully started\n`;
                log += `< Information >\n`;
                log += `🌏 Env                 : ${serverConfig.env}\n`;
                log += `🌏 Application URL     : ${await app.getUrl()}\n`;
                log += `🌏 External endpoint   : ${serverConfig.endpoint.external}\n`;
                log += `🌏 Swagger document    : ${serverConfig.endpoint.external}${serverConfig.docs.fullPath}\n`;
                log += `🌏 Healthy (overview)  : ${
                    status.overview ? "✅" : "🚫"
                }\n`;
                log += `🌏 Healthy (details)   : ${Object.keys(status.details)
                    .map(
                        key => `${key} ( ${status.details[key] ? "✅" : "🚫"} )`
                    )
                    .join(", ")}`;

                logger.log(log);
                break;
            } catch (error) {
                if ((error as { code?: string }).code === "EADDRINUSE") {
                    logger.warn(
                        `Port ${port} is already in use, trying ${port + 1}...`
                    );
                    port++;
                } else {
                    throw error; // Re-throw if it's not a port-in-use error
                }
            }
        }
    } catch (error) {
        logger.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
run();
