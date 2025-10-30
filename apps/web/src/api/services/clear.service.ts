import {
    ClearApi,
    ClearCreateInput,
    ClearUpdateInput,
    GetClearsQuery,
    PaginatedClears,
    TotalClearStats,
} from "@repo/shared";
import { Clear, Navigation } from "@repo/database";
import { AxiosRequestConfig } from "axios";
import { getSdk } from "..";

export default class ClearService implements ClearApi {
    // 단일 인스턴스 설정
    private static instance: ClearService;
    static get Instance(): ClearService {
        if (!this.instance) {
            this.instance = new ClearService();
        }
        return this.instance;
    }

    async getTotalClearStats(): Promise<TotalClearStats> {
        return await getSdk().clear.api.getTotalClearStats();
    }

    async uploadClearScreenshot(
        formData: FormData,
        options?: AxiosRequestConfig
    ): Promise<string> {
        return await getSdk().clear.api.uploadClearScreenshot(
            formData,
            options
        );
    }

    async uploadSaveFile(
        formData: FormData,
        options?: AxiosRequestConfig
    ): Promise<string> {
        return await getSdk().clear.api.uploadSaveFile(formData, options);
    }

    async saveNewClear(input: ClearCreateInput): Promise<void> {
        await getSdk().clear.api.saveNewClear(input);
    }

    async updateClear(input: ClearUpdateInput): Promise<void> {
        await getSdk().clear.api.updateClear(input);
    }

    async getClears(query: GetClearsQuery): Promise<PaginatedClears> {
        return await getSdk().clear.api.getClears(query);
    }

    async getAllClearsByUserId(userId: string): Promise<Clear[]> {
        return await getSdk().clear.api.getAllClearsByUserId(userId);
    }

    async getNavigationList(): Promise<Navigation[]> {
        return await getSdk().clear.api.getNavigationList();
    }
}
