/**
 * Type definition of common response.
 * The server returns this type of response for all requests.
 */
export interface CommonResponse<T = void> {
    success: boolean;
    message: string;
    data: T | null;
}

/**
 * Interface for created resource response.
 */
export interface IdResponse {
    id: string;
    createdAt: Date;
}
