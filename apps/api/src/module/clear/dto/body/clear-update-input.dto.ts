import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from "class-validator";
import { ClearTypeEnum, ClearUpdateInput } from "@repo/shared";

export class ClearUpdateInputDto implements ClearUpdateInput {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: "클리어 ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    id: string;

    @IsOptional()
    @IsEnum(ClearTypeEnum)
    @ApiPropertyOptional({
        description: "클리어 타입",
        enum: ClearTypeEnum,
        enumName: "ClearTypeEnum",
        example: ClearTypeEnum.물딜,
    })
    type?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: "클리어 회차",
        example: 100,
    })
    count?: number;

    @IsOptional()
    @IsUUID(undefined, { each: true })
    @ApiPropertyOptional({
        description: "제작한 상위유닛 ID 배열",
        example: [],
    })
    unitIds?: string[];

    @IsOptional()
    @IsUUID(undefined, { each: true })
    @ApiPropertyOptional({
        description: "제작한 하위유닛 ID 배열",
        example: [],
    })
    subUnitIds?: string[];

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        type: Number,
        description: "제작 유닛 합계",
        example: 2,
        nullable: true,
    })
    unitScore?: number | null;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        type: Number,
        description: "클리어 유닛카운트",
        example: 20,
        nullable: true,
    })
    lineCount?: number | null;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: String,
        description: "이미지 경로",
        example: "uploads/1234567890.png",
        nullable: true,
    })
    imgPath?: string | null;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: String,
        description: "세이브 경로",
        example: "uploads/1234567890.zip",
        nullable: true,
    })
    savePath?: string | null;

    @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
        type: String,
        description: "항법지침 ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        nullable: true,
    })
    navigationId?: string | null;
}
