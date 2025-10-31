import { RequestMethod } from "@nestjs/common";
import { ApiSetting } from "../../core";
import { AppApi } from "./app.signature";

export const AppRoute: ApiSetting<AppApi> = {
    apiTags: "App",
    pathPrefix: "app",
    connection: {
        method: RequestMethod.GET,
        subRoute: "connection",
    },
    login: {
        method: RequestMethod.POST,
        subRoute: "login",
    },
};
