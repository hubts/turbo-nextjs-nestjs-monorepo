import { CommonResponse } from "@repo/shared";

export const asErrorResponse = <T>(
    message: string,
    data: T | null = null
): CommonResponse<T> => {
    return {
        success: false,
        message,
        data,
    };
};
