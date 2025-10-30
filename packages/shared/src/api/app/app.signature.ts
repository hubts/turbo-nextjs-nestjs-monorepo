import { ForBackendInterface, ForFrontendApi } from "../../core";
import { LoginBody, Token } from "./interface";

export type AppApi = ForFrontendApi<AppSignature>;
export type AppImpl = ForBackendInterface<AppSignature>;

export interface AppSignature {
    // Login by password
    login(body: LoginBody): Promise<Token>;
}
