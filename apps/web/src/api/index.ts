import { createAxiosInstance, createSdk } from "@repo/shared";

export const getCsrBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_ENDPOINT;
};

export const getSdk = () => {
    // SSR, CSR 환경에 따라 다른 엔드포인트 사용
    const isServer = typeof window === "undefined";
    const baseURL = isServer
        ? process.env.NEXT_SERVER_API_ENDPOINT
        : process.env.NEXT_PUBLIC_API_ENDPOINT;

    const instance = createAxiosInstance({
        baseURL,
        headers: { "Content-Type": "application/json" },
    });

    return createSdk(instance);
};
