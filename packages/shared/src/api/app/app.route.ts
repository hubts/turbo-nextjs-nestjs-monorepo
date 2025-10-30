import { RequestMethod } from "@nestjs/common";
import { ApiSetting } from "../../core";
import { AppApi } from "./app.signature";

export const AppRoute: ApiSetting<AppApi> = {
    apiTags: "App",
    pathPrefix: "app",
    login: {
        method: RequestMethod.POST,
        subRoute: "login",
    },
};
