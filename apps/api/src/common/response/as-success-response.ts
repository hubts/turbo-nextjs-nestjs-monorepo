import { CommonResponse } from "@repo/shared";

export const asSuccessResponse = <T>(
    message: string,
    data: T | null = null
): CommonResponse<T> => {
    return {
        success: true,
        message,
        data,
    };
};
