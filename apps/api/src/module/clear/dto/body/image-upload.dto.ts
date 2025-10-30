import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ImageUploadDto {
    @IsOptional()
    @ApiProperty({
        description: "이미지 파일",
        type: "string",
        format: "binary",
    })
    image: Express.Multer.File;
}
