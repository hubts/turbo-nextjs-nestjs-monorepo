import { ApiRouteOptions } from "@repo/shared";
import { ApiSpec, ApiSpecOptions } from "./api-spec.decorator";

/**
 * Defined API specification for each HTTP method.
 */
export const Route = {
    Get: (route: Partial<ApiRouteOptions>, options: ApiSpecOptions) =>
        ApiSpec({ ...route, ...options, method: "GET" }),
    Post: (route: Partial<ApiRouteOptions>, options: ApiSpecOptions) =>
        ApiSpec({ ...route, ...options, method: "POST" }),
    Patch: (route: Partial<ApiRouteOptions>, options: ApiSpecOptions) =>
        ApiSpec({ ...route, ...options, method: "PATCH" }),
    Delete: (route: Partial<ApiRouteOptions>, options: ApiSpecOptions) =>
        ApiSpec({ ...route, ...options, method: "DELETE" }),
    Put: (route: Partial<ApiRouteOptions>, options: ApiSpecOptions) =>
        ApiSpec({ ...route, ...options, method: "PUT" }),
};
