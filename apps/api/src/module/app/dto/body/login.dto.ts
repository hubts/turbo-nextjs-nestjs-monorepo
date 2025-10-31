import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { LoginBody } from "@repo/shared";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto implements LoginBody {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Password",
        example: faker.internet.password(),
    })
    password: string;
}
