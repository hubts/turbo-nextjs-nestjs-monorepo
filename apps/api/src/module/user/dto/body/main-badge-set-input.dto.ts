import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { MainBadgeSetInput } from "@repo/shared";

export class MainBadgeSetInputDto implements MainBadgeSetInput {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: "User ID",
        example: "4e6e6b4b-4b4b-4b4b-4b4b-4b4b4b4b4b4b",
    })
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: "Badge ID (or null)",
        example: "4e6e6b4b-4b4b-4b4b-4b4b-4b4b4b4b4b4b",
        type: String,
        nullable: true,
    })
    badgeId: string | null;
}
