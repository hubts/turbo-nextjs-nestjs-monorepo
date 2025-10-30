import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UserIdInput } from "@repo/shared";

export class UserIdInputDto implements UserIdInput {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: "User ID",
        example: "4e6e6b4b-4b4b-4b4b-4b4b-4b4b4b4b4b4b",
    })
    userId: string;
}
