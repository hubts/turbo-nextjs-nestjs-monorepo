import { AppApi, CreateVersionInput } from "@repo/shared";
import { getSdk } from "..";

export default class AppService implements AppApi {
    private static instance: AppService;
    static get Instance(): AppService {
        if (!this.instance) {
            this.instance = new AppService();
        }
        return this.instance;
    }

    async createVersion(input: CreateVersionInput): Promise<void> {
        return await getSdk().app.api.createVersion(input);
    }

    async getVersion(): Promise<string> {
        return await getSdk().app.api.getVersion();
    }
}
