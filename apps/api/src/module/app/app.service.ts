import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { LoginDto } from "./dto/body/login.dto";
import { TokenDto } from "./dto/response/token.dto";

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async login(input: LoginDto): Promise<TokenDto> {
        const { password } = input;
        const result = await this.prisma.vault.findUnique({
            where: {
                key: password,
            },
        });
        if (!result) {
            throw new UnauthorizedException("Invalid password");
        }
        return { token: result.value };
    }
}
