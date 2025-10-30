import { AxiosInstance } from "axios";
import { AppRoute } from "./app.route";
import { AppApi } from "./app.signature";
import { createApiWrapper } from "../../core";

export const createAppApi = (client: AxiosInstance): AppApi => {
    const api = createApiWrapper(client, AppRoute);

    return {
        login: body => api.post("login", body),
    };
};
