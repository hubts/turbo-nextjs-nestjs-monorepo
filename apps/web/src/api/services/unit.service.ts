import { UnitApi } from "@repo/shared";
import { Unit } from "@repo/database";
import { getSdk } from "..";

export default class UnitService implements UnitApi {
    // 단일 인스턴스 설정
    private static instance: UnitService;
    static get Instance(): UnitService {
        if (!this.instance) {
            this.instance = new UnitService();
        }
        return this.instance;
    }

    async getUnits(): Promise<Unit[]> {
        return await getSdk().unit.api.getUnits();
    }

    async getTodayRandomTopUnits(): Promise<Unit[]> {
        return await getSdk().unit.api.getTodayRandomTopUnits();
    }
}
