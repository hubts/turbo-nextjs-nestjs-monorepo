import { Body, Controller, Query, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomLogger } from "src/common/logger/custom.logger";
import {
    ClearApi,
    ClearRoute,
    GetClearsQuery,
    PaginatedClears,
    TotalClearStats,
} from "@repo/shared";
import { ClearService } from "./clear.service";
import { Route } from "src/common/decorator/api/route.decorator";
import { ClearCreateInputDto } from "./dto/body/clear-create-input.dto";
import { FileUploadInterceptor } from "src/common/decorator/interceptor/file-upload.interceptor";
import {
    imageFileFilter,
    zipFileFilter,
} from "src/infrastructure/_attachment/attachment.util";
import { ImageUploadDto } from "./dto/body/image-upload.dto";
import { ClearUpdateInputDto } from "./dto/body/clear-update-input.dto";
import { Clear, Navigation } from "@repo/database";
import { ZipUploadDto } from "./dto/body/zip-upload.dto";

@ApiTags(ClearRoute.apiTags)
@Controller(ClearRoute.pathPrefix)
export class ClearController implements ClearApi {
    constructor(
        private readonly logger: CustomLogger,
        private readonly service: ClearService
    ) {}

    @Route.Get(ClearRoute.getTotalClearStats, {
        summary: "Get total clear stats",
    })
    async getTotalClearStats(): Promise<TotalClearStats> {
        // this.logger.log("전체 플레이어들의 통계를 조회하였습니다.");
        return await this.service.getTotalClearStats();
    }

    @Route.Post(ClearRoute.saveNewClear, {
        summary: "Save clear",
    })
    async saveNewClear(@Body() input: ClearCreateInputDto): Promise<void> {
        this.logger.log(
            `플레이어(${input.userId})의 ${
                input.count
            }번째 클리어 정보가 저장되었습니다. (스크린샷 ${
                input.imgPath ? "있음" : "없음"
            })`
        );
        return await this.service.saveNewClear(input);
    }

    @Route.Patch(ClearRoute.updateClear, {
        summary: "Update clear",
    })
    async updateClear(@Body() input: ClearUpdateInputDto): Promise<void> {
        this.logger.log(
            `${input.count}번째 클리어(${
                input.id
            })의 정보가 변경되었습니다. (스크린샷 ${
                input.imgPath ? "있음" : "없음"
            })`
        );
        return await this.service.updateClear(input);
    }

    @Route.Post(ClearRoute.uploadClearScreenshot, {
        summary: "Upload image",
    })
    @FileUploadInterceptor({
        fieldname: "image",
        eachFileSizeLimit: 10 * 1024 * 1024,
        filesCountLimit: 1,
        eachFileFilter: imageFileFilter,
        storagePath: "temp",
    })
    async uploadClearScreenshot(
        @UploadedFile() image: Express.Multer.File,
        _: any, // Unused (AxiosRequestConfig)
        @Body() dto?: ImageUploadDto // Unused (just for swagger)
    ): Promise<string> {
        this.logger.log(
            `클리어 스크린샷이 임시 업로드되었습니다. (경로: ${
                image.path
            }) ${JSON.stringify(dto)}`
        );
        return await this.service.uploadClearScreenshot(image);
    }

    @Route.Post(ClearRoute.uploadSaveFile, {
        summary: "Upload save file",
    })
    @FileUploadInterceptor({
        fieldname: "file",
        eachFileSizeLimit: 100 * 1024 * 1024,
        filesCountLimit: 1,
        eachFileFilter: zipFileFilter,
        storagePath: "temp",
    })
    async uploadSaveFile(
        @UploadedFile() file: Express.Multer.File,
        _: any, // Unused (AxiosRequestConfig)
        @Body() dto?: ZipUploadDto // Unused (just for swagger)
    ): Promise<string> {
        this.logger.log(
            `클리어 세이브파일이 임시 업로드되었습니다. (경로: ${
                file.path
            }) ${JSON.stringify(dto)}`
        );
        return await this.service.uploadSaveFile(file);
    }

    @Route.Get(ClearRoute.getAllClearsByUserId, {
        summary: "Get clears",
    })
    async getAllClearsByUserId(
        @Query("userId") userId: string
    ): Promise<Clear[]> {
        // this.logger.log(
        //     `플레이어(${userId})의 클리어 목록을 전부 조회하였습니다.`
        // );
        return await this.service.getAllClearsByUserId(userId);
    }

    @Route.Get(ClearRoute.getClears, {
        summary: "Get clears with pagination, filtering",
    })
    async getClears(@Query() query: GetClearsQuery): Promise<PaginatedClears> {
        // this.logger.log("클리어 목록을 조회하였습니다.");
        return await this.service.getClears(query);
    }

    @Route.Get(ClearRoute.getNavigationList, {
        summary: "Get navigation list",
    })
    async getNavigationList(): Promise<Navigation[]> {
        // this.logger.log("항법지침 목록을 조회하였습니다.");
        return await this.service.getNavigationList();
    }
}
