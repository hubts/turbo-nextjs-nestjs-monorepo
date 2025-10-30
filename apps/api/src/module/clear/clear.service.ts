import { Injectable } from "@nestjs/common";
import {
    ClearApi,
    ClearCreateInput,
    ClearUpdateInput,
    GetClearsQuery,
    PaginatedClears,
    TotalClearStats,
} from "@repo/shared";
import { ClearStatService } from "./service/clear-stat.service";
import { AttachmentService } from "src/infrastructure/_attachment/attachment.service";
import { extname } from "path";
import { ExpectedErrorException } from "src/common/error/expected-error.exception";
import { ClearUserService } from "./service/clear-user.service";
import { Clear, Navigation } from "@repo/database";
import { ClearIngameService } from "./service/clear-ingame.service";

@Injectable()
export class ClearService implements ClearApi {
    constructor(
        private readonly attachmentService: AttachmentService,
        private readonly clearUserService: ClearUserService,
        private readonly clearStatService: ClearStatService,
        private readonly clearIngameService: ClearIngameService
    ) {}

    async getTotalClearStats(): Promise<TotalClearStats> {
        return {
            topUnitFrequencyRanking:
                await this.clearStatService.getUnitFrequencyRanking(),
            topUnitFrequencyByGrade:
                await this.clearStatService.getUnitFrequencyByGrade(),
            clearTypeStat: await this.clearStatService.getClearTypeStat(),
        };
    }

    async uploadClearScreenshot(file: Express.Multer.File): Promise<string> {
        try {
            const result = await this.attachmentService.saveAttachment(
                file.path,
                {
                    filename: file.filename,
                    extension: extname(file.originalname).replace(".", ""),
                    mimetype: file.mimetype,
                    originalName: file.originalname,
                    size: file.size,
                }
            );
            return result.path;
        } catch (error) {
            throw new ExpectedErrorException("SERVICE_UNAVAILABLE", {
                case: "Attachment 저장에 실패하였음",
                file: file,
                error: `${error}`,
            });
        }
    }

    async uploadSaveFile(file: Express.Multer.File): Promise<string> {
        try {
            const result = await this.attachmentService.saveAttachment(
                file.path,
                {
                    filename: file.filename,
                    extension: extname(file.originalname).replace(".", ""),
                    mimetype: file.mimetype,
                    originalName: file.originalname,
                    size: file.size,
                }
            );
            return result.path;
        } catch (error) {
            throw new ExpectedErrorException("SERVICE_UNAVAILABLE", {
                case: "Attachment 저장에 실패하였음",
                file: file,
                error: `${error}`,
            });
        }
    }

    async saveNewClear(input: ClearCreateInput): Promise<void> {
        const clear = await this.clearUserService.createClear(input);
        // await this.userBadgeService.validateUserBadges(clear.userId);
    }

    async updateClear(input: ClearUpdateInput): Promise<void> {
        const clear = await this.clearUserService.updateClear(input);
        // await this.userBadgeService.validateUserBadges(clear.userId);
    }

    async getAllClearsByUserId(userId: string): Promise<Clear[]> {
        return await this.clearUserService.getClearsByUserId(userId);
    }

    async getClears(query: GetClearsQuery): Promise<PaginatedClears> {
        const { skip, take, userId, search } = query;
        const result = await this.clearStatService.getClears({
            skip: +skip,
            take: +take,
            userId,
            search,
        });
        return {
            total: result.total,
            size: result.list.length,
            list: result.list,
        };
    }

    async getNavigationList(): Promise<Navigation[]> {
        return await this.clearIngameService.getNavigationList();
    }
}
