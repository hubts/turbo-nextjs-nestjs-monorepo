import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import * as config from "@nestjs/config";
import { Request, Response, NextFunction } from "express";
import { join } from "path";
import express from "express";
import { ServerConfig } from "src/config/internal/server.config";

@Injectable()
export class ServeStaticUploadsMiddleware implements NestMiddleware {
    private staticHandler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void;

    constructor(
        @Inject(ServerConfig.KEY)
        private readonly configService: config.ConfigType<typeof ServerConfig>
    ) {
        const uploadsPath = join(
            process.cwd(),
            this.configService.fileServeStatic.path
        );
        // console.log("ServeStaticUploadsMiddleware::uploadsPath", uploadsPath);

        this.staticHandler = express.static(uploadsPath, {
            fallthrough: false,
        });
    }

    use(req: Request, res: Response, next: NextFunction) {
        // console.log("ServeStaticUploadsMiddleware::use", req.url);
        this.staticHandler(req, res, err => {
            if (err) {
                console.error("[ServeStatic] error:", err.message);
                res.status(404).send("File not found");
            } else {
                next();
            }
        });
    }
}
