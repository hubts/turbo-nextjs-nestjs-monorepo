import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class DecodePathMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        // console.log("DecodePathMiddleware::req.url", req.url);
        if (req.url) {
            req.url = decodeURIComponent(req.url); // URL 디코딩
        }
        next();
    }
}
