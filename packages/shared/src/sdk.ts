import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";
import { AppRoute, createAppApi } from "./api";

export const createAxiosInstance = (config: CreateAxiosDefaults) => {
    return axios.create(config);
};

export const createSdk = (client: AxiosInstance) => {
    return {
        app: {
            api: createAppApi(client),
            route: AppRoute,
        },
    };
};
export type Sdk = ReturnType<typeof createSdk>;
