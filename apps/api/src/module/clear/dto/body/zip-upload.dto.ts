import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ZipUploadDto {
    @IsOptional()
    @ApiProperty({
        description: "ZIP 파일",
        type: "string",
        format: "binary",
    })
    file: Express.Multer.File;
}
