import { Injectable } from "@nestjs/common";
import { Clear } from "@repo/database";
import { ExpectedErrorException } from "src/common/error/expected-error.exception";
import { AttachmentService } from "src/infrastructure/_attachment/attachment.service";
import { PrismaService } from "src/infrastructure/_prisma/prisma.service";
import { ClearCreateInput, ClearUpdateInput } from "@repo/shared";
import { moveFilePath } from "../domain/move-file-path";
import { UnitService } from "src/module/unit/unit.service";

@Injectable()
export class ClearUserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly attachmentService: AttachmentService,
        private readonly unitService: UnitService
    ) {}

    /**
     * 특정 유저의 Clear 최신순으로 조회
     */
    async getClearsByUserId(userId: string): Promise<Clear[]> {
        return await this.prisma.clear.findMany({
            where: {
                userId,
            },
            orderBy: {
                count: "desc",
            },
        });
    }

    /**
     * Clear 신규 저장
     */
    async createClear(input: ClearCreateInput): Promise<Clear> {
        const { userId, count } = input;

        // 신규 저장인지 확인
        const existingClear = await this.prisma.clear.findFirst({
            where: {
                userId,
                count,
            },
        });
        if (existingClear) {
            throw new ExpectedErrorException(
                "BAD_REQUEST",
                {
                    case: "이미 클리어한 회차입니다",
                    count,
                },
                "이미 클리어한 회차입니다."
            );
        }

        // 이미지 있을 시
        let imgPath = input.imgPath;
        if (imgPath) {
            const newPath = moveFilePath(imgPath, `${userId}/${count}`);
            await this.attachmentService.updateAttachmentPath(imgPath, newPath);
            imgPath = newPath;
        }

        // 세이브 파일 있을 시
        let savePath = input.savePath;
        if (savePath) {
            const newPath = moveFilePath(savePath, `${userId}/save/${count}`);
            await this.attachmentService.updateAttachmentPath(
                savePath,
                newPath
            );
            savePath = newPath;
        }

        // 유닛 스코어 계산
        const unitScore = await this.unitService.calculateUnitScore([
            ...input.unitIds,
            ...input.subUnitIds,
        ]);

        // 생성
        return await this.prisma.clear.create({
            data: {
                count,
                type: input.type,
                unitScore: input.unitScore ?? unitScore,
                lineCount: input.lineCount,
                unitIds: await this.unitService.sortUnitIds(input.unitIds),
                subUnitIds: await this.unitService.sortUnitIds(
                    input.subUnitIds
                ),
                User: {
                    connect: {
                        id: userId as string,
                    },
                },
                savePath: savePath ?? null,
                imgPath: imgPath ?? null,
                ...(input.navigationId && {
                    Navigation: {
                        connect: {
                            id: input.navigationId,
                        },
                    },
                }),
            },
        });
    }

    /**
     * Clear 업데이트
     */
    async updateClear(input: ClearUpdateInput): Promise<Clear> {
        // 클리어 정보 확인
        const { id } = input;
        const existingClear = await this.prisma.clear.findUnique({
            where: {
                id,
            },
        });
        if (!existingClear) {
            throw new ExpectedErrorException(
                "BAD_REQUEST",
                {
                    case: "존재하지 않는 Clear ID",
                    id,
                },
                "존재하지 않는 클리어 정보입니다."
            );
        }

        // 클리어 중복 확인
        const { count } = input;
        if (count && count !== existingClear.count) {
            const existingClearCount = await this.prisma.clear.findFirst({
                where: {
                    userId: existingClear.userId,
                    count,
                },
            });
            if (existingClearCount && existingClearCount.id !== id) {
                throw new ExpectedErrorException(
                    "BAD_REQUEST",
                    {
                        case: "중복된 클리어 회차로 입력된 경우",
                        count,
                    },
                    "이미 클리어한 회차입니다."
                );
            }
            existingClear.count = count;
        }

        // 이미지 체크
        let imgPath = input.imgPath;
        if (imgPath && imgPath !== existingClear.imgPath) {
            const newPath = moveFilePath(
                imgPath,
                `${existingClear.userId}/${count ?? existingClear.count}`
            );
            await this.attachmentService.updateAttachmentPath(imgPath, newPath);
            imgPath = newPath;
        }

        // 세이브 파일 체크
        let savePath = input.savePath;
        if (savePath && savePath !== existingClear.savePath) {
            const newPath = moveFilePath(
                savePath,
                `${existingClear.userId}/save/${count ?? existingClear.count}`
            );
            await this.attachmentService.updateAttachmentPath(
                savePath,
                newPath
            );
            savePath = newPath;
        }

        // 유닛 스코어 계산
        const unitScore = await this.unitService.calculateUnitScore([
            ...input.unitIds,
            ...input.subUnitIds,
        ]);

        // 저장
        return await this.prisma.clear.update({
            where: { id },
            data: {
                ...(count && { count }),
                ...(input.type && { type: input.type }),
                ...(input.lineCount && { lineCount: input.lineCount }),
                ...(input.unitIds?.length && {
                    unitIds: await this.unitService.sortUnitIds(input.unitIds),
                }),
                ...(input.subUnitIds?.length && {
                    subUnitIds: await this.unitService.sortUnitIds(
                        input.subUnitIds
                    ),
                }),
                savePath: savePath ?? null,
                imgPath: imgPath ?? null,
                unitScore: input.unitScore ?? unitScore,
                ...(input.navigationId && {
                    Navigation: {
                        connect: {
                            id: input.navigationId,
                        },
                    },
                }),
            },
        });
    }
}
