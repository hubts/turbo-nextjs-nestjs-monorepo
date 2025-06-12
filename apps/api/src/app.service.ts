import { Injectable } from "@nestjs/common";
import { Account } from "@repo/api-types";

@Injectable()
export class AppService {
    getHello(): Account {
        const account: Account = {
            id: "1",
            name: "John Doe",
            type: "checking",
            balance: 1000,
        };
        return account;
    }
}
