import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

interface SwaggerOptions {
    path: string;
    title: string;
    description: string;
    version: string;
    serverUrl?: string;
    extraModels?: Function[];
    include?: Function[];
}

export function setupSwagger(
    app: INestApplication,
    options: SwaggerOptions
): void {
    const config = new DocumentBuilder()
        .setTitle(options.title)
        .setDescription(options.description)
        .setVersion(options.version)
        .addServer(options.serverUrl || "")
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT Authorization header using the Bearer scheme",
            in: "header",
            name: "Authorization",
        })
        .addBasicAuth({
            type: "apiKey",
            in: "header",
            name: "secret",
        })
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: options.extraModels,
        include: options.include,
        autoTagControllers: true,
    });
    SwaggerModule.setup(options.path, app, document, {
        explorer: true,
        customSiteTitle: `${options.title} API Documentation`,
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: "alpha",
            operationsSorter: "alpha",
        },
    });
}
