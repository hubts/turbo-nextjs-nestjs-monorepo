import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Token } from "@repo/shared";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto implements Token {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Token",
        example: faker.string.alphanumeric(100),
    })
    token: string;
}
